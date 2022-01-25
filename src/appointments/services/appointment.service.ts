import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from 'src/pagination/pagination.service';
import { BillingAddressService } from 'src/providers/services/billing-address.service';
import { ContactService } from 'src/providers/services/contact.service';
import { UtilsService } from 'src/util/utils.service';
import { Repository } from 'typeorm';
import { CreateFacilityInput } from '../dto/create-facility.input';
import { FacilitiesPayload } from '../dto/facilities-payload.dto';
import FacilityInput from '../dto/facility-input.dto';
import { FacilityPayload } from '../dto/facility-payload.dto';
import { UpdateFacilityInput } from '../dto/update-facility.input';
import { RemoveFacility } from '../dto/update-facilityItem.input';
import { UpdateFacilityTimeZoneInput } from '../dto/update-facilityTimeZone.input';
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

  // async createFacility(createFacilityInput: CreateFacilityInput): Promise<Appointment> {
  //   try {
  //     //creating facility
  //     const facilityInstance = this.appointmentRepository.create(createFacilityInput.createFacilityItemInput)
  //     const facility = await this.appointmentRepository.save(facilityInstance);
  //     return facility
  //   } catch (error) {
  //     throw new InternalServerErrorException(error);
  //   }
  // }

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
