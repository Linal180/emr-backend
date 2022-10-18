import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
//inputs
import { FindAllNdcVaccineProductsInput } from "../dto/ndc-vaccine-product.input";
//payloads
import { FindAllNdcVaccineProductsPayload } from "../dto/ndc-vaccine-product.payload";
//entities
import { NDC } from "../entities/ndc.entity";
import { VaccineProduct } from "../entities/vaccineProduct.entity";
import { NdcVaccineProduct } from "../entities/ndcVaccineProduct.entity";
//services
import { NDCService } from "../services/ndc.service";
import { VaccineProductService } from "../services/vaccineProduct.service";
import { NdcVaccineProductService } from "../services/ndcVaccineProduct.service";

@Resolver(() => NdcVaccineProduct)
export class NdcVaccineProductResolver {
  constructor(
    private readonly ndcService: NDCService,
    private readonly vaccineProductService: VaccineProductService,
    private readonly ndcVaccineProductService: NdcVaccineProductService,
  ) { }

  //queries

  @Query(() => FindAllNdcVaccineProductsPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'findAllNdcVaccineProducts')
  async findAllNdcVaccineProducts(@Args('findAllNdcVaccineProductsInput') findAllNdcVaccineProductsInput: FindAllNdcVaccineProductsInput): Promise<FindAllNdcVaccineProductsPayload> {
    const { ndcVaccineProducts, pagination } = await this.ndcVaccineProductService.findAll(findAllNdcVaccineProductsInput);
    return {
      ndcVaccineProducts, pagination,
      response: { status: 200, message: 'Ok' }
    };
  }

  // resolve fields

  @ResolveField(() => VaccineProduct)
  async vaccineProduct(@Parent() ndcVaccineProduct: NdcVaccineProduct): Promise<VaccineProduct> {
    if (ndcVaccineProduct?.vaccineProductId) {
      return await this.vaccineProductService.findOne(ndcVaccineProduct.vaccineProductId);
    }
  }

  @ResolveField(() => NDC)
  async ndcCode(@Parent() ndcVaccineProduct: NdcVaccineProduct): Promise<NDC> {
    if (ndcVaccineProduct?.ndcCodeId) {
      return await this.ndcService.findOne(ndcVaccineProduct.ndcCodeId);
    }
  }

}
