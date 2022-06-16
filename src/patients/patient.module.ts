import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentModule } from 'src/appointments/appointment.module';
import { AttachmentsModule } from 'src/attachments/attachments.module';
import { FacilityModule } from 'src/facilities/facility.module';
import { MailerModule } from 'src/mailer/mailer.module';
import { PaginationModule } from 'src/pagination/pagination.module';
import { ProviderModule } from 'src/providers/provider.module';
import { UsersModule } from 'src/users/users.module';
import { DoctorPatient } from './entities/doctorPatient.entity';
import { Employer } from './entities/employer.entity';
import { Patient } from './entities/patient.entity';
import { PatientController } from './patient.controller';
import { PatientSubscriber } from './patient.subscriber';
import { PatientResolver } from './resolvers/patient.resolver';
import { DoctorPatientResolver } from './resolvers/doctorPatient.resolver';
import { EmployerService } from './services/employer.service';
import { PatientService } from './services/patient.service';
import { DoctorPatientService } from './services/doctorPatient.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient, Employer, DoctorPatient]),
    forwardRef(() => UsersModule),
    PaginationModule,
    MailerModule,
    forwardRef(() => AttachmentsModule),
    forwardRef(() => FacilityModule),
    forwardRef(() => AppointmentModule),
    forwardRef(() => ProviderModule)
  ],
  providers: [PatientResolver, PatientService, EmployerService, PatientSubscriber, DoctorPatientService, DoctorPatientResolver],
  controllers: [PatientController],
  exports: [PatientService, TypeOrmModule, EmployerService],
})
export class PatientModule { }



