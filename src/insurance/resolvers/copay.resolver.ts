import { SetMetadata, UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation, } from '@nestjs/graphql';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
import PermissionGuard from 'src/users/auth/role.guard';
import { CopayInput } from '../dto/copay-input.dto';
import { Copay } from '../entities/copay.entity';
import { CopayService } from '../services/copay.service';

@Resolver(() => Copay)
export class CopayResolver {
  constructor(private readonly copayService: CopayService,
  ) { }

  @Mutation(() => Copay)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'createCopay')
  createCopay(@Args('createCopayInput') createCopayInput: CopayInput): Promise<Copay> {
    return this.copayService.create(createCopayInput)
  }
}
