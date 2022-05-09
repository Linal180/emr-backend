import { SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
import PermissionGuard from 'src/users/auth/role.guard';
import { default as LoincCodeInput } from '../dto/create-loincCode-input.dto';
import { LoincCodePayload } from '../dto/loincCode-payload.dto';
import { UpdateLoincCodeInput } from '../dto/update-loincCode.input';
import { LoincCodes } from '../entities/loincCodes.entity';
import { LoincCodesService } from '../services/loincCodes.service';

@Resolver(() => LoincCodes)
export class LoincCodesResolver {
  constructor(private readonly loincCodesService: LoincCodesService) { }

  @Mutation(() => LoincCodePayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'createLoincCode')
  async createLoincCode(@Args('loincCodeInput') loincCodeInput: LoincCodeInput) {
    return {
      loincCode: await this.loincCodesService.createLoincCode(loincCodeInput),
      response: { status: 200, message: 'loinc Code created successfully' }
    };
  }

  @Mutation(() => LoincCodePayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'updateLoincCode')
  async updateLoincCode(@Args('updateLoincCodeInput') updateLoincCodeInput: UpdateLoincCodeInput) {
    return {
      loincCode: await this.loincCodesService.updateLoincCode(updateLoincCodeInput),
      response: { status: 200, message: 'Loinc Code updated successfully' }
    };
  }
}
