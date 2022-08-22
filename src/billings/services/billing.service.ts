import * as fs from 'fs';
import * as path from "path";
import states from "states-us";
import * as moment from 'moment';
import * as FormData from 'form-data';
import * as xmlBuilder from 'xmlbuilder';
import { HttpService } from '@nestjs/axios';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
const { PDFDocument, createPDFAcroFields } = require('pdf-lib');
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
//entities
import { Billing, PatientPaymentType } from '../entities/billing.entity';
import { Code, CodeType } from '../entities/code.entity';
import { MARITIALSTATUS } from 'src/patients/entities/patient.entity';
import { OrderOfBenefitType } from 'src/insurance/entities/policy.entity';
import { AppointmentStatus } from 'src/appointments/entities/appointment.entity';
import { DoctorPatientRelationType } from 'src/patients/entities/doctorPatient.entity';
//services
import { UtilsService } from 'src/util/utils.service';
import { ClaimStatusService } from './claimStatus.service';
import { PracticeService } from 'src/practice/practice.service';
import { PolicyService } from 'src/insurance/services/policy.service';
import { DoctorService } from 'src/providers/services/doctor.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { PatientService } from 'src/patients/services/patient.service';
import { ContactService } from 'src/providers/services/contact.service';
import { FacilityService } from 'src/facilities/services/facility.service';
import { InsuranceService } from 'src/insurance/services/insurance.service';
import { TaxonomiesService } from 'src/facilities/services/taxonomy.service';
import { FeeScheduleService } from 'src/feeSchedule/services/feeSchedule.service';
import { PolicyHolderService } from 'src/insurance/services/policy-holder.service';
import { AppointmentService } from 'src/appointments/services/appointment.service';
import { BillingAddressService } from 'src/providers/services/billing-address.service';
//payloads
import { BillingsPayload } from '../dto/billing-payload';
import { SuperBillPayload } from '../dto/super-bill-payload';
import { ClaimMd, ClaimMdPayload } from '../dto/claim-payload';
//inputs
import { BillingInput, FetchBillingClaimStatusesInput } from '../dto/billing-input.dto';
import { ClaimInput, CreateClaimInput, GetClaimFileInput } from '../dto/claim-input.dto';
//helpers
import { claimMedValidation } from 'src/lib/validations';
import { generateUniqueNumber, getClaimGender, getClaimRelation, getYesOrNo } from 'src/lib/helper';

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(Code)
    private codeRepository: Repository<Code>,
    @InjectRepository(Billing)
    private billingRepository: Repository<Billing>,
    private readonly connection: Connection,
    private readonly httpService: HttpService,
    private readonly utilsService: UtilsService,
    private readonly policyService: PolicyService,
    private readonly doctorService: DoctorService,
    private readonly patientService: PatientService,
    private readonly contactsService: ContactService,
    private readonly facilityService: FacilityService,
    private readonly practiceService: PracticeService,
    private readonly insuranceService: InsuranceService,
    private readonly paginationService: PaginationService,
    private readonly taxonomiesService: TaxonomiesService,
    private readonly appointmentService: AppointmentService,
    private readonly claimStatusService: ClaimStatusService,
    private readonly feeScheduleService: FeeScheduleService,
    private readonly policyHolderService: PolicyHolderService,
    private readonly billingAddressService: BillingAddressService,
  ) { }


  /**
   * Gets by appointment id
   * @param appointmentId 
   * @returns by appointment id 
   */
  async getByAppointmentId(appointmentId: string): Promise<Billing> {
    return await this.billingRepository.findOne({ appointmentId })
  }

  /**
   * Creates billing service
   * @param createBillingInput 
   * @returns create 
   */
  async create(createBillingInput: BillingInput): Promise<Billing> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { codes, patientId, appointmentId, facilityId, servicingProviderId, renderingProviderId, claimStatusId, feeScheduleId, shouldCheckout, patientPaymentType, ...billingInfoToCreate } = createBillingInput
      if (patientPaymentType) {
        const insuranceStatus = patientPaymentType === PatientPaymentType.INSURANCE ? 'insurance' : 'noInsurance'
        await this.appointmentService.updateAppointment({ id: appointmentId, insuranceStatus })
      }
      const billingInfo = await this.billingRepository.findOne({ appointmentId })
      let billingInstance: Billing
      if (billingInfo) {
        //updating billing
        billingInstance = await this.utilsService.updateEntityManager(Billing, billingInfo.id, { ...billingInfoToCreate, patientPaymentType }, this.billingRepository)
      } else {
        //creating billing
        billingInstance = await this.billingRepository.create({ ...billingInfoToCreate, patientPaymentType })
      }

      if (patientId) {
        const patient = await this.patientService.findOne(patientId)
        billingInstance.patient = patient
      }

      if (facilityId) {
        const facility = await this.facilityService.findOne(facilityId)
        billingInstance.facility = facility
      }

      if (feeScheduleId) {
        const feeSchedule = await this.feeScheduleService.findOne({ id: feeScheduleId })
        billingInstance.feeSchedule = feeSchedule
      }

      if (servicingProviderId) {
        const servicingProvider = await this.doctorService.findOne(servicingProviderId)
        billingInstance.servicingProvider = servicingProvider
      }

      if (renderingProviderId) {
        const renderingProvider = await this.doctorService.findOne(renderingProviderId)
        billingInstance.renderingProvider = renderingProvider
      }

      if (appointmentId) {
        const appointment = await this.appointmentService.findOne(appointmentId)
        billingInstance.appointment = appointment
      }

      if (claimStatusId) {
        const claimStatus = await this.claimStatusService.findOne(claimStatusId)
        billingInstance.claimStatus = claimStatus
      }
      const billing = await this.billingRepository.save(billingInstance);
      //associate codes
      if (codes) {
        const createdCodes = await Promise.all(codes?.map(async (codeToCreate) => {
          const createdCode = await this.codeRepository.create(codeToCreate)
          return await this.codeRepository.save(createdCode)
        }))

        billing.codes = createdCodes
      }

      const createdBilling = await this.billingRepository.save(billing);
      if (appointmentId && shouldCheckout) {
        if (createdBilling.id) {
          this.appointmentService.updateAppointment({
            id: appointmentId,
            status: AppointmentStatus.DISCHARGED,
            checkedOutAt: moment().toISOString()
          })
        }
      }

      await queryRunner.commitTransaction();
      return createdBilling
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Fetchs billing details by appointment id
   * @param appointmentId 
   * @returns billing details by appointment id 
   */
  async fetchBillingDetailsByAppointmentId(appointmentId: string): Promise<Billing> {
    return this.billingRepository.findOne({
      appointmentId
    })
  }

  /**
   * Gets claim info
   * @param claimInput 
   * @returns  
   */
  async getClaimInfo(claimInput: CreateClaimInput) {
    const { codes, appointmentId, patientId, autoAccident, employment, otherAccident, onsetDate, onsetDateType,
      otherDate, otherDateType, from, to } = claimInput
    const diagnosesCodes = codes?.filter(code => code.codeType === CodeType.ICD_10_CODE)
    const procedureCodes = codes?.filter(code => code.codeType === CodeType.CPT_CODE)
    const totalCharges = codes.reduce((acc, code) => {
      return acc += Number(code.price || 0)
    }, 0)
    const insuranceDetails = await this.policyService.fetchPatientInsurances(patientId)
    const appointmentInfo = await this.appointmentService.findOne(appointmentId)
    const patient = await this.patientService.findOne(patientId)

    const { patientRecord, firstName, lastName, dob, gender, middleName, maritialStatus, policyHolderId, facilityId } = patient || {}

    const facilityInfo = await this.facilityService.findOne(facilityId)
    const facilityContacts = await this.contactsService.findContactsByFacilityId(facilityId);
    const facilityBillingContact = (await this.billingAddressService.findBillingAddressByFacilityId(facilityId))[0];
    const facilityPrimaryContact = facilityContacts?.find((facilityContact) => facilityContact)
    const { cliaIdNumber, practiceId, serviceCode } = facilityInfo || {}
    const serviceC = serviceCode?.split('-')
    const pos = serviceC?.length ? serviceC?.[0] : '';
    const { state: facilityState } = facilityPrimaryContact || {}
    const facilitySt = states?.find(({ name }) => name === facilityState);
    const { abbreviation: facilityStateCode } = facilitySt || {}

    const practiceInfo = await this.practiceService.findOne(practiceId)

    let taxonomyCode
    if (practiceInfo.taxonomyCodeId) {
      taxonomyCode = await this.taxonomiesService.findOne(practiceInfo.taxonomyCodeId)
    }

    const primaryInsurance = insuranceDetails.find((insurance) => insurance.orderOfBenefit === OrderOfBenefitType.PRIMARY)
    const secondaryInsurance = insuranceDetails.find((insurance) => insurance.orderOfBenefit === OrderOfBenefitType.SECONDARY)
    const tertiaryInsurance = insuranceDetails.find((insurance) => insurance.orderOfBenefit === OrderOfBenefitType.TERTIARY)

    const insuranceDetail = !!primaryInsurance ? primaryInsurance :
      !!secondaryInsurance ? secondaryInsurance :
        tertiaryInsurance
    const { policyHolderRelationship, groupNumber, orderOfBenefit } = insuranceDetail || {}
    const insurance = await this.insuranceService.findOne(insuranceDetail?.insuranceId)
    const { payerId, payerName } = insurance || {}

    const doctorPatients = await this.patientService.usualProvider(patient.id);
    const primaryProviderInfo = doctorPatients.find((doctorPatient) => doctorPatient.relation === DoctorPatientRelationType.PRIMARY_PROVIDER)?.doctor
    const referringProviderInfo = doctorPatients.find((doctorPatient) => doctorPatient.relation === DoctorPatientRelationType.REFERRING_PROVIDER)?.doctor
    const orderingProviderInfo = doctorPatients.find((doctorPatient) => doctorPatient.relation === DoctorPatientRelationType.ORDERING_PROVIDER)?.doctor
    const renderingProviderInfo = doctorPatients.find((doctorPatient) => doctorPatient.relation === DoctorPatientRelationType.RENDERING_PROVIDER)?.doctor
    const contacts = await this.contactsService.findContactsByPatientId(patient.id);
    const { address, city, state: unFormat, zipCode, address2, phone } = contacts?.find((contact) => contact.primaryContact) || {}
    const unFormateState = states?.find(({ name }) => name === unFormat)
    const { abbreviation: state } = unFormateState || {}

    const policyHolder = await this.policyHolderService.findOne(policyHolderId)
    const {
      address: policyHolderAddress, addressCTD, firstName: policyHolderFName, lastName: policyHolderLName,
      middleName: policyHolderMName, city: policyHolderCity, state: policyHolderSt, zipCode: policyHolderZipCode,
      certificationNumber, sex: policyHolderGender, dob: policyHolderDob
    } = policyHolder || {}

    const unFormatePolicy = states?.find(({ name }) => name === policyHolderSt);
    const { abbreviation: policyHolderState } = unFormatePolicy || {}

    const { scheduleStartDateTime, scheduleEndDateTime } = appointmentInfo || {}
    const { firstName: billingProviderName, contacts: providerContacts, npi, taxId } = primaryProviderInfo || {}
    const { address: providerAddress, address2: providerAddress2, city: providerCity, state: providerState, zipCode: providerZipCode, phone: providerPhone } =
      providerContacts?.find((contact) => contact.primaryContact) || {}

    const diagnoses = diagnosesCodes?.reduce((acc, diagnosesCode, i) => {
      const { code } = diagnosesCode || {}
      const codeValue = `${code.split('.')[0]}.${code.split('.')[1] === '0' ? '00' : code.split('.')[1]}`
      acc[`diag_${i + 1}`] = diagnosesCode.code
      return acc
    }, {} as {
      diag_1?: string
      diag_2?: string
      diag_3?: string
      diag_4?: string
      diag_5?: string
      diag_6?: string
      diag_7?: string
      diag_8?: string
      diag_9?: string
      diag_10?: string
      diag_11?: string
      diag_12?: string

    })

    const procedures = procedureCodes?.map((procedureCode) => {
      const { code, price, diagPointer, m1, m2, m3, m4, unit } = procedureCode
      return {
        proc_code: code,
        charge: Number(price || 0),
        units: Number(unit || 0),
        diag_ref: diagPointer || '',
        diagPointer, m1, m2, m3, m4, unit,
      }
    })

    const claimInfo = {
      claim_form: '1500',
      payerid: payerId,
      payer_name: payerName,
      pcn: patientRecord,
      pat_name_l: lastName,
      pat_name_f: firstName,
      pat_addr_1: address,
      pat_city: city,
      pat_state: state,
      pat_zip: zipCode,
      pat_dob: moment(dob).format('MM-DD-YYYY'),
      pat_sex: getClaimGender(gender),
      pat_rel: getClaimRelation(policyHolderRelationship),
      ins_number: groupNumber,
      accept_assign: 'Y',
      total_charge: totalCharges,
      ...diagnoses,
      bill_name: facilityInfo?.name,
      bill_addr_1: facilityPrimaryContact?.address,
      bill_addr_2: facilityPrimaryContact?.address2,
      bill_city: facilityPrimaryContact?.city,
      bill_state: facilityStateCode,
      bill_zip: facilityPrimaryContact?.zipCode,
      bill_npi: practiceInfo?.npi,
      bill_phone: facilityPrimaryContact?.phone,
      bill_taxid: practiceInfo?.taxId,
      bill_taxid_type: 'E',
      bill_taxonomy: taxonomyCode ? taxonomyCode.code : '',
      from_date_1: moment(scheduleStartDateTime).format('MM-DD-YYYY'),
      thru_date: moment(scheduleEndDateTime).format('MM-DD-YYYY'),
      charge: procedures,
      payer_order: orderOfBenefit,
      pat_name_m: middleName,
      pat_addr_2: address2,
      pat_country: 'us',
      pat_phone: phone,
      pat_marital: getYesOrNo(maritialStatus === MARITIALSTATUS.MARRIED),
      // "pat_employment",
      ins_name_l: policyHolderLName,
      ins_name_f: policyHolderFName,
      ins_name_m: policyHolderMName,
      ins_addr_1: policyHolderAddress,
      ins_addr_2: addressCTD,
      ins_city: policyHolderCity,
      ins_state: policyHolderState,
      ins_zip: policyHolderZipCode,
      // ins_country: polic,
      // "ins_phone",
      ins_group: certificationNumber,
      // "ins_plan",
      ins_dob: moment(policyHolderDob).format('MM-DD-YYYY'),
      ins_sex: getClaimGender(gender),
      // "ins_employer",
      // "other_ins_name_l",
      // "other_ins_name_f",
      // "other_ins_name_m",
      // "other_ins_number",
      // "other_payer_name",
      // "other_claimfilingcode",
      // "other_payerid",
      // "other_payer_addr_1",
      // "other_payer_addr_2",
      // "other_payer_city",
      // "other_payer_state",
      // "other_payer_zip",
      // "other_ins_dob",
      // "other_ins_sex",
      // "other_pat_rel",
      // "other_ins_payment_date",
      // "other_ins_medicare_code",
      employment_related: getYesOrNo(employment),
      auto_accident: getYesOrNo(autoAccident),
      // "auto_accident_state",
      other_accident: getYesOrNo(otherAccident),
      ref_name_l: referringProviderInfo?.lastName,
      ref_name_f: referringProviderInfo?.firstName,
      ref_name_m: referringProviderInfo?.middleName,
      ref_id: referringProviderInfo?.npi,
      ref_npi: referringProviderInfo?.npi,
      cond: onsetDateType,
      onset: otherDateType,
      cond_date: onsetDate ? moment(onsetDate).format('MM-DD-YYYY') : '',  //this represents current illness in dr.chrono claim page
      onset_date: otherDate ? moment(otherDate).format('MM-DD-YYYY') : '', // this represents other as onset in dr.chrono claim page
      // "lastseen_date",
      // "nowork_from_date",
      // "nowork_to_date",
      hosp_from_date: from,
      hosp_thru_date: to,
      // "chiro_manifest_date",
      // "info_release",
      // "special_identifier",
      // "prior_auth",
      clia_number: cliaIdNumber,
      // "referral_number",
      // "clinical_trial_number",
      // "accept_assign",
      // "total_charge",
      // "amount_paid",
      // "diag_1",
      // "diag_2",
      // "diag_3",
      // "diag_4",
      // "diag_5",
      // "diag_6",
      // "diag_7",
      // "diag_8",
      // "diag_9",
      // "diag_10",
      // "diag_11",
      // "diag_12",
      facility_name: facilityInfo?.name,
      facility_addr_1: facilityPrimaryContact?.address,
      facility_addr_2: facilityPrimaryContact?.address2,
      facility_city: facilityPrimaryContact?.city,
      facility_state: facilityStateCode,
      facility_zip: facilityPrimaryContact?.zipCode,
      facility_npi: practiceInfo?.npi,
      facility_id: facilityInfo?.npi,
      // "bill_name",
      // "bill_addr_1",
      // "bill_addr_2",
      // "bill_city",
      // "bill_state",
      // "bill_zip",
      // "bill_npi",
      // "bill_id",
      // "bill_phone",
      // "bill_taxid",
      // "bill_taxid_type",
      // "bill_taxonomy",
      prov_name_l: renderingProviderInfo?.lastName,
      prov_name_f: renderingProviderInfo?.firstName,
      prov_name_m: renderingProviderInfo?.middleName,
      prov_npi: renderingProviderInfo?.npi,
      // prov_id,
      // prov_taxonomy,
      // prov_taxid,
      // prov_taxid_type,
      ord_name_l: orderingProviderInfo?.lastName,
      ord_name_f: orderingProviderInfo?.firstName,
      ord_name_m: orderingProviderInfo?.middleName,
      ord_npi: orderingProviderInfo?.npi,
      // "remote_fileid",
      // "remote_batchid",
      // "remote_claimid",
      // "chiro_condition",
      // "chiro_xray_available",
      // "chiro_xray_date",
      // "initial_treatment_date",
      // "narrative",
      // "homebound",
      // "mrn",
      // "cond_code_1",
      // "cond_code_2",
      // "cond_code_3",
      // "icn_dcn_1",
      // "total_non_covered",
      // "amb_purpose_of_rt",
      // "amb_purpose_of_str",
      // "ambulance",
      // "amb_patient_weight",
      // "amb_to_for",
      // "amb_stretcher",
      // "amb_bed_confined_before",
      // "amb_bed_confined_after",
      // "amb_shock",
      // "amb_emergency",
      // "amb_restraint",
      // "amb_vis_hemor",
      // "amb_patient_admitted",
      // "amb_miles",
      // "pickup_addr_1",
      // "pickup_addr_2",
      // "pickup_city",
      // "pickup_state",
      // "pickup_zip",
      // "dropoff_addr_1",
      // "dropoff_addr_2",
      // "dropoff_city",
      // "dropoff_state",
      // "dropoff_zip",
      // "pay_name",
      // "pay_addr_1",
      // "pay_addr_2",
      // "pay_city",
      // "pay_state",
      // "pay_zip",
      // "remote_chgid",
      // from_date: scheduleStartDateTime,
      // "thru_date",
      place_of_service_1: pos?.trim(),
      // "proc_code",
      // "mod1",
      // "mod2",
      // "mod3",
      // "mod4",
      // "diag_ref",
      // "charge",
      // "charge_record_type",
      // "units",
      // "emergency_indicator",
      // "narrative",
      // "primary_paid_amount",
      // "primary_allowed_amount",
      // "primary_paid_date",
      // "ndc_code",
      // "ndc_dosage",
      // "ndc_measure",
      // "ndc_price",
      // "adj_code_1",
      // "adj_code_2",
      // "adj_code_3",
      // "adj_code_4",
      // "adj_code_5",
      // "adj_code_6",
      // "adj_code_7",
      // "adj_code_8",
      // "adj_amt_1",
      // "adj_amt_2",
      // "adj_amt_3",
      // "adj_amt_4",
      // "adj_amt_5",
      // "adj_amt_6",
      // "adj_amt_7",
      // "adj_amt_8",
      // "chg_prov_name_l",
      // "chg_prov_name_f",
      // "chg_prov_name_m",
      // "chg_prov_taxonomy",
      // "chg_prov_npi",
      // "chg_prov_id",
      chg_facility_name: facilityInfo?.name,
      chg_facility_addr_1: facilityPrimaryContact?.address,
      chg_facility_addr_2: facilityPrimaryContact?.address2,
      chg_facility_city: facilityPrimaryContact?.city,
      chg_facility_state: facilityStateCode,
      chg_facility_zip: facilityPrimaryContact?.zipCode,
      chg_facility_npi: facilityInfo?.npi,
      // chg_prior_auth,
      // "epsdt_indicator",
      // "familyplan_indicator",
      facility_clia: facilityInfo?.cliaIdNumber,
      // "hospice_employed",
      // "amb_riders",
      // "primary_paid_amount_2",
      // "primary_paid_date_2",
      // "adj_code_1_2",
      // "adj_amt_1_2",
      // "adj_code_2_2",
      // "adj_amt_2_2",
      // "adj_code_3_2",
      // "adj_amt_3_2",
      // "adj_code_4_2",
      // "adj_amt_4_2",
      // "adj_code_5_2",
      // "adj_amt_5_2",
      // "adj_code_6_2",
      // "adj_amt_6_2",
      // "adj_code_7_2",
      // "adj_amt_8_2",
      // "adj_code_8_2",
      // "adj_amt_8_2",
      ord_prov_name_l: orderingProviderInfo?.lastName,
      ord_prov_name_f: orderingProviderInfo?.firstName,
      ord_prov_name_m: orderingProviderInfo?.middleName,
      ord_prov_npi: orderingProviderInfo?.npi,
      // ord_prov_addr_1: orderingProvider,
      // "ord_prov_addr_2",
      // "ord_prov_city",
      // "ord_prov_state",
      // "ord_prov_zip",
      // "ord_prov_contact_name",
      // "ord_prov_contact_phone",
      // "ord_prov_contact_fax",
      // "chg_supv_prov_name_l",
      // "chg_supv_prov_name_f",
      // "chg_supv_prov_name_m",
      // "chg_supv_prov_npi",
      // "chg_supv_prov_id",
      // "chg_pickup_addr_1",
      // "chg_pickup_addr_2",
      // "chg_pickup_city",
      // "chg_pickup_state",
      // "chg_pickup_zip",
      // "chg_dropoff_name",
      // "chg_dropoff_addr_1",
      // "chg_dropoff_addr_2",
      // "chg_dropoff_city",
      // "chg_dropoff_state",
      // "chg_dropoff_zip",
      // "obstetric_additional_units",
      // "chg_amb_patient_weight",
      // "chg_amb_to_for",
      // "chg_amb_miles",
      // "chg_amb_purpose_of_rt",
      // "chg_amb_purpose_of_str"
    }

    return claimInfo
  }


  /**
   * Gets md claim info
   * @param claimInput 
   * @returns md claim info 
   */
  async getMdClaimInfo(claimInput: CreateClaimInput): Promise<ClaimMdPayload> {
    const { codes, appointmentId, patientId, autoAccident, employment, otherAccident, onsetDate, onsetDateType,
      otherDate, otherDateType, from, to } = claimInput
    const diagnosesCodes = codes?.filter(code => code.codeType === CodeType.ICD_10_CODE)
    const procedureCodes = codes?.filter(code => code.codeType === CodeType.CPT_CODE)
    const totalCharges = codes.reduce((acc, code) => {
      return acc += Number(code.price || 0)
    }, 0)
    const insuranceDetails = await this.policyService.fetchPatientInsurances(patientId)
    const appointmentInfo = await this.appointmentService.findOne(appointmentId)
    const patient = await this.patientService.findOne(patientId)

    const { patientRecord, firstName, lastName, dob, gender, middleName, maritialStatus, policyHolderId, facilityId } = patient || {}

    const facilityInfo = await this.facilityService.findOne(facilityId)
    const facilityContacts = await this.contactsService.findContactsByFacilityId(facilityId);
    const facilityPrimaryContact = facilityContacts?.find((facilityContact) => facilityContact)
    const { cliaIdNumber, practiceId, serviceCode } = facilityInfo || {}
    const serviceC = serviceCode?.split('-')
    const pos = serviceC?.length ? serviceC?.[0] : '';
    const { state: facilityState } = facilityPrimaryContact || {}
    const facilitySt = states?.find(({ name }) => name === facilityState);
    const { abbreviation: facilityStateCode } = facilitySt || {}

    const practiceInfo = await this.practiceService.findOne(practiceId)

    let taxonomyCode
    if (practiceInfo.taxonomyCodeId) {
      taxonomyCode = await this.taxonomiesService.findOne(practiceInfo.taxonomyCodeId)
    }

    const primaryInsurance = insuranceDetails.find((insurance) => insurance.orderOfBenefit === OrderOfBenefitType.PRIMARY)
    const secondaryInsurance = insuranceDetails.find((insurance) => insurance.orderOfBenefit === OrderOfBenefitType.SECONDARY)
    const tertiaryInsurance = insuranceDetails.find((insurance) => insurance.orderOfBenefit === OrderOfBenefitType.TERTIARY)

    const insuranceDetail = !!primaryInsurance ? primaryInsurance :
      !!secondaryInsurance ? secondaryInsurance :
        tertiaryInsurance
    const { policyHolderRelationship, groupNumber, orderOfBenefit } = insuranceDetail || {}
    const insurance = await this.insuranceService.findOne(insuranceDetail?.insuranceId)
    const { payerId, payerName } = insurance || {}

    const doctorPatients = await this.patientService.usualProvider(patient.id);
    const referringProviderInfo = doctorPatients.find((doctorPatient) => doctorPatient.relation === DoctorPatientRelationType.REFERRING_PROVIDER)?.doctor
    const orderingProviderInfo = doctorPatients.find((doctorPatient) => doctorPatient.relation === DoctorPatientRelationType.ORDERING_PROVIDER)?.doctor
    const renderingProviderInfo = doctorPatients.find((doctorPatient) => doctorPatient.relation === DoctorPatientRelationType.RENDERING_PROVIDER)?.doctor
    const contacts = await this.contactsService.findContactsByPatientId(patient.id);
    const { address, city, state: unFormat, zipCode, address2, phone } = contacts?.find((contact) => contact.primaryContact) || {}
    const unFormateState = states?.find(({ name }) => name === unFormat)
    const { abbreviation: state } = unFormateState || {}

    const policyHolder = await this.policyHolderService.findOne(policyHolderId)
    const {
      address: policyHolderAddress, addressCTD, firstName: policyHolderFName, lastName: policyHolderLName,
      middleName: policyHolderMName, city: policyHolderCity, state: policyHolderSt, zipCode: policyHolderZipCode,
      certificationNumber, dob: policyHolderDob
    } = policyHolder || {}

    const unFormatePolicy = states?.find(({ name }) => name === policyHolderSt);
    const { abbreviation: policyHolderState } = unFormatePolicy || {}

    const { scheduleStartDateTime, scheduleEndDateTime } = appointmentInfo || {}

    const diagnoses = diagnosesCodes?.reduce((acc, diagnosesCode, i) => {
      const { code } = diagnosesCode || {}
      acc[`diag_${i + 1}`] = code
      return acc
    }, {} as {
      diag_1?: string
      diag_2?: string
      diag_3?: string
      diag_4?: string
      diag_5?: string
      diag_6?: string
      diag_7?: string
      diag_8?: string
      diag_9?: string
      diag_10?: string
      diag_11?: string
      diag_12?: string

    })

    const procedures = procedureCodes?.map((procedureCode, i) => {
      const { code, price, diagPointer, m1, m2, m3, m4, unit } = procedureCode
      return {
        proc_code: code,
        charge: Number(price || 0),
        units: Number(unit || 0),
        diag_ref: diagPointer || '',
        diagPointer, m1, m2, m3, m4, unit,
      }
    })

    const fromDateValues = procedureCodes?.reduce((acc, procedureCode, i) => {
      acc[`from_date_${i + 1}`] = moment(scheduleStartDateTime).format('MM-DD-YYYY')
      return acc
    }, {})

    const posValues = procedureCodes?.reduce((acc, procedureCode, i) => {
      acc[`place_of_service_${i + 1}`] = pos?.trim()
      return acc
    }, {})

    const claimInfo = {
      claim_form: '1500',
      payerid: payerId,
      payer_name: payerName,
      pcn: patientRecord,
      pat_name_l: lastName,
      pat_name_f: firstName,
      pat_addr_1: address,
      pat_city: city,
      pat_state: state,
      pat_zip: zipCode,
      pat_dob: moment(dob).format('MM-DD-YYYY'),
      pat_sex: getClaimGender(gender),
      pat_rel: getClaimRelation(policyHolderRelationship),
      ins_number: groupNumber,
      accept_assign: 'Y',
      total_charge: totalCharges,
      ...diagnoses,
      bill_name: facilityInfo?.name,
      bill_addr_1: facilityPrimaryContact?.address,
      bill_addr_2: facilityPrimaryContact?.address2,
      bill_city: facilityPrimaryContact?.city,
      bill_state: facilityStateCode,
      bill_zip: facilityPrimaryContact?.zipCode,
      bill_npi: practiceInfo?.npi,
      bill_phone: facilityPrimaryContact?.phone,
      bill_taxid: practiceInfo?.taxId,
      bill_taxid_type: 'E',
      bill_taxonomy: taxonomyCode ? taxonomyCode.code : '',
      from_date_1: moment(scheduleStartDateTime).format('MM-DD-YYYY'),
      thru_date: moment(scheduleEndDateTime).format('MM-DD-YYYY'),
      charge: procedures,
      payer_order: orderOfBenefit,
      pat_name_m: middleName,
      pat_addr_2: address2,
      pat_country: 'us',
      pat_phone: phone,
      pat_marital: getYesOrNo(maritialStatus === MARITIALSTATUS.MARRIED),
      ins_name_l: policyHolderLName,
      ins_name_f: policyHolderFName,
      ins_name_m: policyHolderMName,
      ins_addr_1: policyHolderAddress,
      ins_addr_2: addressCTD,
      ins_city: policyHolderCity,
      ins_state: policyHolderState,
      ins_zip: policyHolderZipCode,
      ins_group: certificationNumber,
      ins_dob: moment(policyHolderDob).format('MM-DD-YYYY'),
      ins_sex: getClaimGender(gender),
      employment_related: getYesOrNo(employment),
      auto_accident: getYesOrNo(autoAccident),
      other_accident: getYesOrNo(otherAccident),
      ref_name_l: referringProviderInfo?.lastName,
      ref_name_f: referringProviderInfo?.firstName,
      ref_name_m: referringProviderInfo?.middleName,
      ref_id: referringProviderInfo?.npi,
      ref_npi: referringProviderInfo?.npi,
      cond: onsetDateType,
      onset: otherDateType,
      cond_date: onsetDate ? moment(onsetDate).format('MM-DD-YYYY') : '',
      onset_date: onsetDate ? moment(onsetDate).format('MM-DD-YYYY') : '',
      hosp_from_date: from ? moment(from).format('MM-DD-YYYY') : '',
      hosp_thru_date: to ? moment(to).format('MM-DD-YYYY') : '',
      clia_number: cliaIdNumber,
      facility_name: facilityInfo?.name,
      facility_addr_1: facilityPrimaryContact?.address,
      facility_addr_2: facilityPrimaryContact?.address2,
      facility_city: facilityPrimaryContact?.city,
      facility_state: facilityStateCode,
      facility_zip: facilityPrimaryContact?.zipCode,
      facility_npi: practiceInfo?.npi,
      facility_id: facilityInfo?.npi,
      prov_name_l: renderingProviderInfo?.lastName,
      prov_name_f: renderingProviderInfo?.firstName,
      prov_name_m: renderingProviderInfo?.middleName,
      prov_npi: renderingProviderInfo?.npi,
      ord_name_l: orderingProviderInfo?.lastName,
      ord_name_f: orderingProviderInfo?.firstName,
      ord_name_m: orderingProviderInfo?.middleName,
      ord_npi: orderingProviderInfo?.npi,
      place_of_service_1: pos?.trim(),
      chg_facility_name: facilityInfo?.name,
      chg_facility_addr_1: facilityPrimaryContact?.address,
      chg_facility_addr_2: facilityPrimaryContact?.address2,
      chg_facility_city: facilityPrimaryContact?.city,
      chg_facility_state: facilityStateCode,
      chg_facility_zip: facilityPrimaryContact?.zipCode,
      chg_facility_npi: facilityInfo?.npi,
      facility_clia: facilityInfo?.cliaIdNumber,
      ord_prov_name_l: orderingProviderInfo?.lastName,
      ord_prov_name_f: orderingProviderInfo?.firstName,
      ord_prov_name_m: orderingProviderInfo?.middleName,
      ord_prov_npi: orderingProviderInfo?.npi,
      ...fromDateValues,
      ...posValues
    }

    return claimInfo
  }

  /**
   * Gets claim file
   * @param claimInput 
   * @returns  
   */
  async getClaimFile(claimInput: GetClaimFileInput) {
    const claimInfo = await this.getClaimInfo({ ...claimInput })
    const file = await fs.readFileSync(path.resolve(__dirname, "../../../../form-1500.pdf"))
    const pdfDoc = await PDFDocument.load(file);
    const form = pdfDoc.getForm()

    const ins_sex_kids = createPDFAcroFields(form.getCheckBox('ins_sex').acroField.Kids()).map(_ => _[0]);
    claimInfo.ins_sex === 'M' && ins_sex_kids[0].setValue(ins_sex_kids[0].getOnValue())
    claimInfo.ins_sex === 'F' && ins_sex_kids[1].setValue(ins_sex_kids[1].getOnValue());

    const pat_sex_kids = createPDFAcroFields(form.getCheckBox('sex').acroField.Kids()).map(_ => _[0]);
    claimInfo.pat_sex === 'M' && pat_sex_kids[0].setValue(pat_sex_kids[0].getOnValue())
    claimInfo.pat_sex === 'F' && pat_sex_kids[1].setValue(pat_sex_kids[1].getOnValue());

    const employment_kids = createPDFAcroFields(form.getCheckBox('employment').acroField.Kids()).map(_ => _[0]);
    claimInfo.employment_related === 'Y' && employment_kids[0].setValue(employment_kids[0].getOnValue())
    claimInfo.employment_related === 'N' && employment_kids[1].setValue(employment_kids[1].getOnValue());

    const pt_auto_accident_kids = createPDFAcroFields(form.getCheckBox('pt_auto_accident').acroField.Kids()).map(_ => _[0]);
    claimInfo.auto_accident === 'Y' && pt_auto_accident_kids[0].setValue(pt_auto_accident_kids[0].getOnValue())
    claimInfo.auto_accident === 'N' && pt_auto_accident_kids[1].setValue(pt_auto_accident_kids[1].getOnValue());

    const other_accident_kids = createPDFAcroFields(form.getCheckBox('other_accident').acroField.Kids()).map(_ => _[0]);
    claimInfo.other_accident === 'Y' && other_accident_kids[0].setValue(other_accident_kids[0].getOnValue())
    claimInfo.other_accident === 'N' && other_accident_kids[1].setValue(other_accident_kids[1].getOnValue());

    const rel_to_ins_kids = createPDFAcroFields(form.getCheckBox('rel_to_ins').acroField.Kids()).map(_ => _[0]);
    if (claimInfo.pat_rel === '18') {
      rel_to_ins_kids[0].setValue(rel_to_ins_kids[0].getOnValue())
    } else if (claimInfo.pat_rel === '01') {
      rel_to_ins_kids[1].setValue(rel_to_ins_kids[1].getOnValue())
    } else if (claimInfo.pat_rel === '19') {
      rel_to_ins_kids[2].setValue(rel_to_ins_kids[2].getOnValue())
    } else {
      rel_to_ins_kids[3].setValue(rel_to_ins_kids[3].getOnValue())
    }

    const ins_benefit_plan_kids = createPDFAcroFields(form.getCheckBox('ins_benefit_plan').acroField.Kids()).map(_ => _[0]);
    claimInfo.payer_order ? ins_benefit_plan_kids[0].setValue(ins_benefit_plan_kids[0].getOnValue()) : ins_benefit_plan_kids[1].setValue(ins_benefit_plan_kids[1].getOnValue());

    form.getTextField('pt_name').setText(`${claimInfo.pat_name_l || ''}, ${claimInfo.pat_name_f || ''}, ${claimInfo.pat_name_m || ''}`)
    claimInfo.payerid && form.getTextField('insurance_id').setText(`${claimInfo.payerid}`)
    form.getTextField('ins_name').setText(`${claimInfo.ins_name_l || ''}, ${claimInfo.ins_name_f || ''}, ${claimInfo.ins_name_m || ''}`)
    form.getTextField('birth_mm').setText(`${moment(claimInfo.pat_dob).format('MM')}`)
    form.getTextField('birth_dd').setText(`${moment(claimInfo.pat_dob).format('DD')}`)
    form.getTextField('birth_yy').setText(`${moment(claimInfo.pat_dob).format('YY')}`)
    claimInfo.pat_addr_1 && form.getTextField('pt_street').setText(claimInfo.pat_addr_1)
    claimInfo.pat_city && form.getTextField('pt_city').setText(claimInfo.pat_city)
    claimInfo.pat_state && form.getTextField('pt_state').setText(states?.find((state) => state?.name === claimInfo.pat_state)?.abbreviation ?? '')
    claimInfo.pat_zip && form.getTextField('pt_zip').setText(claimInfo.pat_zip)
    claimInfo.pat_phone && form.getTextField('pt_AreaCode').setText(claimInfo.pat_phone?.slice(0, 3))
    claimInfo.pat_phone && form.getTextField('pt_phone').setText(claimInfo.pat_phone?.slice(3, claimInfo.pat_phone?.length))
    claimInfo.ins_addr_1 && form.getTextField('ins_street').setText(claimInfo.ins_addr_1)
    claimInfo.ins_city && form.getTextField('ins_city').setText(claimInfo.ins_city)
    claimInfo.ins_state && form.getTextField('ins_state').setText(states?.find((state) => state?.name === claimInfo.ins_state)?.abbreviation ?? '')
    claimInfo.ins_zip && form.getTextField('ins_zip').setText(claimInfo.ins_zip)
    form.getTextField('ins_phone area')
    form.getTextField('ins_phone')
    claimInfo.ins_group && form.getTextField('ins_policy').setText(`${claimInfo.ins_group}`)
    claimInfo.ins_dob && form.getTextField('ins_dob_mm').setText(`${moment(claimInfo.ins_dob).format('MM')}`)
    claimInfo.ins_dob && form.getTextField('ins_dob_dd').setText(`${moment(claimInfo.ins_dob).format('DD')}`)
    claimInfo.ins_dob && form.getTextField('ins_dob_yy').setText(`${moment(claimInfo.ins_dob).format('YY')}`)
    claimInfo.hosp_from_date && form.getTextField('hosp_mm_from').setText(`${moment(claimInfo.hosp_from_date).format('MM')}`)
    claimInfo.hosp_from_date && form.getTextField('hosp_dd_from').setText(`${moment(claimInfo.hosp_from_date).format('DD')}`)
    claimInfo.hosp_from_date && form.getTextField('hosp_yy_from').setText(`${moment(claimInfo.hosp_from_date).format('YY')}`)
    claimInfo.hosp_thru_date && form.getTextField('hosp_mm_end').setText(`${moment(claimInfo.hosp_from_date).format('MM')}`)
    claimInfo.hosp_thru_date && form.getTextField('hosp_dd_end').setText(`${moment(claimInfo.hosp_from_date).format('DD')}`)
    claimInfo.hosp_thru_date && form.getTextField('hosp_yy_end').setText(`${moment(claimInfo.hosp_from_date).format('YY')}`)
    form.getTextField('other_ins_name')
    form.getTextField('other_ins_policy')
    form.getTextField('ins_plan_name')
    form.getTextField('pt_date')
    // claimInfo.cond && form.getTextField('73').setText(`${claimInfo.cond}`)
    claimInfo.cond_date && form.getTextField('cur_ill_mm').setText(`${moment(claimInfo.cond_date).format('MM')}`)
    claimInfo.cond_date && form.getTextField('cur_ill_dd').setText(`${moment(claimInfo.cond_date).format('DD')}`)
    claimInfo.cond_date && form.getTextField('cur_ill_yy').setText(`${moment(claimInfo.cond_date).format('YY')}`)
    form.getTextField('ref_physician')
    form.getTextField('id_physician')
    form.getTextField('physician number 17a1')
    form.getTextField('physician number 17a')
    claimInfo.onset && form.getTextField('74').setText(`${claimInfo.onset}`)
    claimInfo.onset_date && form.getTextField('sim_ill_mm').setText(`${moment(claimInfo.onset_date).format('MM')}`)
    claimInfo.onset_date && form.getTextField('sim_ill_dd').setText(`${moment(claimInfo.onset_date).format('DD')}`)
    claimInfo.onset_date && form.getTextField('sim_ill_yy').setText(`${moment(claimInfo.onset_date).format('YY')}`)
    // claimInfo.employment_related === 'Y' && form.getCheckBox('employment').check(claimInfo.employment_related)
    // claimInfo.auto_accident === 'Y' && form.getCheckBox('pt_auto_accident').check(claimInfo.auto_accident)
    // claimInfo.other_accident === 'Y' && form.getCheckBox('other_accident').check(claimInfo.other_accident)
    claimInfo.diag_1 && form.getTextField('diagnosis1').setText(`${claimInfo.diag_1}`)
    claimInfo.diag_2 && form.getTextField('diagnosis2').setText(`${claimInfo.diag_2}`)
    claimInfo.diag_3 && form.getTextField('diagnosis3').setText(`${claimInfo.diag_3}`)
    claimInfo.diag_4 && form.getTextField('diagnosis4').setText(`${claimInfo.diag_4}`)
    claimInfo.diag_5 && form.getTextField('diagnosis5').setText(`${claimInfo.diag_5}`)
    claimInfo.diag_6 && form.getTextField('diagnosis6').setText(`${claimInfo.diag_6}`)
    claimInfo.diag_7 && form.getTextField('diagnosis7').setText(`${claimInfo.diag_7}`)
    claimInfo.diag_8 && form.getTextField('diagnosis8').setText(`${claimInfo.diag_8}`)
    claimInfo.diag_9 && form.getTextField('diagnosis9').setText(`${claimInfo.diag_9}`)
    claimInfo.diag_10 && form.getTextField('diagnosis10').setText(`${claimInfo.diag_10}`)
    claimInfo.diag_11 && form.getTextField('diagnosis11').setText(`${claimInfo.diag_11}`)
    claimInfo.diag_12 && form.getTextField('diagnosis12').setText(`${claimInfo.diag_12}`)
    claimInfo.bill_taxid && form.getTextField('tax_id').setText(`${claimInfo.bill_taxid}`)
    claimInfo.bill_taxid_type && form.getCheckBox('276').check(`${claimInfo.bill_taxid_type}`)
    claimInfo.pcn && form.getTextField('pt_account').setText(`${claimInfo.pcn}`)
    claimInfo.accept_assign && form.getCheckBox('assignment').check(`${claimInfo.accept_assign}`)
    claimInfo.facility_name && form.getTextField('fac_name').setText(`${claimInfo.facility_name}`)
    claimInfo.facility_addr_1 && form.getTextField('fac_street').setText(`${claimInfo.facility_addr_1}`)
    claimInfo.facility_city && form.getTextField('fac_location').setText(`${claimInfo.facility_city}`)
    claimInfo.bill_name && form.getTextField('doc_name').setText(`${claimInfo.bill_name}`)
    claimInfo.bill_addr_1 && form.getTextField('doc_street').setText(`${claimInfo.bill_addr_1}`)
    claimInfo.bill_city && form.getTextField('doc_location').setText(`${claimInfo.bill_city}`)
    claimInfo.bill_phone && form.getTextField('doc_phone area').setText(`${claimInfo.bill_phone?.slice(0, 3)}`)
    claimInfo.bill_phone && form.getTextField('doc_phone').setText(`${claimInfo.bill_phone?.slice(3, claimInfo.bill_phone?.length)}`)
    claimInfo.bill_npi && form.getTextField('pin').setText(`${claimInfo.bill_npi}`)
    claimInfo.facility_npi && form.getTextField('pin1').setText(claimInfo.facility_npi ?? '')
    claimInfo.bill_taxid && form.getTextField('grp').setText(`${claimInfo.bill_taxid}`)
    claimInfo.facility_id && form.getTextField('grp1').setText(claimInfo.facility_id ?? '')
    claimInfo.total_charge && form.getTextField('t_charge').setText(String(claimInfo.total_charge))

    claimInfo.charge?.length && claimInfo.charge.forEach((chargeValue, i) => {
      claimInfo.from_date_1 && form.getTextField(`sv${i + 1}_mm_from`).setText(`${moment(claimInfo.from_date_1).format('MM')}`)
      claimInfo.from_date_1 && form.getTextField(`sv${i + 1}_dd_from`).setText(`${moment(claimInfo.from_date_1).format('DD')}`)
      claimInfo.from_date_1 && form.getTextField(`sv${i + 1}_yy_from`).setText(`${moment(claimInfo.from_date_1).format('YY')}`)
      claimInfo.thru_date && form.getTextField(`sv${i + 1}_mm_end`).setText(`${moment(claimInfo.thru_date).format('MM')}`)
      claimInfo.thru_date && form.getTextField(`sv${i + 1}_dd_end`).setText(`${moment(claimInfo.thru_date).format('DD')}`)
      claimInfo.thru_date && form.getTextField(`sv${i + 1}_yy_end`).setText(`${moment(claimInfo.thru_date).format('YY')}`)
      claimInfo.chg_facility_state && form.getTextField(`place${i + 1}`).setText(states?.find((state) => state?.name === claimInfo.chg_facility_state)?.abbreviation ?? '')
      chargeValue.charge && form.getTextField(`ch${i + 1}`).setText(String(chargeValue.charge))
      chargeValue.proc_code && form.getTextField(`cpt${i + 1}`).setText(chargeValue.proc_code)
      chargeValue.diagPointer && form.getTextField(`diag${i + 1}`).setText(chargeValue.diagPointer)
      chargeValue.m1 && form.getTextField(`mod${i + 1}`).setText(chargeValue.m1)
      chargeValue.m2 && form.getTextField(`mod${i + 1}a`).setText(chargeValue.m2)
      chargeValue.m3 && form.getTextField(`mod${i + 1}b`).setText(chargeValue.m3)
      chargeValue.m4 && form.getTextField(`mod${i + 1}c`).setText(chargeValue.m4)
      chargeValue.unit && form.getTextField(`day${i + 1}`).setText(chargeValue.unit)
      claimInfo.prov_npi && form.getTextField(`local${i + 1}`).setText(claimInfo.prov_npi)
    })
    // form.flatten()    //This makes the form readonly but also uncheck the checkboxes values
    const pdfBytes = await pdfDoc.save()
    return pdfBytes
  }

  /**
   * Creates claim info
   * @param claimInput 
   * @returns claim info 
   */
  async createClaimInfo(claimInput: CreateClaimInput): Promise<ClaimMd> {
    try {
      const claimInfo = await this.getClaimInfo(claimInput)
      const claimMedValidationKeys = Object.keys(claimMedValidation.describe().keys)
      const transformedClaimInfo = Object.keys(claimInfo).reduce((acc, key) => {
        if (claimMedValidationKeys.includes(key)) {
          acc[key] = claimInfo[key]
          return acc
        }
        return acc
      }, {})

      const result = claimMedValidation.validate(transformedClaimInfo)
      if (result.error) {
        const errorMessages = [...result.error.details.map((d) => d.message), !claimInfo.charge?.length ? 'Procedure code is missing' : ''].join();
        throw new BadRequestException(errorMessages);
      }

      const claimInfoToFormat = Object.keys(claimInfo).reduce((acc, claimInfoKey) => {
        if (claimInfoKey === 'charge') {
          acc[claimInfoKey] = claimInfo[claimInfoKey].map((chargeObj) => {
            return Object.keys(chargeObj).reduce((innerAcc, key) => {
              innerAcc[`@${key}`] = chargeObj[key]
              return innerAcc
            }, {})
          })

          return acc
        }

        acc[`@${claimInfoKey}`] = claimInfo[claimInfoKey]
        return acc
      }, {})

      var feed = xmlBuilder.create({ claims: { claim: claimInfoToFormat } }, { headless: true });
      var feed1 = feed.end({ pretty: true });
      let fullName = `./sample_${generateUniqueNumber()}.xml`
      fs.writeFile(fullName, feed1, (err) => {
        if (err) {
          throw err;
        }
      });

      const xmlFile = await fs.createReadStream(path.resolve(__dirname, `../../../../${fullName}`));

      const formData = new FormData()
      formData.append('AccountKey', process.env.CLAIM_MD_ID)
      formData.append('File', xmlFile)

      const response = await this.httpService.post('https://www.claim.md/services/upload/', formData, {
        headers: {
          'Accept': 'text/json'
        }
      })?.toPromise()

      fs.unlinkSync(path.resolve(__dirname, `../../../../${fullName}`))

      return claimInfo

    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  /**
   * Gets super bill info
   * @param appointmentId 
   * @returns super bill info 
   */
  async getSuperBillInfo(appointmentId): Promise<SuperBillPayload> {
    const billingInfo = await this.fetchBillingDetailsByAppointmentId(appointmentId)
    const appointmentInfo = await this.appointmentService.findOne(appointmentId)
    const patientInfo = await this.patientService.findOne(appointmentInfo.patientId)
    const providersInfo = await this.patientService.usualProvider(patientInfo.id)
    const insuranceDetails = await this.policyService.fetchPatientInsurances(patientInfo.id)
    const primaryInsurance = insuranceDetails.find((insurance) => insurance.orderOfBenefit === OrderOfBenefitType.PRIMARY)
    const secondaryInsurance = insuranceDetails.find((insurance) => insurance.orderOfBenefit === OrderOfBenefitType.SECONDARY)
    const tertiaryInsurance = insuranceDetails.find((insurance) => insurance.orderOfBenefit === OrderOfBenefitType.TERTIARY)
    const insuranceDetail = !!primaryInsurance ? primaryInsurance :
      !!secondaryInsurance ? secondaryInsurance :
        tertiaryInsurance
    const policyHolderInfo = await this.policyHolderService.findOne(insuranceDetail.policyHolderId)

    const primaryProvider = providersInfo.find((providerInfo) => providerInfo.relation === DoctorPatientRelationType.PRIMARY_PROVIDER)?.doctor

    return {
      appointmentInfo,
      providerInfo: primaryProvider,
      insuranceDetail,
      policyHolderInfo,
      patientInfo,
      billingInfo
    }
  }

  /**
   * Gets billing by apt
   * @param appointmentId 
   * @returns billing by apt 
   */
  async getBillingByApt(appointmentId: string): Promise<Billing> {
    return await this.billingRepository.findOne({ appointmentId })
  }

  /**
   * Finds one
   * @param id 
   * @returns one 
   */
  async findOne(id: string): Promise<Billing> {
    return await this.billingRepository.findOne({ id })
  }

  /**
   * Submits claim to claim md
   * @param claimInfo 
   * @returns  
   */
  async submitClaimToClaimMd(claimInfo: ClaimInput) {
    try {
      const claimInfoToFormat = Object.keys(claimInfo).reduce((acc, claimInfoKey) => {
        if (claimInfoKey === 'charge') {
          acc[claimInfoKey] = claimInfo[claimInfoKey].map((chargeObj) => {
            return Object.keys(chargeObj).reduce((innerAcc, key) => {
              innerAcc[`@${key}`] = chargeObj[key]
              return innerAcc
            }, {})
          })

          return acc
        }

        acc[`@${claimInfoKey}`] = claimInfo[claimInfoKey]
        return acc
      }, {})

      var feed = xmlBuilder.create({ claims: { claim: claimInfoToFormat } }, { headless: true });
      var feed1 = feed.end({ pretty: true });
      let fullName = `./sample_${generateUniqueNumber()}.xml`
      fs.writeFile(fullName, feed1, (err) => {
        if (err) {
          throw err;
        }
      });

      const xmlFile = await fs.createReadStream(path.resolve(__dirname, `../../../../${fullName}`));

      const formData = new FormData()
      formData.append('AccountKey', process.env.CLAIM_MD_ID)
      formData.append('File', xmlFile)

      const response = await this.httpService.post('https://www.claim.md/services/upload/', formData, {
        headers: {
          'Accept': 'text/json'
        }
      })?.toPromise()

      fs.unlinkSync(path.resolve(__dirname, `../../../../${fullName}`))

      const { data } = response || {}
      const { claim, error } = data || {}

      if (error) {
        return { error, claim: null }
      }
      return { error: null, claim }

    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  /**
   * Fetchs claim status
   * @param params 
   * @returns claim status 
   */
  async fetchClaimStatus(params: FetchBillingClaimStatusesInput): Promise<BillingsPayload> {
    try {
      const { paginationOptions, facilityId, claimNo, claimStatusId, patientId, from, to } = params
      const paginationResponse = await this.paginationService.willPaginate<Billing>(this.billingRepository, {
        paginationOptions, facilityId, patientId, claimStatusId, claimNo, billingToDate: to, billingFromDate: from
      })
      return {
        billings: paginationResponse.data,
        pagination: { ...paginationResponse }
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  /**
   * Generates claim number
   * @returns  
   */
  generateClaimNumber() {
    return generateUniqueNumber()
  }

}
