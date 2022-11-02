import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
// entities
import { ImagingTest } from "../entities/imagingTest.entity";
import { ImagingOrderTest } from "../entities/imagingOrderTest.entity";
//services
import { ImagingTestService } from "../services/imagingTest.service";
import { ImagingOrderTestService } from "../services/imagingOrderTest.service";

@Resolver(() => ImagingOrderTest)
export class ImagingOrderTestResolver {

  constructor(
    private readonly imagingTestService: ImagingTestService,
    private readonly imagingOrderTestService: ImagingOrderTestService,
  ) { }


  @ResolveField(() => ImagingTest)
  async imagingTests(@Parent() imagingOrderTest: ImagingOrderTest): Promise<ImagingTest> {
    if (imagingOrderTest?.imagingTestId) {
      return await this.imagingTestService.findOne(imagingOrderTest?.imagingTestId)
    }
  }

}