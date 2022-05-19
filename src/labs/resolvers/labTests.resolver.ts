import { HttpStatus, NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { AppointmentService } from 'src/appointments/services/appointment.service';
import { Patient } from 'src/patients/entities/patient.entity';
import { PatientService } from 'src/patients/services/patient.service';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
import PermissionGuard from 'src/users/auth/role.guard';
import CreateLabTestInput from '../dto/create-lab-test-input.dto';
import LabTestByOrderNumInput from '../dto/lab-test-orderNum.dto';
import LabTestInput from '../dto/lab-test.input';
import { LabTestPayload } from '../dto/labTest-payload.dto';
import { LabTestsPayload } from '../dto/labTests-payload.dto';
import { GetLabTest, RemoveLabTest, UpdateLabTestInput } from '../dto/update-lab-test.input';
import { LabTests } from '../entities/labTests.entity';
import { Observations } from '../entities/observations.entity';
import { TestSpecimens } from '../entities/testSpecimens.entity';
import { LabTestsObservationsService } from '../services/labTestObservation.service';
import { LabTestsService } from '../services/labTests.service';
import { TestSpecimenService } from '../services/testSpecimen.service';

@Resolver(() => LabTests)
export class LabTestsResolver {
  constructor(private readonly labTestsService: LabTestsService,
    private readonly appointmentService: AppointmentService,
    private readonly testSpecimenService: TestSpecimenService,
    private readonly labTestsObservationsService: LabTestsObservationsService,
    private readonly patientService: PatientService) { }

  @Mutation(() => LabTestPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'createLabTest')
  async createLabTest(@Args('createLabTestInput') createLabTestInput: CreateLabTestInput) {
    return {
      labTest: await this.labTestsService.createLabTest(createLabTestInput),
      response: { status: 200, message: 'Lab test created successfully' }
    };
  } 

  @Mutation(() => LabTestPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'updateLabTest')
  async updateLabTest(@Args('updateLabTestInput') updateLabTestInput: UpdateLabTestInput) {
    return {
      labTest: await this.labTestsService.updateLabTest(updateLabTestInput),
      response: { status: 200, message: 'Lab test updated successfully' }
    };
  }
  
  @Query(returns => LabTestPayload)  
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'getLabTest')
  async getLabTest(@Args('getLabTest') getLabTest: GetLabTest): Promise<LabTestPayload> {
    const labTest = await this.labTestsService.GetLabTest(getLabTest.id)
    return {
      ...labTest,
      response: { status: 200, message: 'Lab test fetched successfully' }
    };
  }

  @Query(returns => LabTestsPayload)  
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'getLabTest')
  async findLabTestsByOrderNum(@Args('labTestByOrderNumInput') labTestByOrderNumInput: LabTestByOrderNumInput): Promise<LabTestsPayload> {
    const labTests = await this.labTestsService.findLabTestsByOrderNum(labTestByOrderNumInput)
    return {
      ...labTests,
      response: { status: 200, message: 'Lab test fetched successfully' }
    };
  }

  @ResolveField((returns) => Appointment)
  async appointment(@Parent() labTests: LabTests): Promise<Appointment> {
    if (labTests && labTests.appointmentId) {
     return await this.appointmentService.findOne(labTests.appointmentId);
    }
  }

  @ResolveField((returns) => Patient)
  async patient(@Parent() labTests: LabTests): Promise<Patient> {
    if (labTests && labTests.patientId) {
     return await this.patientService.findOne(labTests.patientId);
    }
  }

  @ResolveField((returns) => [TestSpecimens])
  async testSpecimens(@Parent() labTests: LabTests): Promise<TestSpecimens[]> {
    if (labTests) {
     return await this.testSpecimenService.GetSpecimensByLabTestId(labTests.id);
    }
  }

  @ResolveField((returns) => [Observations])
  async testObservations(@Parent() labTests: LabTests): Promise<Observations[]> {
    if (labTests) {
     return await this.labTestsObservationsService.GetLabTestObservations(labTests.id);
    }
  }

  @Query(returns => LabTestsPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'findAllLabTest')
  async findAllLabTest(@Args('labTestInput') labTestInput: LabTestInput): Promise<LabTestsPayload> {
    const labTests = await this.labTestsService.findAllLabTest(labTestInput)
    if (labTests) {
      return {
        ...labTests,
        response: {
          message: "OK", status: 200,
        }
      }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Lab Test not found',
    });
  }

  @Mutation(() => LabTestPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'removeLabTest')
  async removeLabTest(@Args('removeLabTest') removeLabTest: RemoveLabTest) {
    await this.labTestsService.removeLabTest(removeLabTest);
    return { response: { status: 200, message: 'Lab test Deleted' } };
  }
}
