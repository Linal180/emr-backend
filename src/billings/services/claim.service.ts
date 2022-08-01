import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
//entity
import { Claim, OnsetDate, OrderOfBenefit, OtherDate } from "../entities/claim.entity";
//inputs
import { ClaimInput, CreateClaimInput, GetClaimInput, UpdateClaimInput } from "../dto/claim-input.dto";
//services
import { BillingService } from "./billing.service";
import { UtilsService } from "src/util/utils.service";
import { ClaimStatusService } from "./claimStatus.service";
//helpers
import { claimMedValidation } from 'src/lib/validations';
import { SystemBillingStatuses } from "src/lib/constants";
//payload
import { ClaimPayload } from "../dto/claim-payload";
@Injectable()
export class ClaimService {
  constructor(
    @InjectRepository(Claim)
    private claimRepo: Repository<Claim>,
    private readonly billingService: BillingService,
    private readonly claimStatusService: ClaimStatusService,
    private readonly utilsService: UtilsService,
  ) { }

  /**
   * Creates claim service
   * @param params 
   * @returns create 
   */
  async create(params: ClaimInput): Promise<Claim> {
    try {
      const { billingId, billing, ...rest } = params || {}
      const claim = this.claimRepo.create({
        ...rest
      });

      if (billing && billingId) {
        claim.billing = billing
      }
      return await this.claimRepo.save(claim)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Updates claim service
   * @param params 
   * @returns update 
   */
  async update(params: UpdateClaimInput): Promise<Claim> {
    try {
      const { billing, billingId } = params || {}
      const claim = await this.utilsService.updateEntityManager(Claim, params.id, params, this.claimRepo);
      //associate billing
      if (billing && billingId) {
        claim.billing = billing
      }
      const updatedClaim = await this.claimRepo.save(claim);
      return updatedClaim
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Creates claim
   * @param params 
   * @returns  
   */
  async createClaim(params: CreateClaimInput): Promise<ClaimPayload> {
    try {
      const { appointmentId } = params || {}
      const claimMd = await this.billingService.getMdClaimInfo(params);
      //getting keys
      const claimMedValidationKeys = Object.keys(claimMedValidation.describe().keys)
      const transformedClaimInfo = Object.keys(claimMd).reduce((acc, key) => {
        if (claimMedValidationKeys.includes(key)) {
          acc[key] = claimMd[key]
          return acc
        }
        return acc
      }, {})
      //validating keys
      const result = claimMedValidation.validate(transformedClaimInfo)
      if (result.error) {
        const errorMessages = [...result.error.details.map((d) => d.message), !claimMd.charge.length ? 'Procedure code is missing' : ''].join();
        throw new BadRequestException(errorMessages);
      }

      const { onset, cond, payer_order } = claimMd || {}
      //fetch billing of appointment
      const billingInfo = await this.billingService.getByAppointmentId(appointmentId);

      if (!!billingInfo?.id) {
        const claimInfo = await this.getClaimByBillingId(billingInfo?.id);
        let claimStatus = await this.claimStatusService.findOne(billingInfo?.claimStatusId);

        //update claim
        let claim = null
        if (!!claimInfo?.id) {
          let error_msgs = null
          claim = await this.update({
            id: claimInfo?.id, ...claimMd, billingId: billingInfo?.id, billing: billingInfo,
            payer_order: payer_order as unknown as OrderOfBenefit, cond: cond as unknown as OnsetDate,
            onset: onset as unknown as OtherDate,
          })

          //get claim status
          if (!!claimStatus?.statusId) {
            //delete some properties 
            //get error from claim md 
            const claimMdFormInput = JSON.parse(JSON.stringify(claimInfo)) as Claim
            delete claimMdFormInput.id;
            delete claimMdFormInput.billingId;
            delete claimMdFormInput.createdAt;
            delete claimMdFormInput.updatedAt;
            delete claimMdFormInput.billing;

            const { error, claim } = await this.billingService.submitClaimToClaimMd(claimMdFormInput);
            //found error in claim ; get claim status
            if (error) {
              const { error_mesg } = error || {}
              claimStatus = await this.claimStatusService.findByStatusId(SystemBillingStatuses.REJECTED);
              error_msgs = error_mesg
            } else {
              const err = claim?.some(({ status }) => status === "R");
              const noError = claim?.some(({ status }) => status === "A")

              if (err) {
                // const message = claim[0] || {}
                claim?.map((item) => {
                  const { messages } = item || {}
                  let msgErr = null
                  messages?.map((msgItem) => {
                    const { message } = msgItem || {}
                    msgErr = msgErr + `, ${message}`
                  })
                  error_msgs = msgErr
                })
                claimStatus = await this.claimStatusService.findByStatusId(SystemBillingStatuses.REJECTED);
              }
              //not found error in claim ; get claim status
              if (noError) {
                claimStatus = await this.claimStatusService.findByStatusId(SystemBillingStatuses.ACKNOWLEDGED);
              }
            }

          }
          //update billing
          await this.billingService.create({ ...params, claimStatusId: claimStatus?.id });
          if (error_msgs) {
            throw new InternalServerErrorException(error_msgs);
          }
          return { claim, claimStatus };
        }
        //create claim
        else {
          claim = await this.create({
            ...claimMd, billingId: billingInfo?.id, billing: billingInfo,
            payer_order: payer_order as unknown as OrderOfBenefit, cond: cond as unknown as OnsetDate,
            onset: onset as unknown as OtherDate,
          })
          //get claim status
          if (!claimStatus) {
            claimStatus = await this.claimStatusService.findByStatusId('ready_to_claim');
          }
          //update billing
          await this.billingService.create({ ...params, claimStatusId: claimStatus.id });

          return { claim, claimStatus };
        }
      }
      else {
        const claimStatus = await this.claimStatusService.findByStatusId('ready_to_claim');
        const billing = await this.billingService.create({ ...params, claimStatusId: claimStatus.id });
        const claim = await this.create({
          ...claimMd, billingId: billing?.id, billing,
          payer_order: payer_order as unknown as OrderOfBenefit, cond: cond as unknown as OnsetDate,
          onset: onset as unknown as OtherDate,
        })
        return { claim, claimStatus }
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Gets claim
   * @param params 
   * @returns claim 
   */
  async getClaim(params: GetClaimInput): Promise<Claim> {
    try {
      const { id } = params;
      return await this.claimRepo.findOne({ id });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Gets claim by billing id
   * @param billingId 
   * @returns claim by billing id 
   */
  async getClaimByBillingId(billingId: string): Promise<Claim> {
    try {
      return await this.claimRepo.findOne({ billingId });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}