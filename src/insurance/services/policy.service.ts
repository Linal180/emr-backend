import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CopayService } from './copay.service';
import { Policy } from '../entities/policy.entity';
import { InsuranceService } from './insurance.service';
import { PoliciesPayload } from '../dto/policy-payload.dto';
import { PolicyHolderService } from './policy-holder.service';
import { DoctorService } from 'src/providers/services/doctor.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { PatientService } from 'src/patients/services/patient.service';
import { CreatePolicyInput, PolicyPaginationInput, UpdatePolicyInput } from '../dto/policy-input.dto';

@Injectable()
export class PolicyService {
  constructor(
    @InjectRepository(Policy)
    private policyRepository: Repository<Policy>,
    private readonly connection: Connection,
    private readonly paginationService: PaginationService,
    private readonly patientService: PatientService,
    private readonly insuranceService: InsuranceService,
    private readonly policyHolderService: PolicyHolderService,
    private readonly copayService: CopayService,
    private readonly doctorService: DoctorService,
  ) { }

  /**
   * Finds all
   * @param policyInput 
   * @returns all 
   */
  async findAll(policyInput: PolicyPaginationInput): Promise<PoliciesPayload> {
    try {
      const paginationResponse = await this.paginationService.willPaginate<Policy>(this.policyRepository, policyInput)
      return {
        pagination: {
          ...paginationResponse
        },
        policies: paginationResponse.data,
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds by id
   * @param id 
   * @returns by id 
   */
  async findById(id: string): Promise<Policy> {
    const policy = await this.policyRepository.findOne({ id });

    if (!policy) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Policy not found',
      });
    }

    return policy;
  }

  /**
   * Creates policy service
   * @param createPolicyInput 
   * @returns create 
   */
  async create(createPolicyInput: CreatePolicyInput): Promise<Policy> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { referringProviderId, patientId, primaryCareProviderId, ...policyInfoToCreate } = createPolicyInput
      //creating policy
      const policyInstance = this.policyRepository.create({ ...policyInfoToCreate })

      if (referringProviderId) {
        const referringProviderInstance = await this.doctorService.findOne(referringProviderId)
        policyInstance.referringProvider = referringProviderInstance
      }

      if (primaryCareProviderId) {
        const primaryCareProviderInstance = await this.doctorService.findOne(primaryCareProviderId)
        policyInstance.primaryCareProvider = primaryCareProviderInstance
      }

      const patient = await this.patientService.findOne(patientId)
      if (patientId) {
        //associate patient
        policyInstance.patient = patient
      }

      const policyHolderInfo = await this.policyHolderService.findOne(patient.policyHolderId)

      //associate policyHolder
      if (!policyHolderInfo) {
        const createdPolicyHolder = await this.policyHolderService.create(createPolicyInput.policyHolderInfo)
        this.patientService.updatePatientPolicyHolder({ id: patient.id, policyHolder: createdPolicyHolder })
        policyInstance.policyHolder = createdPolicyHolder
      } else {
        this.policyHolderService.update({ ...policyHolderInfo, ...createPolicyInput.policyHolderInfo })
        policyInstance.policyHolder = policyHolderInfo
      }

      //associate insurance 
      if (createPolicyInput.insuranceId) {
        const insurance = await this.insuranceService.findOne(createPolicyInput.insuranceId)
        policyInstance.insurance = insurance
      }
      const policy = await this.policyRepository.save(policyInstance);

      //associate copays
      if (createPolicyInput.copays) {
        createPolicyInput?.copays?.map(async (copay) => {
          return await this.copayService.create({ ...copay, policy })
        })
      }
      await queryRunner.commitTransaction();
      return policy
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Updates policy service
   * @param updatePolicyInput 
   * @returns update 
   */
  async update(updatePolicyInput: UpdatePolicyInput): Promise<Policy> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { referringProviderId, patientId, primaryCareProviderId, policyHolderInfo: updatePolicyHolderInfo, copays: updateCopaysInput, ...policyInfoToCreate } = updatePolicyInput
      //creating policy
      const policyInstance = await this.policyRepository.findOne(updatePolicyInput.id)

      if (referringProviderId) {
        const referringProviderInstance = await this.doctorService.findOne(referringProviderId)
        policyInstance.referringProvider = referringProviderInstance
      }

      if (primaryCareProviderId) {
        const primaryCareProviderInstance = await this.doctorService.findOne(primaryCareProviderId)
        policyInstance.primaryCareProvider = primaryCareProviderInstance
      }

      const patient = await this.patientService.findOne(patientId)
      if (patientId) {
        //associate patient
        policyInstance.patient = patient
      }

      const policyHolderInfo = await this.policyHolderService.findOne(patient.policyHolderId)

      //associate policyHolder
      if (!policyHolderInfo) {
        const createdPolicyHolder = await this.policyHolderService.create(updatePolicyInput.policyHolderInfo)
        this.patientService.updatePatientPolicyHolder({ id: patient.id, policyHolder: createdPolicyHolder })
        policyInstance.policyHolder = createdPolicyHolder
      } else {
        const updatedPolicyHolderInfo = await this.policyHolderService.update({ ...policyHolderInfo, ...updatePolicyInput.policyHolderInfo })
        policyInstance.policyHolder = updatedPolicyHolderInfo
      }

      //associate insurance 
      if (updatePolicyInput.insuranceId) {
        const insurance = await this.insuranceService.findOne(updatePolicyInput.insuranceId)
        policyInstance.insurance = insurance
      }
      const policy = await this.policyRepository.save(policyInstance);

      //associate copays
      if (updateCopaysInput) {
        const copays = await Promise.all(updateCopaysInput.map(async (item) => {
          if (item.id) {
            return await this.copayService.updateCopay(item)
          }
          const { id, ...createCopayInput } = item
          return await this.copayService.create({ ...createCopayInput, policy })
        }));

        policy.copays = copays
      } else {
        policy.copays = []
      }
      await queryRunner.commitTransaction();
      const updatedPolicy = await this.policyRepository.save(policy);
      return updatedPolicy
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }
}
