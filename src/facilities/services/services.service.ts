import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from 'src/pagination/pagination.service';
import { UtilsService } from 'src/util/utils.service';
import { getConnection, In, ObjectLiteral, Raw, Repository } from 'typeorm';
import { CreateServiceInput } from '../dto/create-service.input';
import ServiceInput from '../dto/service-input.dto';
import { ServicePayload } from '../dto/service-payload.dto';
import { ServicesPayload } from '../dto/services-payload.dto';
import { RemoveService, UpdateServiceInput } from '../dto/update-service.input';
import { Facility } from '../entities/facility.entity';
import { Service } from '../entities/services.entity';
import { FacilityService } from './facility.service';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
    private readonly facilityService: FacilityService,
    private readonly paginationService: PaginationService,
    private readonly utilsService: UtilsService,
  ) { }

  /**
   * Creates service
   * @param createServiceInput 
   * @returns service 
   */
  async createService(createServiceInput: CreateServiceInput): Promise<Service> {
    try {
      // creating service
      const serviceInstance = this.servicesRepository.create(createServiceInput)
      //fetch facility
      if (createServiceInput.facilityId) {
        const facility = await this.facilityService.findOne(createServiceInput.facilityId)
        serviceInstance.facility = facility
      }
      //saving service
      return await this.servicesRepository.save(serviceInstance);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
 * Updates service
 * @param updateServiceInput 
 * @returns service 
 */
  async updateService(updateServiceInput: UpdateServiceInput): Promise<Service> {
    try {
      return await this.utilsService.updateEntityManager(Service, updateServiceInput.id, updateServiceInput, this.servicesRepository)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds all services
   * @param serviceInput 
   * @returns all services 
   */
  async findAllServices(serviceInput: ServiceInput): Promise<ServicesPayload> {
    try {
      const { paginationOptions, practiceId, serviceName, facilityId, isActive } = serviceInput
      const whereStr = {
        ...(serviceName && {
          name: Raw(alias => `${alias} ILIKE '%${serviceName}%'`),
        }),
        ...(facilityId && {
          facilityId
        }),
        ...(isActive != null && {
          isActive
        }),
      }

      const { limit, page } = serviceInput.paginationOptions

      let baseQuery = getConnection()
        .getRepository(Service)
        .createQueryBuilder('service')
        .skip((page - 1) * limit)
        .take(limit)
        .where(whereStr as ObjectLiteral)

        if(practiceId){
          baseQuery= baseQuery
          .innerJoin(Facility, 'serviceWithSpecificFacility', `service.facilityId = "serviceWithSpecificFacility"."id" AND "serviceWithSpecificFacility"."practiceId"= :practiceId`, { practiceId: practiceId })

        }

      const [services, totalCount] = await baseQuery.getManyAndCount()

      const totalPages = Math.ceil(totalCount / limit)

      return {
        pagination: {
          totalCount,
          page,
          limit,
          totalPages,
        },
        services
      }

      // const paginationResponse = await this.paginationService.willPaginate<Service>(this.servicesRepository, serviceInput)
      // return {
      //   pagination: {
      //     ...paginationResponse
      //   },
      //   services: paginationResponse.data,
      // }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds one
   * @param id 
   * @returns one 
   */
  async findOne(id: string): Promise<Service> {
    return await this.servicesRepository.findOne(id);
  }

  /**
   * Finds by ids
   * @param servicesIds 
   * @returns by ids 
   */
  async findByIds(servicesIds: string[]): Promise<Service[]> {
    return await this.servicesRepository.find({
      where: {
        id: In(servicesIds)
      }
    });
  }

  /**
   * Gets service
   * @param id 
   * @returns service 
   */
  async GetService(id: string): Promise<ServicePayload> {
    const service = await this.findOne(id);
    if (service) {
      return { service }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Service not found',
    });
  }

  /**
   * Removes service
   * @param { id } 
   */
  async removeService({ id }: RemoveService) {
    try {
      await this.servicesRepository.delete(id)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
