import { Args, Query, Resolver } from '@nestjs/graphql';
//inputs
import { PatientChartingInfoInput, PatientChartingReviewInput } from '../dto/patientChartingInfo-input.dto';
//payloads
import { PatientChartingInfoPayload, PatientChartingReviewPayload } from '../dto/patientChartingInfo-payload.dto';
//entities
import { PatientMedication } from '../entities/patientMedication.entity';
//services
import { PatientChartingService } from '../services/patientCharting.service';

@Resolver(() => PatientMedication)
export class PatientChartingResolver {
  constructor(
    private readonly patientChartingService: PatientChartingService,
  ) { }

  @Query(() => PatientChartingInfoPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'getPatientMedication')
  async getPatientChartingInfo(@Args('patientChartingInfoInput') patientChartingInfoInput: PatientChartingInfoInput): Promise<PatientChartingInfoPayload> {
    const patientChartingInfo = await this.patientChartingService.getPatientChartingInfo(patientChartingInfoInput)
    return {
      ...patientChartingInfo,
      response: { status: 200, message: 'Patient Charting Info fetched successfully' }
    };
  }

  @Query(() => PatientChartingReviewPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'getPatientMedication')
  async getPatientChartingReview(@Args('patientChartingReviewInput') patientChartingReviewInput: PatientChartingReviewInput): Promise<PatientChartingReviewPayload> {
    const patientChartingReview = await this.patientChartingService.getPatientChartingReview(patientChartingReviewInput)
    return {
      ...patientChartingReview,
      response: { status: 200, message: 'Patient Charting Review fetched successfully' }
    };
  }
}
