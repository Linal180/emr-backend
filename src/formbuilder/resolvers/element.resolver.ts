import { Args, Mutation, Resolver } from '@nestjs/graphql';
//user import
import { ElementService } from '../services/element.service';
import { Element } from '../entities/element.entity'
import { ElementInputs } from '../dto/element.input';
//resolver
@Resolver(() => Element)
export class ElementResolver {
    constructor(private readonly elementService: ElementService) { }

    @Mutation(() => Element)
    async createElement(@Args('inputs') input: ElementInputs) {
        return await this.elementService.create(input)
    }
}