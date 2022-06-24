import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentModule } from 'src/appointments/appointment.module';
import { FacilityModule } from 'src/facilities/facility.module';
import { PaginationService } from 'src/pagination/pagination.service';
import { PatientModule } from 'src/patients/patient.module';
import { PracticeModule } from 'src/practice/practice.module';
import { Agreement } from './entities/agreement.entity';
import { AgreementResolver } from './resolvers/agreement.resolver';
import { AgreementService } from './services/agreement.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Agreement]),
    PatientModule,
    AppointmentModule,
    FacilityModule,
    PracticeModule
  ],
  providers: [AgreementResolver, AgreementService, PaginationService],
  exports: [TypeOrmModule],
})
export class AgreementModule { }



