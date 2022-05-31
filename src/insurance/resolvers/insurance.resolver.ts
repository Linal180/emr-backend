import { Resolver, Query, Args } from '@nestjs/graphql';
import { InsuranceService } from '../services/insurance.service';
import { Insurance } from '../entities/insurance.entity';
import { InsurancesPayload } from '../dto/insurances-payload.dto';
import { InsuranceInput, InsurancePaginationInput } from '../dto/insurances-input.dto';

@Resolver(() => Insurance)
export class InsuranceResolver {
  constructor(private readonly insuranceService: InsuranceService) {}

  @Query(() => InsurancesPayload)
  async fetchAllInsurances(@Args('insuranceInput') insuranceInput: InsurancePaginationInput): Promise<InsurancesPayload>  {
    const insurances=await this.insuranceService.findAll(insuranceInput)

    return {
      ...insurances,
      response: { status: 200, message: 'Insurances data fetched successfully' }
    }
  }

  @Query(()=>InsurancesPayload)
  async fetchInsurance(@Args('searchTerm') searchTerm: string): Promise<InsurancesPayload> {
    return {
      insurances:await this.insuranceService.findByPayerNameOrId(searchTerm),
      response:{status:200,message:"Insurances matching PayerName and PayerId fetched successfully"}
    };
  }
}
