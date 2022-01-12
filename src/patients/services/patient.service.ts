import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from 'src/pagination/pagination.service';
import { BillingAddressService } from 'src/providers/services/billing-address.service';
import { ContactService } from 'src/providers/services/contact.service';
import { UtilsService } from 'src/util/utils.service';
import { Connection, Repository } from 'typeorm';
import { CreatePatientInput } from '../dto/create-patient.input';
import PatientInput from '../dto/patient-input.dto';
import { PatientPayload } from '../dto/patient-payload.dto';
import { PatientsPayload } from '../dto/patients-payload.dto';
import { UpdatePatientInput } from '../dto/update-patient.input';
import { RemovePatient } from '../dto/update-patientItem.input';
import { Patient } from '../entities/patient.entity';
import { EmployerService } from './employer.service';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    private readonly paginationService: PaginationService,
    private readonly connection: Connection,
    private readonly contactService: ContactService,
    private readonly employerService: EmployerService,
    private readonly billingAddressService: BillingAddressService,
    private readonly utilsService: UtilsService,
  ) { }

  async createPatient(createPatientInput: CreatePatientInput): Promise<Patient> {
    //Transaction start
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      console.log("createPatientInput----", createPatientInput);

      //create patient 
      const patientInstance = await this.patientRepository.create(createPatientInput.createPatientItemInput)
      const patient = await queryRunner.manager.save(patientInstance);
      console.log("patient", patient)
      //create patient contact 
      const contact = await this.contactService.createContact(createPatientInput.createContactInput)
      console.log("contact", contact)
      patient.contacts = [contact];
      //create patient emergency contact 
      const emergencyContact = await this.contactService.createContact(createPatientInput.createEmergencyContactInput)
      console.log("emergencyContact", emergencyContact)
      patient.contacts = [emergencyContact];
      //create patient next of kin contact 
      const nextOfKinContact = await this.contactService.createContact(createPatientInput.createNextOfKinContactInput)
      console.log("nextOfKinContact", nextOfKinContact)
      patient.contacts = [nextOfKinContact];
      //create patient gurantor contact 
      const gurantorContact = await this.contactService.createContact(createPatientInput.createGuarantorContactInput)
      console.log("gurantorContact", gurantorContact)
      patient.contacts = [gurantorContact];
      //create patient guardian contact 
      const guardianContact = await this.contactService.createContact(createPatientInput.createGuardianContactInput)
      console.log("guardianContact", guardianContact)
      patient.contacts = [guardianContact];
      //create patient empoyer contact 
      const employerContact = await this.employerService.createEmployer({ ...createPatientInput.createEmpoyerInput, patientId: patient.id })
      console.log("employerContact", employerContact)
      patient.employer = [employerContact]

      await queryRunner.commitTransaction();
      return patient
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async findAllPatients(patientInput: PatientInput): Promise<PatientsPayload> {
    try {
      const paginationResponse = await this.paginationService.willPaginate<Patient>(this.patientRepository, patientInput)
      return {
        pagination: {
          ...paginationResponse
        },
        patients: paginationResponse.data,
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
  async findOne(id: string): Promise<Patient> {
    return await this.patientRepository.findOne(id);
  }

  /**
   * Finds one
   * @param id 
   * @returns one 
   */
  async GetPatient(id: string): Promise<PatientPayload> {
    const patient = await this.findOne(id);
    if (patient) {
      return { patient }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Patient not found',
    });
  }

  async updatePatient(updatePatientInput: UpdatePatientInput): Promise<Patient> {
    try {
      const patient = await this.patientRepository.save(updatePatientInput.updatePatientItemInput)
      //updating contact details
      await this.contactService.updateContact(updatePatientInput.updateContactInput)
      //updating billing details
      await this.billingAddressService.updateBillingAddress(updatePatientInput.updateBillingAddressInput)
      return patient
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  async removePatient({ id }: RemovePatient) {
    try {
      await this.patientRepository.delete(id)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
