import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
//modules
import { UsersModule } from 'src/users/users.module';
import { MailerModule } from 'src/mailer/mailer.module';
import { PatientModule } from 'src/patients/patient.module';
import { PracticeModule } from 'src/practice/practice.module';
import { ProviderModule } from 'src/providers/provider.module';
import { FacilityModule } from 'src/facilities/facility.module';
import { PaginationModule } from 'src/pagination/pagination.module';
import { AttachmentsModule } from 'src/attachments/attachments.module';
import { AppointmentModule } from 'src/appointments/appointment.module';
import { PatientChartingModule } from 'src/patientCharting/patientCharting.module';
//entities
import { LabTests } from './entities/labTests.entity';
import { LoincCodes } from './entities/loincCodes.entity';
import { ImagingTest } from './entities/imagingTest.entity';
import { ImagingOrder } from './entities/imagingOrder.entity';
import { Observations } from './entities/observations.entity';
import { SpecimenTypes } from './entities/specimenTypes.entity';
import { TestSpecimens } from './entities/testSpecimens.entity';
import { ImagingOrderTest } from './entities/imagingOrderTest.entity';
//resolver
import { LabTestsResolver } from './resolvers/labTests.resolver';
import { LoincCodesResolver } from './resolvers/loincCodes.resolver';
import { ImagingTestResolver } from './resolvers/imagingTest.resolver';
import { TestSpecimenResolver } from './resolvers/testSpecimen.resolver';
import { ImagingOrderResolver } from './resolvers/imagingOrder.resolver';
import { ImagingOrderTestResolver } from './resolvers/imagingOrderTest.resolver';
import { LabTestObservationResolver } from './resolvers/labTestObservations.resolver';
//services
import { LabTestsService } from './services/labTests.service';
import { LoincCodesService } from './services/loincCodes.service';
import { ImagingTestService } from './services/imagingTest.service';
import { TestSpecimenService } from './services/testSpecimen.service';
import { ImagingOrderService } from './services/imagingOrder.service';
import { ImagingOrderTestService } from './services/imagingOrderTest.service';
import { LabTestsObservationsService } from './services/labTestObservation.service';
//controller, subscriber
import { ObservationsSubscriber } from './labs.subscriber';
import { LabTestsObservationsController } from './labs.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LoincCodes, LabTests, SpecimenTypes, TestSpecimens, Observations, ImagingOrder, ImagingTest, ImagingOrderTest
    ]),
    MailerModule,
    PracticeModule,
    FacilityModule,
    AppointmentModule,
    forwardRef(() => UsersModule),
    forwardRef(() => PatientModule),
    forwardRef(() => ProviderModule),
    forwardRef(() => PaginationModule),
    forwardRef(() => AttachmentsModule),
    forwardRef(() => PatientChartingModule),
  ],
  controllers: [LabTestsObservationsController],
  providers: [
    ObservationsSubscriber, LoincCodesResolver, LoincCodesService, TestSpecimenService, LabTestsResolver,
    LabTestsService, LabTestObservationResolver, LabTestsObservationsService, TestSpecimenResolver,
    ImagingTestService, ImagingTestResolver, ImagingOrderService, ImagingOrderResolver, ImagingOrderTestResolver,
    ImagingOrderTestService,
  ],
  exports: [ImagingOrderService, LoincCodesService, LabTestsService, TestSpecimenService, LabTestsObservationsService, TypeOrmModule],
})
export class LabModule { }



