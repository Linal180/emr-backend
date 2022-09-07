import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
//modules
import { UsersModule } from 'src/users/users.module';
import { MailerModule } from 'src/mailer/mailer.module';
import { PaymentModule } from 'src/payment/payment.module';
import { PatientModule } from 'src/patients/patient.module';
import { ProviderModule } from 'src/providers/provider.module';
import { FacilityModule } from 'src/facilities/facility.module';
import { InsuranceModule } from 'src/insurance/insurance.module';
import { PaginationModule } from 'src/pagination/pagination.module';
//entities
import { Contract } from './entities/contract.entity';
import { Appointment } from './entities/appointment.entity';
//services
import { ContractService } from './services/contract.service';
import { AppointmentService } from './services/appointment.service';
//resolvers
import { AppointmentResolver } from './resolvers/appointment.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment, Contract]),
    forwardRef(() => UsersModule),
    PaginationModule,
    forwardRef(() => ProviderModule),
    forwardRef(() => PatientModule),
    forwardRef(() => FacilityModule),
    PaymentModule,
    MailerModule,
    forwardRef(() => PaymentModule),
    forwardRef(() => InsuranceModule),
  ],
  providers: [AppointmentResolver, AppointmentService, ContractService],
  exports: [AppointmentService, TypeOrmModule, ContractService],
})
export class AppointmentModule { }



