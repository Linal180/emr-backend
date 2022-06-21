import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from 'src/pagination/pagination.service';
import { UtilsService } from 'src/util/utils.service';
import { Connection, Repository } from 'typeorm';
import { AgreementInput, AgreementPaginationInput, UpdateAgreementInput } from '../dto/agreement-input.dto';
import { AgreementsPayload } from '../dto/agreement-payload';
import { Agreement } from '../entities/agreement.entity';

@Injectable()
export class AgreementService {
  constructor(
    @InjectRepository(Agreement)
    private agreementRepository: Repository<Agreement>,
    private readonly connection: Connection,
    private readonly paginationService: PaginationService,
    private readonly utilsService: UtilsService
  ) { }


  async create(createAgreementInput: AgreementInput): Promise<Agreement> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      //creating agreement
      const agreementInstance = this.agreementRepository.create(createAgreementInput)
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

  async update(updateAgreementInput: UpdateAgreementInput): Promise<Agreement> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      //creating agreement
      const updatedAgreement= await this.utilsService.updateEntityManager(Agreement, updateAgreementInput.id, updateAgreementInput, this.agreementRepository)
      await queryRunner.commitTransaction();
      return updatedAgreement
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

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

  async fetchAgreement(agreementId: string): Promise<Agreement> {
    try {
      return await this.agreementRepository.findOne({ id: agreementId })
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async removeAgreement(id: string) {
    try {
      await this.agreementRepository.delete(id)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
