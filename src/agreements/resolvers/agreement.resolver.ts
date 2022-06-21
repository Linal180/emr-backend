import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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
  async createAgreement(@Args('createAgreementInput') createAgreementInput: AgreementInput): Promise<AgreementPayload> {
    return {
      agreement: await this.agreementService.create(createAgreementInput),
      response: { status: 200, message: "Agreement created successfully" }
    };
  }

  @Mutation(() => AgreementPayload)
  async updateAgreement(@Args('updateAgreementInput') updateAgreementInput: UpdateAgreementInput): Promise<AgreementPayload> {
    return {
      agreement: await this.agreementService.update(updateAgreementInput),
      response: { status: 200, message: "Agreement updated successfully" }
    };
  }

  @Mutation(() => AgreementPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'removeFacility')
  async removeAgreement(@Args('agreementId') agreementId: string) {
    await this.agreementService.removeAgreement(agreementId);
    return { response: { status: 200, message: 'Agreement Deleted' } };
  }

  @Query(() => AgreementPayload)
  async fetchAgreement(@Args('agreementId') agreementId: string): Promise<AgreementPayload> {
    return {
      agreement: await this.agreementService.fetchAgreement(agreementId),
      response: { status: 200, message: "Agreement fetched successfully" }
    };
  }

  @Query(() => AgreementsPayload)
  async fetchAllAgreements(@Args('agreementPaginationInput') agreementPaginationInput: AgreementPaginationInput): Promise<AgreementsPayload> {
    const agreements = await this.agreementService.fetchAllAgreements(agreementPaginationInput)
    return {
      ...agreements,
      response: { status: 200, message: "Agreements fetched successfully" }
    };
  }
}
