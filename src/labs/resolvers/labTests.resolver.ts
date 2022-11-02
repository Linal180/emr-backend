import { HttpStatus, NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
//entities
import { LabTests } from '../entities/labTests.entity';
import { LoincCodes } from '../entities/loincCodes.entity';
import { Doctor } from 'src/providers/entities/doctor.entity';
import { Observations } from '../entities/observations.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { TestSpecimens } from '../entities/testSpecimens.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';
// services
import { LabTestsService } from '../services/labTests.service';
import { LoincCodesService } from '../services/loincCodes.service';
import { DoctorService } from 'src/providers/services/doctor.service';
import { TestSpecimenService } from '../services/testSpecimen.service';
import { PatientService } from 'src/patients/services/patient.service';
import { AppointmentService } from 'src/appointments/services/appointment.service';
import { LabTestsObservationsService } from '../services/labTestObservation.service';
// guards
import PermissionGuard from 'src/users/auth/role.guard';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
// inputs
import LabTestInput from '../dto/lab-test.input';
import CreateLabTestInput from '../dto/create-lab-test-input.dto';
import LabTestByOrderNumInput from '../dto/lab-test-orderNum.dto';
import CreateLabTestItemInput from '../dto/create-lab-test-Item-input.dto';
import { GetLabTest, RemoveLabTest, UpdateLabTestInput } from '../dto/update-lab-test.input';
//payloads
import { LabTestsPayload } from '../dto/labTests-payload.dto';
import { LabResultPayload, LabTestPayload } from '../dto/labTest-payload.dto';

@Resolver(() => LabTests)
export class LabTestsResolver {
  constructor(
    private readonly doctorService: DoctorService,
    private readonly patientService: PatientService,
    private readonly labTestsService: LabTestsService,
    private readonly loincCodesService: LoincCodesService,
    private readonly appointmentService: AppointmentService,
    private readonly testSpecimenService: TestSpecimenService,
    private readonly labTestsObservationsService: LabTestsObservationsService,
  ) { }

  // mutations

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

  @Mutation(() => LabTestsPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'updateLabTestsByOrderNum')
  async updateLabTestsByOrderNum(@Args('updateLabTestItemInput') updateLabTestItemInput: CreateLabTestItemInput): Promise<LabTestsPayload> {
    return {
      labTests: await this.labTestsService.updateLabTestsByOrderNumber(updateLabTestItemInput),
      response: { status: 200, message: 'Lab test updated successfully' }
    };
  }

  @Mutation(() => LabTestPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'removeLabTest')
  async removeLabTest(@Args('removeLabTest') removeLabTest: RemoveLabTest) {
    await this.labTestsService.removeLabTest(removeLabTest);
    return { response: { status: 200, message: 'Lab test Deleted' } };
  }

  // queries

  @Query(() => LabTestPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'getLabTest')
  async getLabTest(@Args('getLabTest') getLabTest: GetLabTest): Promise<LabTestPayload> {
    const labTest = await this.labTestsService.GetLabTest(getLabTest.id)
    return {
      ...labTest,
      response: { status: 200, message: 'Lab test fetched successfully' }
    };
  }

  @Query(() => LabTestsPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'findLabTestsByOrderNum')
  async findLabTestsByOrderNum(@Args('labTestByOrderNumInput') labTestByOrderNumInput: LabTestByOrderNumInput): Promise<LabTestsPayload> {
    const labTests = await this.labTestsService.findLabTestsByOrderNum(labTestByOrderNumInput)
    return {
      ...labTests,
      response: { status: 200, message: 'Lab test fetched successfully' }
    };
  }

  @Query(() => LabTestsPayload)
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

  @Query(() => LabResultPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'findAllLabTest')
  async findLabResultInfo(@Args('orderNumber') orderNumber: string): Promise<LabResultPayload> {
    const labResultInfo = await this.labTestsService.findLabResultInfo(orderNumber)
    if (labResultInfo) {
      return {
        ...labResultInfo,
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

  // resolve fields

  @ResolveField(() => Appointment)
  async appointment(@Parent() labTests: LabTests): Promise<Appointment> {
    if (labTests && labTests.appointmentId) {
      return await this.appointmentService.findOne(labTests.appointmentId);
    }
  }

  @ResolveField(() => Patient)
  async patient(@Parent() labTests: LabTests): Promise<Patient> {
    if (labTests && labTests.patientId) {
      return await this.patientService.findOne(labTests.patientId);
    }
  }

  @ResolveField(() => Doctor)
  async doctor(@Parent() labTests: LabTests): Promise<Doctor> {
    if (labTests && labTests.doctorId) {
      return await this.doctorService.findOne(labTests.doctorId);
    }
  }

  @ResolveField(() => [TestSpecimens])
  async testSpecimens(@Parent() labTests: LabTests): Promise<TestSpecimens[]> {
    if (labTests) {
      return await this.testSpecimenService.GetSpecimensByLabTestId(labTests.id);
    }
  }

  @ResolveField(() => [Observations])
  async testObservations(@Parent() labTests: LabTests): Promise<Observations[]> {
    if (labTests) {
      return await this.labTestsObservationsService.GetLabTestObservations(labTests.id);
    }
  }

  @ResolveField(() => LoincCodes)
  async test(@Parent() labTests: LabTests): Promise<LoincCodes> {
    if (labTests.testId) {
      return await this.loincCodesService.findOne(labTests.testId);
    }
  }

  @ResolveField(() => Doctor)
  async primaryProvider(@Parent() labTests: LabTests): Promise<Doctor> {
    if (labTests.primaryProviderId) {
      return await this.doctorService.findOne(labTests.primaryProviderId);
    }
  }

  @ResolveField(() => Doctor)
  async referringProvider(@Parent() labTests: LabTests): Promise<Doctor> {
    if (labTests.referringProviderId) {
      return await this.doctorService.findOne(labTests.referringProviderId);
    }
  }
}
