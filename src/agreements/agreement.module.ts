//package block
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
//modules
import { PatientModule } from 'src/patients/patient.module';
import { PaginationModule } from 'src/pagination/pagination.module';
import { AppointmentModule } from 'src/appointments/appointment.module';
//services
import { AgreementService } from './services/agreement.service';
//entities
import { Agreement } from './entities/agreement.entity';
//resolvers
import { AgreementResolver } from './resolvers/agreement.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Agreement]),
    forwardRef(() => PatientModule),
    forwardRef(() => PaginationModule),
    forwardRef(() => AppointmentModule),
  ],
  providers: [AgreementResolver, AgreementService],
  exports: [TypeOrmModule, AgreementService],
})
export class AgreementModule { }



