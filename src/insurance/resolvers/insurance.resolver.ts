import { Resolver, Query, Args } from '@nestjs/graphql';
//service
import { InsuranceService } from '../services/insurance.service';
//entity
import { Insurance } from '../entities/insurance.entity';
//payload
import { InsurancePayload, InsurancesPayload } from '../dto/insurances-payload.dto';
import { GetInsuranceInput, InsurancePaginationInput } from '../dto/insurances-input.dto';
import { HttpStatus, NotFoundException } from '@nestjs/common';

@Resolver(() => Insurance)
export class InsuranceResolver {
  constructor(private readonly insuranceService: InsuranceService) { }

  @Query(() => InsurancesPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'fetchAllInsurances')
  async fetchAllInsurances(@Args('insuranceInput') insuranceInput: InsurancePaginationInput): Promise<InsurancesPayload> {
    const insurances = await this.insuranceService.findAll(insuranceInput)

    return {
      ...insurances,
      response: { status: 200, message: 'Insurances data fetched successfully' }
    }
  }

  @Query(() => InsurancesPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'fetchInsurance')
  async fetchInsurance(@Args('searchTerm') searchTerm: string): Promise<InsurancesPayload> {
    return {
      insurances: await this.insuranceService.findByPayerNameOrId(searchTerm),
      response: { status: 200, message: "Insurances matching PayerName and PayerId fetched successfully" }
    };
  }

  @Query(() => InsurancePayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'fetchInsurance')
  async getInsurance(@Args('getInsuranceInput') getInsuranceInput: GetInsuranceInput): Promise<InsurancePayload> {
    const { id } = getInsuranceInput;
    const insurance = await this.insuranceService.findOne(id)
    if (!insurance) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Insurance not found',
      });
    }
    return {
      insurance,
      response: { status: 200, message: "Insurance is fetch successfully." }
    };
  }
}
