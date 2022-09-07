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
    @Inject(forwardRef(() => AgreementService))
    private agreementService: AgreementService,
    private patientService: PatientService,
    @Inject(forwardRef(() => AppointmentService))
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
   * @returns create 
   */
  async create(createPatientConsentInputs: CreatePatientConsentInputs): Promise<PatientConsent> {
    try {
      const { agreementIds, appointmentId, body, patientId } = createPatientConsentInputs
      const attachment = await this.patientService.getSignature(patientId)
      const patientConsentInstance = this.patientConsentRepository.create({ appointmentId, attachmentId: attachment?.id, body, patientId })
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

  /**
   * Finds by appointment id
   * @param appointmentId 
   * @returns by appointment id 
   */
  async findByAppointmentId(appointmentId: string): Promise<PatientConsent> {
    return await this.patientConsentRepository.findOne({ appointmentId })
  }


  async remove(id: string) {
    await this.patientConsentRepository.delete(id);
    return
  }

}