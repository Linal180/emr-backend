import { Resolver, Query, Args } from '@nestjs/graphql';
//service
import { InsuranceService } from '../services/insurance.service';
//entity
import { Insurance } from '../entities/insurance.entity';
//payload
import { InsurancesPayload } from '../dto/insurances-payload.dto';
import { InsurancePaginationInput } from '../dto/insurances-input.dto';

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
}
