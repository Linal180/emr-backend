import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
//inputs
import { AddVaccineInput, FindAllVaccineInput, GetVaccineInput, RemoveVaccineInput, UpdateVaccineInput } from "../dto/vaccine.input";
//payloads
import { FindAllVaccinesPayload, VaccinePayload } from "../dto/vaccine.payload";
//entities
import { Vaccine } from "../entities/vaccines.entity";
//services
import { VaccineService } from "../services/vaccine.service";

@Resolver(() => Vaccine)
export class VaccineResolver {
  constructor(
    private readonly vaccineService: VaccineService,
  ) { }

  //queries

  @Query(() => FindAllVaccinesPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'findAllVaccines')
  async findAllVaccines(@Args('findAllVaccinesInput') findAllVaccinesInput: FindAllVaccineInput): Promise<FindAllVaccinesPayload> {
    const { vaccines, pagination } = await this.vaccineService.findAll(findAllVaccinesInput);
    return {
      vaccines, pagination,
      response: { status: 200, message: 'Patient vaccines fetched successfully' }
    };
  }

  @Query(() => VaccinePayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'findAllVaccines')
  async getVaccine(@Args('getVaccineInput') getVaccineInput: GetVaccineInput): Promise<VaccinePayload> {
    const { id } = getVaccineInput
    const vaccine = await this.vaccineService.findOne(id);
    return {
      vaccine,
      response: { status: 200, message: 'Patient vaccine fetched successfully' }
    };
  }

  //mutations

  @Mutation(() => VaccinePayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'findAllVaccines')
  async addVaccine(@Args('addVaccineInput') addVaccineInput: AddVaccineInput): Promise<VaccinePayload> {
    const vaccine = await this.vaccineService.create(addVaccineInput);
    return {
      vaccine,
      response: { status: 200, message: 'Patient vaccine created successfully' }
    };
  }


  @Mutation(() => VaccinePayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'updateVaccine')
  async updateVaccine(@Args('updateVaccineInput') updateVaccineInput: UpdateVaccineInput): Promise<VaccinePayload> {
    const vaccine = await this.vaccineService.update(updateVaccineInput);
    return {
      vaccine,
      response: { status: 200, message: 'Patient vaccine updated successfully' }
    };
  }

  @Mutation(() => VaccinePayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'removeVaccine')
  async removeVaccine(@Args('removeVaccineInput') removeVaccineInput: RemoveVaccineInput): Promise<VaccinePayload> {
    const { id } = removeVaccineInput
    const vaccine = await this.vaccineService.del(id);
    return {
      vaccine,
      response: { status: 200, message: 'Patient vaccine removed successfully' }
    };
  }
}
