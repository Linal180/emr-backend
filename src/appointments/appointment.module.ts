import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
//modules
import { RoomModule } from 'src/room/room.module';
import { UsersModule } from 'src/users/users.module';
import { MailerModule } from 'src/mailer/mailer.module';
import { PaymentModule } from 'src/payment/payment.module';
import { PatientModule } from 'src/patients/patient.module';
import { ProviderModule } from 'src/providers/provider.module';
import { FacilityModule } from 'src/facilities/facility.module';
import { InsuranceModule } from 'src/insurance/insurance.module';
import { PaginationModule } from 'src/pagination/pagination.module';
//entities
import { Scribe } from './entities/scribe.entity';
import { Contract } from './entities/contract.entity';
import { Appointment } from './entities/appointment.entity';
//services
import { ScribeService } from './services/scribe.service';
import { ContractService } from './services/contract.service';
import { AppointmentService } from './services/appointment.service';
//resolvers
import { ScribeResolver } from './resolvers/scribe.resolver';
import { AppointmentResolver } from './resolvers/appointment.resolver';
import { BillingModule } from 'src/billings/billing.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment, Contract, Scribe]),
    RoomModule,
    MailerModule,
    PaymentModule,
    PaginationModule,
    forwardRef(() => UsersModule),
    forwardRef(() => PatientModule),
    forwardRef(() => PaymentModule),
    forwardRef(() => ProviderModule),
    forwardRef(() => FacilityModule),
    forwardRef(() => InsuranceModule),
    forwardRef(() => BillingModule),
  ],
  providers: [AppointmentResolver, AppointmentService, ContractService, ScribeService, ScribeResolver],
  exports: [AppointmentService, TypeOrmModule, ContractService],
})
export class AppointmentModule { }



