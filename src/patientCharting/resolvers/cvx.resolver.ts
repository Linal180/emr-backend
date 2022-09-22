import { Args, Query, Resolver } from "@nestjs/graphql";
//inputs
import { FindAllCvxInput } from "../dto/cvx.input";
//payloads
import { FindAllCvxPayload } from "../dto/cvx.payload";
//entities
import { CVX } from "../entities/cvx.entity";
//services
import { CVXService } from "../services/cvx.service";

@Resolver(() => CVX)
export class CVXResolver {

  constructor(
    private readonly cvxService: CVXService,
  ) { }

  @Query(() => FindAllCvxPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'findAllCvx')
  async findAllCvx(@Args('findAllCvxInput') findAllCvxInput: FindAllCvxInput): Promise<FindAllCvxPayload> {
    const { cvxs, pagination } = await this.cvxService.findAll(findAllCvxInput);
    if (cvxs) {
      return {
        cvxs,
        pagination,
        response: {
          message: "OK", status: 200,
        }
      }
    }
  }

}
