import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from 'src/pagination/pagination.service';
import { BillingAddressService } from 'src/providers/services/billing-address.service';
import { ContactService } from 'src/providers/services/contact.service';
import { UtilsService } from 'src/util/utils.service';
import { Repository } from 'typeorm';
import { CreateAppointmentInput } from '../dto/create-appointment.input';
import { Appointment } from '../entities/appointment.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    private readonly paginationService: PaginationService,
    private readonly contactService: ContactService,
    private readonly billingAddressService: BillingAddressService,
    private readonly utilsService: UtilsService,
  ) { }

  async createAppointment(createAppointmentInput: CreateAppointmentInput): Promise<Appointment> {
    try {
      //creating appointment
      const appointmentInstance = this.appointmentRepository.create(createAppointmentInput)
      const appointment = await this.appointmentRepository.save(appointmentInstance);
      return appointment
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // async findAllFacilities(facilityInput: FacilityInput): Promise<FacilitiesPayload> {
  //   try {
  //     facilityInput.isPrivate = true;
  //     const paginationResponse = await this.paginationService.willPaginate<Appointment>(this.appointmentRepository, facilityInput)
  //     return {
  //       pagination: {
  //         ...paginationResponse
  //       },
  //       facility: paginationResponse.data,
  //     }
  //   } catch (error) {
  //     throw new InternalServerErrorException(error);
  //   }
  // }


  // async findOne(id: string): Promise<Appointment> {
  //   return await this.appointmentRepository.findOne(id);

  // }

  // async GetFacility(id: string): Promise<FacilityPayload> {
  //   const facility = await this.findOne(id);
  //   if (facility) {
  //     return { facility }
  //   }
  //   throw new NotFoundException({
  //     status: HttpStatus.NOT_FOUND,
  //     error: 'Facility not found',
  //   });
  // }

  // async updateFacility(updateFacilityInput: UpdateFacilityInput): Promise<Appointment> {
  //   try {
  //     const facility = await this.appointmentRepository.save(updateFacilityInput.updateFacilityItemInput)
  //     return facility
  //   } catch (error) {
  //     throw new InternalServerErrorException(error);
  //   }
  // }

  //    async updateFacilityTimeZone(updateFacilityTimeZoneInput: UpdateFacilityTimeZoneInput): Promise<Appointment> {
  //     try {
  //       const facility = await this.appointmentRepository.save(updateFacilityTimeZoneInput)
  //       return facility
  //     } catch (error) { 
  //       throw new InternalServerErrorException(error);
  //     }
  //   }


  // async removeFacility({ id }: RemoveFacility) {
  //   try {
  //     await this.appointmentRepository.delete(id)
  //   } catch (error) {
  //     throw new InternalServerErrorException(error);
  //   }
  // }
}
