import { Args, Query, Resolver } from '@nestjs/graphql';
import { PatientChartingInfoInput } from '../dto/patientChartingInfo-input.dto';
import { PatientChartingInfoPayload } from '../dto/patientChartingInfo-payload.dto';
import { PatientMedicationPayload } from '../dto/patientMedication-payload.dto';
import { PatientMedication } from '../entities/patientMedication.entity';
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
}
