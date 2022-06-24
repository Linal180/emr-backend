//packages 
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
//entities
import { PatientConsent } from "../entities/patientConsent.entity";
//inputs
import { CreatePatientConsentInputs } from "../dto/patient-consent.input";
//services
import { PatientService } from "./patient.service";
import { AgreementService } from "src/agreements/services/agreement.service";
import { AppointmentService } from "src/appointments/services/appointment.service";

@Injectable()
export class PatientConsentService {
  constructor(
    @InjectRepository(PatientConsent)
    private patientConsentRepository: Repository<PatientConsent>,
    private patientService: PatientService,
    @Inject(forwardRef(() => AgreementService))
    private agreementService: AgreementService,
    private appointmentService: AppointmentService,
  ) { }


  /**
   * Finds one
   * @param id 
   * @returns one 
   */
  async find(id: string): Promise<PatientConsent> {
    return await this.patientConsentRepository.findOne(id)
  }


  /**
   * Creates patient consent service
   * @param createPatientConsentInputs 
   */
  async create(createPatientConsentInputs: CreatePatientConsentInputs) {
    try {
      const { agreementIds, appointmentId, attachmentId, body, patientId } = createPatientConsentInputs
      const patientConsentInstance = this.patientConsentRepository.create({ appointmentId, attachmentId, body, patientId })

      //associate appointment
      if (appointmentId) {
        const appointment = await this.appointmentService.findOne(appointmentId);
        if (appointment) {
          patientConsentInstance.appointment = appointment
        }
      }

      //associate patient
      if (patientId) {
        const { patient } = await this.patientService.GetPatient(patientId);
        if (patient) {
          patientConsentInstance.patient = patient
        }
      }

      //associate agreements
      if (agreementIds?.length > 0) {
        const agreements = await this.agreementService.findAllAgreements(agreementIds);
        if (agreements?.length > 0) {
          patientConsentInstance.agreements = agreements
        }
      }

      //save patient
      return await this.patientConsentRepository.save(patientConsentInstance)
    } catch (error) {

    }
  }


}