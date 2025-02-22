import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
//inputs
import { AddVaccineInput, FindAllVaccinesInput, GetVaccineInput, RemoveVaccineInput, UpdateVaccineInput } from "../dto/vaccine.input";
//payloads
import { FindAllVaccinesPayload, VaccinePayload } from "../dto/vaccine.payload";
//entities
import { MVX } from "../entities/mvx.entity";
import { NDC } from "../entities/ndc.entity";
import { Vaccine } from "../entities/vaccines.entity";
import { VaccineProduct } from "../entities/vaccineProduct.entity";
//services
import { MVXService } from "../services/mvx.service";
import { NDCService } from "../services/ndc.service";
import { VaccineService } from "../services/vaccine.service";
import { VaccineProductService } from "../services/vaccineProduct.service";

@Resolver(() => Vaccine)
export class VaccineResolver {
  constructor(
    private readonly mvxService: MVXService,
    private readonly ndcService: NDCService,
    private readonly vaccineService: VaccineService,
    private readonly vaccineProductService: VaccineProductService,
  ) { }

  //queries

  @Query(() => FindAllVaccinesPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'findAllVaccines')
  async findAllVaccines(@Args('findAllVaccinesInput') findAllVaccinesInput: FindAllVaccinesInput): Promise<FindAllVaccinesPayload> {
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

  // resolve fields

  @ResolveField(() => VaccineProduct)
  async vaccineProduct(@Parent() vaccine: Vaccine): Promise<VaccineProduct> {
    if (vaccine?.vaccineProductId) {
      return await this.vaccineProductService.findOne(vaccine.vaccineProductId);
    }
  }

  @ResolveField(() => MVX)
  async mvx(@Parent() vaccine: Vaccine): Promise<MVX> {
    if (vaccine?.mvxId) {
      return await this.mvxService.findOne(vaccine.mvxId);
    }
  }

  @ResolveField(() => NDC)
  async ndc(@Parent() vaccine: Vaccine): Promise<NDC> {
    if (vaccine?.ndcId) {
      return await this.ndcService.findOne(vaccine.ndcId);
    }
  }

}
