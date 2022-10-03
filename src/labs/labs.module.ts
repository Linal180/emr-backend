import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentModule } from 'src/appointments/appointment.module';
import { AttachmentsModule } from 'src/attachments/attachments.module';
import { FacilityModule } from 'src/facilities/facility.module';
import { MailerModule } from 'src/mailer/mailer.module';
import { PaginationModule } from 'src/pagination/pagination.module';
import { ProblemChartingModule } from 'src/patientCharting/patientCharting.module';
import { PatientModule } from 'src/patients/patient.module';
import { PracticeModule } from 'src/practice/practice.module';
import { ProviderModule } from 'src/providers/provider.module';
import { UsersModule } from 'src/users/users.module';
import { LabTests } from './entities/labTests.entity';
import { LoincCodes } from './entities/loincCodes.entity';
import { Observations } from './entities/observations.entity';
import { SpecimenTypes } from './entities/specimenTypes.entity';
import { TestSpecimens } from './entities/testSpecimens.entity';
import { LabTestsObservationsController } from './labs.controller';
import { ObservationsSubscriber } from './labs.subscriber';
import { LabTestObservationResolver } from './resolvers/labTestObservations.resolver';
import { LabTestsResolver } from './resolvers/labTests.resolver';
import { LoincCodesResolver } from './resolvers/loincCodes.resolver';
import { TestSpecimenResolver } from './resolvers/testSpecimen.resolver';
import { LabTestsObservationsService } from './services/labTestObservation.service';
import { LabTestsService } from './services/labTests.service';
import { LoincCodesService } from './services/loincCodes.service';
import { TestSpecimenService } from './services/testSpecimen.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LoincCodes, LabTests, SpecimenTypes, TestSpecimens, Observations]),
    forwardRef(() => UsersModule),
    forwardRef(() => PaginationModule),
    PracticeModule,
    forwardRef(() => ProblemChartingModule),
    forwardRef(()=>PatientModule),
    forwardRef(()=>AttachmentsModule),
    AppointmentModule,
    FacilityModule,
    MailerModule,
    forwardRef(() => ProviderModule)
  ],
  controllers: [LabTestsObservationsController],
  providers: [ObservationsSubscriber, LoincCodesResolver, LoincCodesService, TestSpecimenService, LabTestsResolver, LabTestsService, LabTestObservationResolver, LabTestsObservationsService, TestSpecimenResolver],
  exports: [LoincCodesService, LabTestsService, TestSpecimenService, LabTestsObservationsService, TypeOrmModule],
})
export class LabModule { }



