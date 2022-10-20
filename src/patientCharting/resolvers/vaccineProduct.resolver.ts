import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
//inputs
import { FetchAllVaccineProductsInput, FindAllVaccineProductsInput, GetVaccineProductInput } from "../dto/vaccine-product.input";
//payloads
import { FindAllVaccineProductsPayload, VaccineProductPayload } from "../dto/vaccine-product.payload";
//entities
import { CVX } from "../entities/cvx.entity";
import { MVX } from "../entities/mvx.entity";
import { VaccineProduct } from "../entities/vaccineProduct.entity";
import { NdcVaccineProduct } from "../entities/ndcVaccineProduct.entity";
//services
import { CVXService } from "../services/cvx.service";
import { MVXService } from "../services/mvx.service";
import { VaccineProductService } from "../services/vaccineProduct.service";
import { NdcVaccineProductService } from "../services/ndcVaccineProduct.service";
import { AddVaccineProductInput, RemoveVaccineProductInput, UpdateVaccineProductInput } from "../dto/vaccine-product.input";

@Resolver(() => VaccineProduct)
export class VaccineProductResolver {
  constructor(
    private readonly cvxService: CVXService,
    private readonly mvxService: MVXService,
    private readonly vaccineProductService: VaccineProductService,
    private readonly ndcVaccineProductService: NdcVaccineProductService,
  ) { }

  //queries

  @Query(() => FindAllVaccineProductsPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'findAllVaccineProducts')
  async findAllVaccineProducts(@Args('findAllVaccineProductsInput') findAllVaccineProductsInput: FindAllVaccineProductsInput): Promise<FindAllVaccineProductsPayload> {
    const { vaccineProducts, pagination } = await this.vaccineProductService.findAll(findAllVaccineProductsInput);
    return {
      vaccineProducts, pagination,
      response: { status: 200, message: 'Ok' }
    };
  }

  @Query(() => FindAllVaccineProductsPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'findAllVaccineProducts')
  async fetchAllVaccineProducts(@Args('fetchAllVaccineProductsInput') fetchAllVaccineProductsInput: FetchAllVaccineProductsInput): Promise<FindAllVaccineProductsPayload> {
    const { vaccineProducts, pagination } = await this.vaccineProductService.findAll(fetchAllVaccineProductsInput);
    return {
      vaccineProducts, pagination,
      response: { status: 200, message: 'Ok' }
    };
  }

  @Query(() => VaccineProductPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'findAllVaccines')
  async getVaccineProduct(@Args('getVaccineProductInput') getVaccineProductInput: GetVaccineProductInput): Promise<VaccineProductPayload> {
    const { id } = getVaccineProductInput
    const vaccineProduct = await this.vaccineProductService.findOne(id);
    return {
      vaccineProduct,
      response: { status: 200, message: 'Vaccine Product fetched successfully' }
    };
  }

  //mutations

  @Mutation(() => VaccineProductPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'findAllVaccines')
  async addVaccine(@Args('addVaccineInputProductInput') addVaccineInputProductInput: AddVaccineProductInput): Promise<VaccineProductPayload> {
    const vaccineProduct = await this.vaccineProductService.create(addVaccineInputProductInput);
    return {
      vaccineProduct,
      response: { status: 200, message: 'Vaccine Product created successfully' }
    };
  }


  @Mutation(() => VaccineProductPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'updateVaccine')
  async updateVaccine(@Args('updateVaccineProductInput') updateVaccineProductInput: UpdateVaccineProductInput): Promise<VaccineProductPayload> {
    const vaccineProduct = await this.vaccineProductService.update(updateVaccineProductInput);
    return {
      vaccineProduct,
      response: { status: 200, message: 'Vaccine Product updated successfully' }
    };
  }

  @Mutation(() => VaccineProductPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'removeVaccineProduct')
  async removeVaccineProduct(@Args('removeVaccineProductInput') removeVaccineProductInput: RemoveVaccineProductInput): Promise<VaccineProductPayload> {
    const { id } = removeVaccineProductInput
    const vaccineProduct = await this.vaccineProductService.del(id);
    return {
      vaccineProduct,
      response: { status: 200, message: 'Vaccine Product removed successfully' }
    };
  }



  // resolve fields

  @ResolveField(() => CVX)
  async cvx(@Parent() vaccineProduct: VaccineProduct): Promise<CVX> {
    if (vaccineProduct?.cvxId) {
      return await this.cvxService.findOne(vaccineProduct.cvxId);
    }
  }

  @ResolveField(() => MVX)
  async mvx(@Parent() vaccineProduct: VaccineProduct): Promise<MVX> {
    if (vaccineProduct?.mvxId) {
      return await this.mvxService.findOne(vaccineProduct.mvxId);
    }
  }

  @ResolveField(() => [NdcVaccineProduct])
  async ndcVaccine(@Parent() vaccineProduct: VaccineProduct): Promise<NdcVaccineProduct[]> {
    if (vaccineProduct?.id) {
      return await this.ndcVaccineProductService.findByVaccineId(vaccineProduct.id);
    }
  }

}
