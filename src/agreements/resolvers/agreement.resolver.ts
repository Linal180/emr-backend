import { SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
import PermissionGuard from 'src/users/auth/role.guard';
import { AgreementInput, AgreementPaginationInput, UpdateAgreementInput } from '../dto/agreement-input.dto';
import { AgreementPayload, AgreementsPayload } from '../dto/agreement-payload';
import { Agreement } from '../entities/agreement.entity';
import { AgreementService } from '../services/agreement.service';

@Resolver(() => Agreement)
export class AgreementResolver {
  constructor(
    private readonly agreementService: AgreementService,
  ) { }

  @Mutation(() => AgreementPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'createAgreement')
  async createAgreement(@Args('createAgreementInput') createAgreementInput: AgreementInput): Promise<AgreementPayload> {
    return {
      agreement: await this.agreementService.create(createAgreementInput),
      response: { status: 200, message: "Agreement created successfully" }
    };
  }

  @Mutation(() => AgreementPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'updateAgreement')
  async updateAgreement(@Args('updateAgreementInput') updateAgreementInput: UpdateAgreementInput): Promise<AgreementPayload> {
    return {
      agreement: await this.agreementService.update(updateAgreementInput),
      response: { status: 200, message: "Agreement updated successfully" }
    };
  }

  @Mutation(() => AgreementPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'removeAgreement')
  async removeAgreement(@Args('agreementId') agreementId: string) {
    await this.agreementService.removeAgreement(agreementId);
    return { response: { status: 200, message: 'Agreement Deleted' } };
  }

  @Query(() => AgreementPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'fetchAgreement')
  async fetchAgreement(@Args('agreementId') agreementId: string): Promise<AgreementPayload> {
    return {
      agreement: await this.agreementService.fetchAgreement(agreementId),
      response: { status: 200, message: "Agreement fetched successfully" }
    };
  }

  @Query(() => AgreementsPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'fetchAllAgreements')
  async fetchAllAgreements(@Args('agreementPaginationInput') agreementPaginationInput: AgreementPaginationInput): Promise<AgreementsPayload> {
    const agreements = await this.agreementService.fetchAllAgreements(agreementPaginationInput)
    return {
      ...agreements,
      response: { status: 200, message: "Agreements fetched successfully" }
    };
  }
}
