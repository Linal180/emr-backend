import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as xmlBuilder from 'xmlbuilder'
import * as moment from 'moment';
import { AppointmentStatus } from 'src/appointments/entities/appointment.entity';
import { AppointmentService } from 'src/appointments/services/appointment.service';
import { FacilityService } from 'src/facilities/services/facility.service';
import { OrderOfBenefitType } from 'src/insurance/entities/policy.entity';
import { InsuranceService } from 'src/insurance/services/insurance.service';
import { PolicyHolderService } from 'src/insurance/services/policy-holder.service';
import { PolicyService } from 'src/insurance/services/policy.service';
import { DoctorPatientRelationType } from 'src/patients/entities/doctorPatient.entity';
import { MARITIALSTATUS } from 'src/patients/entities/patient.entity';
import { PatientService } from 'src/patients/services/patient.service';
import { BillingAddressService } from 'src/providers/services/billing-address.service';
import { ContactService } from 'src/providers/services/contact.service';
import { Connection, Repository } from 'typeorm';
import BillingInput from '../dto/billing-input.dto';
import ClaimInput from '../dto/claim-input.dto';
import { Claim } from '../dto/claim-payload';
import { Billing } from '../entities/billing.entity';
import { Code, CodeType } from '../entities/code.entity';
import { HttpService } from '@nestjs/axios';
import * as FormData from 'form-data'
// const fileToRender = require('./form-cms1500.pdf')
import * as fs from 'fs'
import { DoctorService } from 'src/providers/services/doctor.service';
import { PracticeService } from 'src/practice/practice.service';
const util = require('util')
const { PDFDocument, createPDFAcroFields } = require('pdf-lib')
const path = require("path");

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(Billing)
    private billingRepository: Repository<Billing>,
    @InjectRepository(Code)
    private codeRepository: Repository<Code>,
    private readonly connection: Connection,
    private readonly patientService: PatientService,
    private readonly contactsService: ContactService,
    private readonly appointmentService: AppointmentService,
    private readonly policyService: PolicyService,
    private readonly policyHolderService: PolicyHolderService,
    private readonly insuranceService: InsuranceService,
    private readonly facilityService: FacilityService,
    private readonly billingAddressService: BillingAddressService,
    private readonly doctorService: DoctorService,
    private readonly practiceService: PracticeService,
    private readonly httpService: HttpService
  ) { }


  async create(createBillingInput: BillingInput): Promise<Billing> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { codes, patientId, appointmentId, facilityId, servicingProviderId, renderingProviderId, ...billingInfoToCreate } = createBillingInput
      //creating policy
      const billingInstance = this.billingRepository.create({ ...billingInfoToCreate })

      if (patientId) {
        const patient = await this.patientService.findOne(patientId)
        billingInstance.patient = patient
      }

      if (facilityId) {
        const facility = await this.facilityService.findOne(facilityId)
        billingInstance.facility = facility
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
      if (appointmentId) {
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

  async fetchBillingDetailsByAppointmentId(appointmentId: string): Promise<Billing> {
    return this.billingRepository.findOne({
      appointmentId
    })
  }

  async getClaimInfo(claimInput: ClaimInput) {
    const { codes, appointmentId, patientId, autoAccident, employment, otherAccident, onsetDate, onsetDateType,
      otherDate, otherDateType } = claimInput
    const diagnosesCodes = codes?.filter(code => code.codeType === CodeType.ICD_10_CODE)
    const procedureCodes = codes?.filter(code => code.codeType === CodeType.CPT_CODE)
    const totalCharges = codes.reduce((acc, code) => {
      return acc += Number(code.price || 0)
    }, 0)
    const insuranceDetails = await this.policyService.fetchPatientInsurances(patientId)
    const appointmentInfo = await this.appointmentService.findOne(appointmentId)
    const patient = await this.patientService.findOne(patientId)

    const facilityInfo = await this.facilityService.findOne(patient.facilityId)
    const facilityContacts = await this.contactsService.findContactsByFacilityId(patient.facilityId);
    const facilityBillingContact = (await this.billingAddressService.findBillingAddressByFacilityId(patient.facilityId))[0];
    const facilityPrimaryContact = facilityContacts?.find((facilityContact) => facilityContact)
    const { cliaIdNumber, practiceId } = facilityInfo || {}

    const practiceInfo = await this.practiceService.findOne(practiceId)

    const primaryInsurance = insuranceDetails.find((insurance) => insurance.orderOfBenefit === OrderOfBenefitType.PRIMARY)
    const secondaryInsurance = insuranceDetails.find((insurance) => insurance.orderOfBenefit === OrderOfBenefitType.SECONDARY)
    const tertiaryInsurance = insuranceDetails.find((insurance) => insurance.orderOfBenefit === OrderOfBenefitType.TERTIARY)

    const insuranceDetail = !!primaryInsurance ? primaryInsurance :
      !!secondaryInsurance ? secondaryInsurance :
        tertiaryInsurance
    const { policyHolderRelationship, groupNumber, orderOfBenefit } = insuranceDetail || {}
    const insurance = await this.insuranceService.findOne(insuranceDetail?.insuranceId)
    const { payerId, payerName } = insurance || {}

    const { patientRecord, firstName, lastName, dob, gender, middleName, maritialStatus, policyHolderId } = patient || {}
    const doctorPatients = await this.patientService.usualProvider(patient.id);
    const primaryProviderInfo = doctorPatients.find((doctorPatient) => doctorPatient.relation === DoctorPatientRelationType.PRIMARY_PROVIDER)?.doctor
    const referringProviderInfo = doctorPatients.find((doctorPatient) => doctorPatient.relation === DoctorPatientRelationType.REFERRING_PROVIDER)?.doctor
    const orderingProviderInfo = doctorPatients.find((doctorPatient) => doctorPatient.relation === DoctorPatientRelationType.ORDERING_PROVIDER)?.doctor
    const contacts = await this.contactsService.findContactsByPatientId(patient.id);
    const { address, city, state, zipCode, address2, country, phone } = contacts?.find((contact) => contact.primaryContact) || {}

    const policyHolder = await this.policyHolderService.findOne(policyHolderId)
    const {
      address: policyHolderAddress, addressCTD, firstName: policyHolderFName, lastName: policyHolderLName,
      middleName: policyHolderMName, city: policyHolderCity, state: policyHolderState, zipCode: policyHolderZipCode,
      certificationNumber, sex: policyHolderGender, dob: policyHolderDob
    } = policyHolder || {}

    const { scheduleStartDateTime, scheduleEndDateTime } = appointmentInfo
    const { firstName: billingProviderName, contacts: providerContacts, npi, taxId } = primaryProviderInfo || {}
    const { address: providerAddress, address2: providerAddress2, city: providerCity, state: providerState, zipCode: providerZipCode, phone: providerPhone } =
      providerContacts?.find((contact) => contact.primaryContact) || {}

    const diagnoses = diagnosesCodes.reduce((acc, diagnosesCode, i) => {
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

    const procedures = procedureCodes.map((procedureCode) => {
      const { code, price } = procedureCode
      return {
        proc_code: code,
        diag_ref: 'A',
        charge: Number(price || 0),
        units: ''
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
      pat_dob: moment(dob).format('YYYY-MM-DD'),
      pat_sex: this.getClaimGender(gender),
      pat_rel: this.getClaimRelation(policyHolderRelationship),
      ins_number: groupNumber,
      accept_assign: 'Y',
      total_charge: totalCharges,
      ...diagnoses,
      bill_name: facilityInfo?.name,
      bill_addr_1: facilityPrimaryContact?.address,
      bill_addr_2: facilityPrimaryContact?.address2,
      bill_city: facilityPrimaryContact?.city,
      bill_state: facilityPrimaryContact?.state,
      bill_zip: facilityPrimaryContact?.zipCode,
      bill_npi: practiceInfo?.npi,
      bill_phone: facilityPrimaryContact?.phone,
      bill_taxid: practiceInfo?.taxId,
      bill_taxid_type: 'EIN',
      bill_taxonomy: facilityInfo?.tamxonomyCode,
      from_date: moment(scheduleStartDateTime).format('YYYY-MM-DD'),
      thru_date: moment(scheduleEndDateTime).format('YYYY-MM-DD'),
      charge: procedures,
      payer_order: orderOfBenefit,
      pat_name_m: middleName,
      pat_addr_2: address2,
      pat_country: country,
      pat_phone: phone,
      pat_marital: this.getYesOrNo(maritialStatus === MARITIALSTATUS.MARIED),
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
      ins_dob: moment(policyHolderDob).format('YYYY-MM-DD'),
      ins_sex: this.getClaimGender(gender),
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
      employment_related: this.getYesOrNo(employment),
      auto_accident: this.getYesOrNo(autoAccident),
      // "auto_accident_state",
      other_accident: this.getYesOrNo(otherAccident),
      ref_name_l: referringProviderInfo?.lastName,
      ref_name_f: referringProviderInfo?.firstName,
      ref_name_m: referringProviderInfo?.middleName,
      ref_id: referringProviderInfo?.npi,
      ref_npi: referringProviderInfo?.npi,
      cond: onsetDateType,
      onset: otherDateType,
      cond_date: onsetDate ? moment(onsetDate).format('YYYY-MM-DD'): '',  //this represents current illness in dr.chrono claim page
      onset_date: otherDate ? moment(otherDate).format('YYYY-MM-DD'): '', // this represents other as onset in dr.chrono claim page
      // "lastseen_date",
      // "nowork_from_date",
      // "nowork_to_date",
      // "hosp_from_date",
      // "hosp_thru_date",
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
      facility_state: facilityPrimaryContact?.state,
      facility_zip: facilityPrimaryContact?.zipCode,
      facility_npi: facilityInfo?.npi,
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
      // "prov_name_l",
      // "prov_name_f",
      // "prov_name_m",
      // "prov_npi",
      // "prov_id",
      // "prov_taxonomy",
      // "prov_taxid",
      // "prov_taxid_type",
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
      // "from_date",
      // "thru_date",
      // "place_of_service",
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
      chg_facility_state: facilityPrimaryContact?.state,
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

  getClaimGender(gender: string) {
    switch (gender) {
      case 'Identifies as Male':
        return 'M'
      case 'Identifies as Female':
        return 'F'
      default:
        return 'U'
    }
  }

  getClaimRelation(relation: string) {
    switch (relation) {
      case 'Spouse':
        return '01'
      case 'Self':
        return '18'
      case 'Child':
        return '19'
      case 'Employee':
        return '20'
      case 'Unknown':
        return '21'
      case 'Organ Donor':
        return '39'
      case 'Cadaver Donor':
        return '40'
      case 'Life Partner':
        return '53'
      default:
        return 'G8'
    }
  }

  getYesOrNo(value: boolean) {
    return value ? 'Y' : 'N'
  }

  async getClaimFile(claimInput: ClaimInput) {
    const claimInfo = await this.getClaimInfo(claimInput)
    const file = await fs.readFileSync(path.resolve(__dirname, "../../../../form-1500.pdf"))
    const pdfDoc = await PDFDocument.load(file);
    const form = pdfDoc.getForm()

    const ins_sex_kids = createPDFAcroFields(form.getCheckBox('ins_sex').acroField.Kids()).map(_ => _[0]);
    claimInfo.ins_sex === 'M' && ins_sex_kids[0].setValue(ins_sex_kids[0].getOnValue()) 
    claimInfo.ins_sex === 'F' && ins_sex_kids[1].setValue(ins_sex_kids[1].getOnValue());

    const pat_sex_kids = createPDFAcroFields(form.getCheckBox('sex').acroField.Kids()).map(_ => _[0]);
    claimInfo.pat_sex === 'M' && pat_sex_kids[0].setValue(pat_sex_kids[0].getOnValue()) 
    claimInfo.pat_sex === 'F' && pat_sex_kids[1].setValue(pat_sex_kids[1].getOnValue());

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

    form.getTextField('pt_name').setText(`${claimInfo.pat_name_l}, ${claimInfo.pat_name_f}, ${claimInfo.pat_name_m}` )
    claimInfo.payerid && form.getTextField('insurance_id').setText(`${claimInfo.payerid}`)
    form.getTextField('ins_name').setText(`${claimInfo.ins_name_l} ${claimInfo.ins_name_f} ${claimInfo.ins_name_m}`)
    claimInfo.pat_dob && form.getTextField('birth_mm').setText(`${moment(claimInfo.pat_dob).format('MM')}`)
    claimInfo.pat_dob && form.getTextField('birth_dd').setText(`${moment(claimInfo.pat_dob).format('DD')}`)
    claimInfo.pat_dob && form.getTextField('birth_yy').setText(`${moment(claimInfo.pat_dob).format('YY')}`)
    claimInfo.pat_addr_1 && form.getTextField('pt_street').setText(`${claimInfo.pat_addr_1}`)
    claimInfo.pat_city && form.getTextField('pt_city').setText(`${claimInfo.pat_city}`)
    claimInfo.pat_state && form.getTextField('pt_state').setText(`${claimInfo.pat_state?.slice(0, 3)}`)
    claimInfo.pat_zip && form.getTextField('pt_zip').setText(`${claimInfo.pat_zip}`)
    claimInfo.pat_phone && form.getTextField('pt_AreaCode').setText(`${claimInfo.pat_phone?.slice(0,3)}`)
    claimInfo.pat_phone && form.getTextField('pt_phone').setText(`${claimInfo.pat_phone?.slice(3, claimInfo.pat_phone?.length)}`)
    claimInfo.ins_addr_1 && form.getTextField('ins_street').setText(`${claimInfo.ins_addr_1}`)
    claimInfo.ins_city && form.getTextField('ins_city').setText(`${claimInfo.ins_city}`)
    claimInfo.ins_state && form.getTextField('ins_state').setText(`${claimInfo.ins_state?.slice(0, 3)}`)
    claimInfo.ins_zip && form.getTextField('ins_zip').setText(`${claimInfo.ins_zip}`)
    form.getTextField('ins_phone area')
    form.getTextField('ins_phone')
    claimInfo.ins_group && form.getTextField('ins_policy').setText(`${claimInfo.ins_group}`)
    claimInfo.ins_dob && form.getTextField('ins_dob_mm').setText(`${moment(claimInfo.ins_dob).format('MM')}`)
    claimInfo.ins_dob && form.getTextField('ins_dob_dd').setText(`${moment(claimInfo.ins_dob).format('DD')}`)
    claimInfo.ins_dob && form.getTextField('ins_dob_yy').setText(`${moment(claimInfo.ins_dob).format('YY')}`)
    form.getTextField('other_ins_name')
    form.getTextField('other_ins_policy')
    form.getTextField('ins_plan_name')
    form.getTextField('pt_date')
    claimInfo.cond && form.getTextField('73').setText(`${claimInfo.cond}`)
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
    claimInfo.employment_related === 'Y' && form.getCheckBox('employment').check(claimInfo.employment_related)
    claimInfo.auto_accident === 'Y' && form.getCheckBox('pt_auto_accident').check(claimInfo.auto_accident)
    claimInfo.other_accident === 'Y' && form.getCheckBox('other_accident').check(claimInfo.other_accident)
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

    claimInfo.charge.forEach((chargeValue, i) => {
      form.getTextField(`sv${i + 1}_mm_from`).setText(`${moment(claimInfo.from_date).format('MM')}`)
      form.getTextField(`sv${i + 1}_dd_from`).setText(`${moment(claimInfo.from_date).format('DD')}`)
      form.getTextField(`sv${i + 1}_yy_from`).setText(`${moment(claimInfo.from_date).format('YY')}`)
      form.getTextField(`sv${i + 1}_mm_end`).setText(`${moment(claimInfo.thru_date).format('MM')}`)
      form.getTextField(`sv${i + 1}_dd_end`).setText(`${moment(claimInfo.thru_date).format('DD')}`)
      form.getTextField(`sv${i + 1}_yy_end`).setText(`${moment(claimInfo.thru_date).format('YY')}`)
      form.getTextField(`place${i + 1}`).setText(claimInfo.chg_facility_state?.slice(0, 3) ?? '')
      form.getTextField(`ch${i + 1}`).setText(String(chargeValue.charge))
      form.getTextField(`cpt${i + 1}`).setText(chargeValue.proc_code)
      form.getTextField(`diag${i + 1}`).setText(chargeValue.diag_ref)
      form.getTextField(`day${i + 1}`).setText(chargeValue.units)
    })
    // form.flatten()
    const pdfBytes = await pdfDoc.save()
    return pdfBytes
  }

  async createClaimInfo(claimInput: ClaimInput): Promise<Claim> {
    const claimInfo = await this.getClaimInfo(claimInput)
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
    let fullName = "./sample123.xml"
    fs.writeFile(fullName, feed1, (err) => {
      if (err) throw err;
    });

    const xmlFile = await fs.createReadStream(path.resolve(__dirname, "../../../../sample123.xml"))

    const formdata = new FormData()
    formdata.append('AccountKey', process.env.CLAIM_MD_ID)
    formdata.append('File', xmlFile)

    const response = await this.httpService.post('https://www.claim.md/services/upload/', formdata, {
      headers: {
        'Accept': 'text/json'
      }
    }).toPromise();

   return claimInfo
  }
}
