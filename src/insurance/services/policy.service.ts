import { Connection, FindOperator, ILike, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as FormData from 'form-data'
import * as moment from 'moment'
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
import { DoctorPatientRelationType } from 'src/patients/entities/doctorPatient.entity';
import { getClaimRelation } from 'src/lib/helper';
import { HttpService } from '@nestjs/axios';
import { PolicyEligibility } from '../entities/policy-eligibility.entity';
import { PolicyCoverage } from '../entities/policy-coverage.entity';
import { PolicyEligibilitiesPayload, PolicyEligibilityPayload, PolicyEligibilityWithPatientPayload } from '../dto/policy-eligibility.dto';
import { PolicyEligibilityPaginationInput } from '../dto/policy-eligibility-input';

@Injectable()
export class PolicyService {
  constructor(
    @InjectRepository(Policy)
    private policyRepository: Repository<Policy>,
    @InjectRepository(PolicyEligibility)
    private policyEligibilityRepository: Repository<PolicyEligibility>,
    @InjectRepository(PolicyCoverage)
    private policyCoverageRepository: Repository<PolicyCoverage>,
    private readonly connection: Connection,
    private readonly paginationService: PaginationService,
    private readonly patientService: PatientService,
    private readonly insuranceService: InsuranceService,
    private readonly policyHolderService: PolicyHolderService,
    private readonly copayService: CopayService,
    private readonly doctorService: DoctorService,
    private readonly httpService: HttpService
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
        this.patientService.updatePatientProvider({ patientId, providerId: referringProviderId, relation: DoctorPatientRelationType.REFERRING_PROVIDER })
      }

      if (primaryCareProviderId) {
        const primaryCareProviderInstance = await this.doctorService.findOne(primaryCareProviderId)
        policyInstance.primaryCareProvider = primaryCareProviderInstance
        this.patientService.updatePatientProvider({ patientId, providerId: primaryCareProviderId, relation: DoctorPatientRelationType.PRIMARY_PROVIDER })
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
      const policy = await this.policyRepository.save({ ...policyInstance, ...policyInfoToCreate });

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

  /**
   * Fetchs patient insurances
   * @param id 
   * @returns patient insurances 
   */
  async fetchPatientInsurances(id: string): Promise<Policy[]> {
    return this.policyRepository.find({
      patientId: id
    })
  }

  /**
   * Finds one
   * @param id 
   * @returns one 
   */
  async findOne(id: string): Promise<Policy> {
    return this.policyRepository.findOne({ id })
  }

  /**
   * Gets eligibility and coverage
   * @param policyId 
   * @returns eligibility and coverage 
   */
  async getEligibilityAndCoverage(policyId: string): Promise<PolicyEligibility> {
    //Transaction start
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const policyInfo = await this.policyRepository.findOne({ id: policyId })
      const { policyHolderRelationship, patientId, insuranceId, policyHolderId } = policyInfo || {}
      const { payerId, payerName } = await this.insuranceService.findOne(insuranceId) || {}
      const { firstName, lastName } = await this.policyHolderService.findOne(policyHolderId) || {}
      const patientProviders = await this.patientService.usualProvider(patientId)
      const { doctor } = patientProviders.find(patientProvider => patientProvider.relation === DoctorPatientRelationType.PRIMARY_PROVIDER) || {}
      const { npi } = doctor || {}
      const patRelationshipCode = getClaimRelation(policyHolderRelationship)

      const formData = new FormData()
      formData.append('AccountKey', process.env.CLAIM_MD_ID)
      formData.append('ins_name_l', lastName)
      formData.append('ins_name_f', firstName)
      formData.append('payerid', payerId)
      formData.append('pat_rel', patRelationshipCode)
      formData.append('fdos', moment().format('YYYY-MM-DD'))
      formData.append('prov_npi', '1427080589')

      const response = await this.httpService.post('https://www.claim.md/services/eligxml/', formData, {
        headers: {
          'Accept': 'text/json'
        }
      }).toPromise();
      const { data } = response || {}
      if (data.error) {
        const { error_mesg } = data.error || {}
        throw new Error(error_mesg);
      }
      const { elig } = data || {}
      const { elig_result_date, elig_result_time, eligid, group_number, ins_addr_1, ins_city, ins_dob, ins_name_f, ins_name_l,
        ins_number, ins_sex, ins_state, ins_zip, plan_begin_date, plan_number, benefit } = elig || {}

      const createdPolicyCoverage = await Promise.all(benefit?.map(async (benefitValues) => {
        const {
          insurance_type_description, insurance_type_code, date_of_last_update, benefit_code, benefit_coverage_description, benefit_notes,
          benefit_coverage_code, benefit_description, benefit_amount, benefit_level_code, benefit_period_code, inplan_network,
          benefit_level_description, benefit_period_description, benefit_percent } = benefitValues || {}

        const createdCoverageBenefit = await this.policyCoverageRepository.create({
          benefitAmount: benefit_amount, benefitCode: benefit_code, benefitCoverageCode: benefit_coverage_code, benefitCoverageDescription: benefit_coverage_description,
          benefitDescription: benefit_description, benefitLevelCode: benefit_level_code, benefitLevelCodeDescription: benefit_level_description,
          benefitNotes: benefit_notes, benefitPercent: benefit_percent, benefitPeriodCode: benefit_period_code, benefitPeriodCodeDescription: benefit_period_description,
          dateOfLastUpdated: date_of_last_update, inPlanNetwork: inplan_network, insuranceTypeCode: insurance_type_code, insuranceTypeCodeDescription: insurance_type_description,
        })

        return await this.policyCoverageRepository.save(createdCoverageBenefit)
      }))

      const policyEligibility = await this.policyEligibilityRepository.create({
        eligibilityId: eligid, eligibilityResultDate: elig_result_date, eligibilityResultTime: elig_result_time, groupNumber: group_number,
        insAddress1: ins_addr_1, insCity: ins_city, insDob: ins_dob, insFirstName: ins_name_f, insLastName: ins_name_l, insSex: ins_sex,
        insState: ins_state, insZip: ins_zip, planBeginDate: plan_begin_date, planNumber: plan_number, payerId: payerId, payerName: payerName
      })

      if (policyId) {
        policyEligibility.policy = policyInfo
      }

      policyEligibility.policyCoverages = createdPolicyCoverage

      const savedPolicyEligibility = await this.policyEligibilityRepository.save(policyEligibility)
      await queryRunner.commitTransaction();
      return savedPolicyEligibility
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }


  /**
   * Gets policy eligibilities
   * @param policyEligibilityInput 
   * @returns policy eligibilities 
   */
  async getPolicyEligibilities(policyEligibilityInput: PolicyEligibilityPaginationInput): Promise<PolicyEligibilitiesPayload> {
    const { patientId, paginationOptions, searchTerm } = policyEligibilityInput
    const { limit, page } = paginationOptions
    const policies = await this.policyRepository.find({ patientId })
    const policyId = policies.map((policy) => policy.id)
    const searchInput: { policyId: FindOperator<string>, payerName?: FindOperator<string> } = {
      policyId: In(policyId)
    }
    if (searchTerm) {
      searchInput.payerName = ILike(`%${searchTerm}%`)
    }
    const [policyEligibilities, totalCount] = await this.policyEligibilityRepository.findAndCount(searchInput)

    const totalPages = Math.ceil(totalCount / limit)

    return {
      policyEligibilities: policyEligibilities,
      pagination: {
        totalCount,
        page,
        limit,
        totalPages,
      },
    }
  }

  /**
   * Gets policy coverages
   * @param policyEligibilityId 
   * @returns policy coverages 
   */
  async getPolicyCoverages(policyEligibilityId: string): Promise<PolicyCoverage[]> {
    const policyCoverages = await this.policyCoverageRepository.find({ policyEligibilityId })
    return policyCoverages
  }

  /**
   * Gets policy eligibility
   * @param policyEligibilityId 
   * @returns policy eligibility 
   */
  async getPolicyEligibility(policyEligibilityId: string): Promise<PolicyEligibilityWithPatientPayload> {
    const policyEligibility = await this.policyEligibilityRepository.findOne({ id: policyEligibilityId })
    const { policyId } = policyEligibility || {}
    const { policyHolderId, patientId } = await this.findOne(policyId)
    const policyHolder = await this.policyHolderService.findOne(policyHolderId)
    const patient = await this.patientService.findOne(patientId)
    const doctorPatients = await this.patientService.usualProvider(patientId)
    const { doctor: primaryProvider } = doctorPatients?.find(doctorPatient => doctorPatient.relation === DoctorPatientRelationType.PRIMARY_PROVIDER) || {}

    return {
      patient,
      policyEligibility,
      policyHolder,
      primaryProvider
    }
  }
}
