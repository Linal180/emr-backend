//packages imports
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
//entities
import { Patient } from './entities/patient.entity';
import { Employer } from './entities/employer.entity';
import { DoctorPatient } from './entities/doctorPatient.entity';
import { PatientConsent } from './entities/patientConsent.entity';
//modules
import { UsersModule } from 'src/users/users.module';
import { MailerModule } from 'src/mailer/mailer.module';
import { ProviderModule } from 'src/providers/provider.module';
import { FacilityModule } from 'src/facilities/facility.module';
import { AgreementModule } from 'src/agreements/agreement.module';
import { PaginationModule } from 'src/pagination/pagination.module';
import { AttachmentsModule } from 'src/attachments/attachments.module';
import { AppointmentModule } from 'src/appointments/appointment.module';
import { ProblemChartingModule } from 'src/patientCharting/patientCharting.module';
//resolvers
import { PatientResolver } from './resolvers/patient.resolver';
import { DoctorPatientResolver } from './resolvers/doctorPatient.resolver';
import { PatientConsentResolver } from './resolvers/patientConsent.resolver';
//services
import { PatientService } from './services/patient.service';
import { EmployerService } from './services/employer.service';
import { DoctorPatientService } from './services/doctorPatient.service';
import { PatientConsentService } from './services/patientConsent.service';
//controllers, subscribers
import { PatientSubscriber } from './patient.subscriber';
import { PatientController } from './patient.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient, Employer, DoctorPatient, PatientConsent]),
    forwardRef(() => UsersModule),
    forwardRef(() => ProviderModule),
    forwardRef(() => FacilityModule),
    forwardRef(() => AgreementModule),
    forwardRef(() => AttachmentsModule),
    forwardRef(() => AppointmentModule),
    forwardRef(() => ProblemChartingModule),
    MailerModule,
    PaginationModule,
  ],
  providers: [PatientResolver, PatientService, EmployerService, PatientSubscriber, DoctorPatientService,
    DoctorPatientResolver, PatientConsentService, PatientConsentResolver],
  controllers: [PatientController],
  exports: [PatientService, TypeOrmModule, EmployerService, PatientConsentService],
})
export class PatientModule { }



