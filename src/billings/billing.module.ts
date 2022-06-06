import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentModule } from 'src/appointments/appointment.module';
import { FacilityModule } from 'src/facilities/facility.module';
import { MailerModule } from 'src/mailer/mailer.module';
import { PaginationModule } from 'src/pagination/pagination.module';
import { PatientModule } from 'src/patients/patient.module';
import { PaymentModule } from 'src/payment/payment.module';
import { ProviderModule } from 'src/providers/provider.module';
import { UsersModule } from 'src/users/users.module';
import { Billing } from './entities/billing.entity';
import { Code } from './entities/code.entity';
import { BillingResolver } from './reolvers/billing.resolver';
import { BillingService } from './services/billing.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Billing,Code]),
    PatientModule,
    AppointmentModule
  ],
  providers: [BillingResolver, BillingService],
  exports: [TypeOrmModule],
})
export class BillingModule { }



