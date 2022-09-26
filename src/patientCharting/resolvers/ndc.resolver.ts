import { Args, Query, Resolver } from "@nestjs/graphql";
//inputs
import { FindAllNdcInput } from "../dto/ndc.input";
//payloads
import { FindAllNdcPayload } from "../dto/ndc.payload";
//entities
import { NDC } from "../entities/ndc.entity";
//services
import { NDCService } from "../services/ndc.service";


@Resolver(() => NDC)
export class NDCResolver {
  
  constructor(
    private readonly ndcService: NDCService,
  ) { }

  @Query(() => FindAllNdcPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'findAllNdc')
  async findAllNdc(@Args('findAllNdcInput') findAllNdcInput: FindAllNdcInput): Promise<FindAllNdcPayload> {
    const { ndcs, pagination } = await this.ndcService.findAll(findAllNdcInput);
    if (ndcs) {
      return {
        ndcs,
        pagination,
        response: {
          message: "OK", status: 200,
        }
      }
    }
  }
}
