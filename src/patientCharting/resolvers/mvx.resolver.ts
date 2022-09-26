import { Args, Query, Resolver } from "@nestjs/graphql";
//inputs
import { FindAllMvxInput } from "../dto/mvx.input";
//payloads
import { FindAllMvxPayload } from "../dto/mvx.payload";
//entities
import { MVX } from "../entities/mvx.entity";
//services
import { MVXService } from "../services/mvx.service";


@Resolver(() => MVX)
export class MVXResolver {
  
  constructor(
    private readonly mvxService: MVXService,
  ) { }

  @Query(() => FindAllMvxPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'findAllCvx')
  async findAllMvx(@Args('findAllMvxInput') findAllMvxInput: FindAllMvxInput): Promise<FindAllMvxPayload> {
    const { mvxs, pagination } = await this.mvxService.findAll(findAllMvxInput);
    if (mvxs) {
      return {
        mvxs,
        pagination,
        response: {
          message: "OK", status: 200,
        }
      }
    }
  }
}
