import { SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
//user import
import { Element } from '../entities/element.entity'
import { ElementInputs } from '../dto/element.input';
import PermissionGuard from 'src/users/auth/role.guard';
import { ElementService } from '../services/element.service';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
//resolver
@Resolver(() => Element)
export class ElementResolver {
    constructor(private readonly elementService: ElementService) { }

    @Mutation(() => Element)
    @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
    @SetMetadata('name', 'createElement')
    async createElement(@Args('inputs') input: ElementInputs) {
        return await this.elementService.create(input)
    }
}