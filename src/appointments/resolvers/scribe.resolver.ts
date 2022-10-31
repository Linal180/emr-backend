import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ScribePayload } from '../dto/scribe-payload.dto';
//entities , inputs, dtos, services
import { CreateScribeInput, ScribeCheckInput, UpdateScribeInput } from '../dto/scribe.input';
import { Scribe } from '../entities/scribe.entity';
import { ScribeService } from '../services/scribe.service';

@Resolver(() => Scribe)
export class ScribeResolver {
  constructor(private readonly scribeService: ScribeService,) { }

  //mutations

  @Mutation(() => ScribePayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'createScribe')
  async createScribe(@Args('createScribeInput') createScribeInput: CreateScribeInput) {
    return {
      scribe: await this.scribeService.create(createScribeInput),
      response: { status: 200, message: 'Scribe created successfully' }
    };
  }


  @Mutation(() => ScribePayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'updateScribe')
  async updateScribe(@Args('updateScribeInput') updateScribeInput: UpdateScribeInput) {
    return {
      scribe: await this.scribeService.update(updateScribeInput),
      response: { status: 200, message: 'Scribe updated successfully' }
    };
  }

  @Mutation(() => ScribePayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'updateScribe')
  async updateScribeCheck(@Args('scribeCheckInput') scribeCheckInput: ScribeCheckInput) {
    return {
      scribe: await this.scribeService.updateScribedCheck(scribeCheckInput),
      response: { status: 200, message: 'Scribe updated successfully' }
    };
  }

}
