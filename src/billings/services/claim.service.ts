import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
//entity
import { Claim, OnsetDate, OrderOfBenefit, OtherDate } from "../entities/claim.entity";
//inputs
import { ClaimInput, CreateClaimInput, GetClaimInput } from "../dto/claim-input.dto";
//services
import { BillingService } from "./billing.service";
import { ClaimStatusService } from "./claimStatus.service";
//helpers
import { claimMedValidation } from 'src/lib/validations';

@Injectable()
export class ClaimService {
  constructor(
    @InjectRepository(Claim)
    private claimRepo: Repository<Claim>,
    private readonly billingService: BillingService,
    private readonly claimStatusService: ClaimStatusService
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
   * Creates claim
   * @param params 
   * @returns  
   */
  async createClaim(params: CreateClaimInput): Promise<Claim> {
    try {
      const { claimStatusId } = params || {}
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
      let claimStatus = null;
      if (!claimStatusId) {
        claimStatus = await this.claimStatusService.findByStatusId('ready_to_claim');
      }

      if (claimStatusId) {
        claimStatus = await this.claimStatusService.findOne(claimStatusId);
      }
      const billing = await this.billingService.create({ ...params, claimStatusId: claimStatus.id });

      const { onset, cond, payer_order } = claimMd || {}
      const claim = await this.create({
        ...claimMd, billingId: billing?.id, billing,
        payer_order: payer_order as unknown as OrderOfBenefit, cond: cond as unknown as OnsetDate,
        onset: onset as unknown as OtherDate,
      })
      return claim;
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