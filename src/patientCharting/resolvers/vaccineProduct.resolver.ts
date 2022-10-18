import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
//inputs
import { FindAllVaccineProductsInput } from "../dto/vaccine-product.input";
//payloads
import { FindAllVaccineProductsPayload } from "../dto/vaccine-product.payload";
//entities
import { CVX } from "../entities/cvx.entity";
import { MVX } from "../entities/mvx.entity";
import { NdcVaccineProduct } from "../entities/ndcVaccineProduct.entity";
import { VaccineProduct } from "../entities/vaccineProduct.entity";
//services
import { CVXService } from "../services/cvx.service";
import { MVXService } from "../services/mvx.service";
import { NdcVaccineProductService } from "../services/ndcVaccineProduct.service";
import { VaccineProductService } from "../services/vaccineProduct.service";

@Resolver(() => VaccineProduct)
export class VaccineProductResolver {
  constructor(
    private readonly vaccineProductService: VaccineProductService,
    private readonly cvxService: CVXService,
    private readonly mvxService: MVXService,
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


  // resolve fields

  @ResolveField(() => CVX)
  async cvx(@Parent() vaccine: VaccineProduct): Promise<CVX> {
    if (vaccine?.cvxId) {
      return await this.cvxService.findOne(vaccine.cvxId);
    }
  }

  @ResolveField(() => MVX)
  async mvx(@Parent() vaccine: VaccineProduct): Promise<MVX> {
    if (vaccine?.mvxId) {
      return await this.mvxService.findOne(vaccine.mvxId);
    }
  }

  @ResolveField(() => [NdcVaccineProduct])
  async ndcVaccine(@Parent() vaccine: VaccineProduct): Promise<NdcVaccineProduct[]> {
    if (vaccine?.id) {
      return await this.ndcVaccineProductService.findByVaccineId(vaccine.id);
    }
  }

}
