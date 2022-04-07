import { HttpStatus, NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
import PermissionGuard from 'src/users/auth/role.guard';
import { CreateServiceInput } from '../dto/create-service.input';
import ServiceInput from '../dto/service-input.dto';
import { ServicePayload } from '../dto/service-payload.dto';
import { ServicesPayload } from '../dto/services-payload.dto';
import { GetService, RemoveService, UpdateServiceInput } from '../dto/update-service.input';
import { Service } from '../entities/services.entity';
import { ServicesService } from '../services/services.service';

@Resolver(() => Service)
export class ServiceResolver {
  constructor(private readonly servicesService: ServicesService) { }

  @Mutation(() => ServicePayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'createService')
  async createService(@Args('createServiceInput') createServiceInput: CreateServiceInput) {
    return {
      service: await this.servicesService.createService(createServiceInput),
      response: { status: 200, message: 'Service created successfully' }
    };
  }

  @Mutation(() => ServicePayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'updateService')
  async updateService(@Args('updateServiceInput') updateServiceInput: UpdateServiceInput) {
    return {
      service: await this.servicesService.updateService(updateServiceInput),
      response: { status: 200, message: 'Service updated successfully' }
    };
  }

  @Query(returns => ServicesPayload)
  async findAllServices(@Args('serviceInput') serviceInput: ServiceInput): Promise<ServicesPayload> {
    const services = await this.servicesService.findAllServices(serviceInput)
    if (services) {
      return {
        ...services,
        response: {
          message: "OK", status: 200,
        }
      }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Service not found',
    });
  }

  @Query(returns => ServicePayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'getService')
  async getService(@Args('getService') getService: GetService): Promise<ServicePayload> {
    const service = await this.servicesService.GetService(getService.id)
    return {
      ...service,
      response: { status: 200, message: 'Service fetched successfully' }
    };
  }

  @Mutation(() => ServicePayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'removeService')
  async removeService(@Args('removeService') removeService: RemoveService) {
    await this.servicesService.removeService(removeService);
    return { response: { status: 200, message: 'Service Deleted' } };
  }
}
