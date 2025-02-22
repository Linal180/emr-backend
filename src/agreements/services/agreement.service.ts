import { InjectRepository } from '@nestjs/typeorm';
import { Connection, In, Repository } from 'typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
//services
import { UtilsService } from 'src/util/utils.service';
import { PracticeService } from 'src/practice/practice.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { FacilityService } from 'src/facilities/services/facility.service';
//entities
import { Agreement } from '../entities/agreement.entity';
//dto's payloads
import { AgreementsPayload } from '../dto/agreement-payload';
import { AgreementInput, AgreementPaginationInput, UpdateAgreementInput } from '../dto/agreement-input.dto';

@Injectable()
export class AgreementService {
  constructor(
    @InjectRepository(Agreement)
    private agreementRepository: Repository<Agreement>,
    private readonly connection: Connection,
    private readonly paginationService: PaginationService,
    private readonly practiceService: PracticeService,
    private readonly facilityService: FacilityService,
    private readonly utilsService: UtilsService
  ) { }

  /**
   * Creates agreement service
   * @param createAgreementInput 
   * @returns create 
   */
  async create(createAgreementInput: AgreementInput): Promise<Agreement> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      //creating agreement
      const { facilityId, practiceId, ...agreementInput } = createAgreementInput
      const agreementInstance = this.agreementRepository.create(agreementInput)
      if(practiceId){
        const practice = await this.practiceService.findOne(practiceId)
        agreementInstance.practice = practice
      }

      if(facilityId){
        const facility = await this.facilityService.findOne(facilityId)
        agreementInstance.facility = facility
      }

      const createdAgreement = await this.agreementRepository.save(agreementInstance)

      await queryRunner.commitTransaction();
      return createdAgreement
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Updates agreement service
   * @param updateAgreementInput 
   * @returns update 
   */
  async update(updateAgreementInput: UpdateAgreementInput): Promise<Agreement> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      //creating agreement
      const updatedAgreement = await this.utilsService.updateEntityManager(Agreement, updateAgreementInput.id, updateAgreementInput, this.agreementRepository)
      await queryRunner.commitTransaction();
      return updatedAgreement
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Fetchs all agreements
   * @param agreementPaginationInput 
   * @returns all agreements 
   */
  async fetchAllAgreements(agreementPaginationInput: AgreementPaginationInput): Promise<AgreementsPayload> {
    try {
      const { searchString } = agreementPaginationInput
      const paginationResponse = await this.paginationService.willPaginate<Agreement>(this.agreementRepository, { ...agreementPaginationInput, associatedTo: 'Agreement', associatedToField: { columnValue: searchString, columnName: 'title', columnName2: 'title', columnName3: 'body', filterType: 'stringFilter' } })
      return {
        pagination: {
          ...paginationResponse
        },
        agreements: paginationResponse.data,
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Fetchs agreement
   * @param agreementId 
   * @returns agreement 
   */
  async fetchAgreement(agreementId: string): Promise<Agreement> {
    try {
      return await this.agreementRepository.findOne({ id: agreementId })
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Removes agreement
   * @param id 
   */
  async removeAgreement(id: string) {
    try {
      await this.agreementRepository.delete(id)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds all agreements
   * @param agreementId 
   * @returns all agreements 
   */
  async findAllAgreements(agreementId: string[]): Promise<Agreement[]> {
    try {
      return await this.agreementRepository.find({ id: In(agreementId) })
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds all agreements by patient consent
   * @param patientConsentId 
   * @returns all agreements by patient consent 
   */
  async findAllAgreementsByPatientConsent(patientConsentId: string): Promise<Agreement[]> {
    try {
      return await this.agreementRepository.find({ patientConsentId: patientConsentId })
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
