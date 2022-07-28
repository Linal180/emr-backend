import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
//entity
import { Claim, OnsetDate, OrderOfBenefit, OtherDate } from "../entities/claim.entity";
//inputs
import { ClaimInput, CreateClaimInput } from "../dto/claim-input.dto";
//services
import { BillingService } from "./billing.service";
import { ClaimStatusService } from "./claimStatus.service";

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
      const { claimStatusId, claimStatus, ...rest } = params || {}
      const claim = this.claimRepo.create({
        ...rest, claimStatusId
      });
      if (claimStatusId && claimStatus) {
        claim.claimStatus = claimStatus
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
      const claimMd = await this.billingService.getMdClaimInfo(params);
      const claimStatus = await this.claimStatusService.findByStatusId('ready_to_claim');
      await this.billingService.create({ ...params, claimStatusId: claimStatus.id })
      const { onset, cond, payer_order } = claimMd || {}
      const claim = await this.create({
        ...claimMd, claimStatusId: claimStatus.id, claimStatus,
        payer_order: payer_order as unknown as OrderOfBenefit, cond: cond as unknown as OnsetDate,
        onset: onset as unknown as OtherDate,
      })
      return claim;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


}