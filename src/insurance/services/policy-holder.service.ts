import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PaginationService } from 'src/pagination/pagination.service';
import { UtilsService } from 'src/util/utils.service';
import { PolicyHolderInput, PolicyHolderPaginationInput, UpdatePolicyHolderInput } from '../dto/policy-holder-input';
import { PolicyHoldersPayload } from '../dto/policy-holder.payload';
import { PolicyHolder } from '../entities/policy-holder.entity';

@Injectable()
export class PolicyHolderService {
  constructor(
    @InjectRepository(PolicyHolder)
    private policyHolderRepository: Repository<PolicyHolder>,
    private readonly paginationService: PaginationService,
    private readonly utilsService: UtilsService,
  ) { }


  /**
   * Finds all
   * @param policyHolderInput 
   * @returns all 
   */
  async findAll(policyHolderInput: PolicyHolderPaginationInput): Promise<PolicyHoldersPayload> {
    try {
      const paginationResponse = await this.paginationService.willPaginate<PolicyHolder>(this.policyHolderRepository, policyHolderInput)
      return {
        pagination: {
          ...paginationResponse
        },
        policyHolders: paginationResponse.data,
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds one
   * @param id 
   * @returns one 
   */
  async findOne(id: string): Promise<PolicyHolder> {
    const policyHolder = await this.policyHolderRepository.findOne({ id });

    return policyHolder;
  }

  /**
   * Creates policy holder service
   * @param createPolicyHolderInput 
   * @returns create 
   */
  async create(createPolicyHolderInput: PolicyHolderInput): Promise<PolicyHolder> {
    const policyHolderInstance = this.policyHolderRepository.create(createPolicyHolderInput)
    return this.policyHolderRepository.save(policyHolderInstance)
  }

  /**
   * Updates policy holder service
   * @param updatePolicyHolderInput 
   * @returns update 
   */
  async update(updatePolicyHolderInput: UpdatePolicyHolderInput): Promise<PolicyHolder> {
    return await this.utilsService.updateEntityManager(PolicyHolder, updatePolicyHolderInput.id, updatePolicyHolderInput, this.policyHolderRepository)
  }
}
