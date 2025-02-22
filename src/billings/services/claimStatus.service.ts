import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
//inputs
import { ClaimStatusInput, ClaimStatusPaginationInput, UpdateClaimStatusInput } from "../dto/claim-status-input.dto";
//entities
import { ClaimStatus } from "../entities/claim-status.entity";
//services
import { UtilsService } from "src/util/utils.service";
import { PaginationService } from "src/pagination/pagination.service";
//payloads
import { ClaimStatusesPayload } from "../dto/claimStatus-payload";

@Injectable()
export class ClaimStatusService {
  constructor(
    @InjectRepository(ClaimStatus)
    private claimStatusRepository: Repository<ClaimStatus>,
    private readonly utilsService: UtilsService,
    private readonly paginationService: PaginationService,
  ) { }

  /**
   * Creates claim status service
   * @param createClaimStatusInput 
   * @returns  
   */
  async create(createClaimStatusInput: ClaimStatusInput) {
    const createdClaimStatus = this.claimStatusRepository.create(createClaimStatusInput)
    return await this.claimStatusRepository.save(createdClaimStatus)
  }

  /**
   * Updates claim status service
   * @param updateClaimStatusInput 
   * @returns  
   */
  async update(updateClaimStatusInput: UpdateClaimStatusInput) {
    const updatedClaimStatus = await this.utilsService.updateEntityManager(ClaimStatus, updateClaimStatusInput.id, updateClaimStatusInput, this.claimStatusRepository)
    return updatedClaimStatus
  }

  /**
   * Removes claim status service
   * @param id 
   */
  async remove(id) {
    try {
      const claimStatus = await this.claimStatusRepository.findOne(id)
      if (claimStatus) {
        await this.claimStatusRepository.delete(id)
        return claimStatus

      }
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Claim Status not found or disabled',
      });

    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Fetch all claim statuses
   * @param claimStatusPaginationInput 
   * @returns all claim statuses 
   */
  async fetchAllClaimStatuses(claimStatusPaginationInput: ClaimStatusPaginationInput): Promise<ClaimStatusesPayload> {
    const { searchString } = claimStatusPaginationInput
    const paginationResponse = await this.paginationService.willPaginate<ClaimStatus>(this.claimStatusRepository, { ...claimStatusPaginationInput, associatedTo: 'ClaimStatus', associatedToField: { columnValue: searchString, columnName: 'statusName', filterType: 'stringFilter' } })
    return {
      pagination: {
        ...paginationResponse
      },
      claimStatuses: paginationResponse.data,
    }
  }
  
  /**
   * Finds one
   * @param id 
   * @returns one 
   */
  async findOne(id: string): Promise<ClaimStatus> {
    return await this.claimStatusRepository.findOne({ id })
  }

  /**
   * Finds by name
   * @param statusName 
   * @returns  
   */
  async findByName(statusName: string): Promise<ClaimStatus> {
    return await this.claimStatusRepository.findOne({ statusName })
  }

  /**
   * Finds by status id
   * @param statusId 
   * @returns by status id 
   */
  async findByStatusId(statusId: string): Promise<ClaimStatus> {
    try {
      return await this.claimStatusRepository.findOne({ statusId })
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

}
