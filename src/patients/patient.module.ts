import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttachmentsModule } from 'src/attachments/attachments.module';
import { FacilityModule } from 'src/facilities/facility.module';
import { PaginationModule } from 'src/pagination/pagination.module';
import { ProviderModule } from 'src/providers/provider.module';
import { UsersModule } from 'src/users/users.module';
import { Employer } from './entities/employer.entity';
import { Patient } from './entities/patient.entity';
import { PatientController } from './patient.controller';
import { PatientSubscriber } from './patient.subscriber';
import { PatientResolver } from './resolvers/patient.resolver';
import { EmployerService } from './services/employer.service';
import { PatientService } from './services/patient.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient, Employer]),
    forwardRef(() => UsersModule),
    PaginationModule,
    forwardRef(() => AttachmentsModule),
    forwardRef(() => FacilityModule),
    forwardRef(() => ProviderModule)
  ],
  providers: [PatientResolver, PatientService, EmployerService, PatientSubscriber],
  controllers: [PatientController],
  exports: [PatientService, TypeOrmModule, EmployerService],
})
export class PatientModule { }



