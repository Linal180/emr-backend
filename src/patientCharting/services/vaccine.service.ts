import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { HttpStatus, InternalServerErrorException, NotFoundException } from "@nestjs/common";
//inputs
import { AddVaccineInput, FindAllVaccinesInput, UpdateVaccineInput } from "../dto/vaccine.input";
//payloads
import { FindAllVaccinesPayload } from "../dto/vaccine.payload";
//entities
import { Vaccine } from "../entities/vaccines.entity";
//services
import { UtilsService } from "src/util/utils.service";
import { PaginationService } from "src/pagination/pagination.service";
import { PatientService } from "src/patients/services/patient.service";
import { AppointmentService } from "src/appointments/services/appointment.service";

export class VaccineService {
  constructor(
    @InjectRepository(Vaccine)
    private vaccineRepo: Repository<Vaccine>,
    private readonly utilsService: UtilsService,
    private readonly patientService: PatientService,
    private readonly appointmentService: AppointmentService,
    private readonly paginationService: PaginationService,
  ) { }


  /**
   * Finds all
   * @param params 
   * @returns all 
   */
  async findAll(params: FindAllVaccinesInput): Promise<FindAllVaccinesPayload> {
    try {
      const { paginationOptions, patientId, appointmentId } = params || {}
      const response = await this.paginationService.willPaginate<Vaccine>(this.vaccineRepo, { paginationOptions, patientId, appointmentId });
      const { data: vaccines, ...pagination } = response;
      return { vaccines, pagination }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds one
   * @param id 
   * @returns one 
   */
  async findOne(id: string): Promise<Vaccine> {
    return await this.vaccineRepo.findOne(id)
  }


  /**
   * Finds by appointment id
   * @param appointmentId 
   * @returns by appointment id 
   */
  async findByAppointmentId(appointmentId: string): Promise<Vaccine> {
    return await this.vaccineRepo.findOne({ appointmentId })
  }

  /**
   * Creates vaccine service
   * @param params 
   * @returns create 
   */
  async create(params: AddVaccineInput): Promise<Vaccine> {
    try {
      const { patientId, appointmentId } = params;
      const patient = await this.patientService.findOne(patientId);
      if (!patient) {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          error: 'Patient not found',
        })

      }
      const vaccineInstance = this.vaccineRepo.create(params);
      vaccineInstance.patient = patient;

      //get appointment 
      if (appointmentId) {
        const appointment = await this.appointmentService.findOne(appointmentId);
        vaccineInstance.appointment = appointment;
      }
      return await this.vaccineRepo.save(vaccineInstance);
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }


  /**
   * Updates vaccine service
   * @param params 
   * @returns update 
   */
  async update(params: UpdateVaccineInput): Promise<Vaccine> {
    try {
      const { id, ...rest } = params
      const vaccine = await this.utilsService.updateEntityManager<Vaccine>(Vaccine, id, rest, this.vaccineRepo);
      return vaccine;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  /**
   * Del vaccine service
   * @param id 
   * @returns del 
   */
  async del(id: string): Promise<Vaccine> {
    try {
      const vaccine = await this.findOne(id);
      await this.vaccineRepo.delete(id);
      return vaccine;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

}