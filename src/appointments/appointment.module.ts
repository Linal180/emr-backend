import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacilityModule } from 'src/facilities/facility.module';
import { MailerModule } from 'src/mailer/mailer.module';
import { PaginationModule } from 'src/pagination/pagination.module';
import { PatientModule } from 'src/patients/patient.module';
import { PaymentModule } from 'src/payment/payment.module';
import { ProviderModule } from 'src/providers/provider.module';
import { UsersModule } from 'src/users/users.module';
import { Appointment } from './entities/appointment.entity';
import { Contract } from './entities/contract.entity';
import { AppointmentResolver } from './resolvers/appointment.resolver';
import { AppointmentService } from './services/appointment.service';
import { ContractService } from './services/contract.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment, Contract]),
    forwardRef(() => UsersModule),
    PaginationModule,
    forwardRef(() => ProviderModule),
    PatientModule,
    PaymentModule,
    MailerModule,
    FacilityModule,
    forwardRef(() => PaymentModule),
  ],
  providers: [AppointmentResolver, AppointmentService, ContractService],
  exports: [AppointmentService, TypeOrmModule, ContractService],
})
export class AppointmentModule { }



