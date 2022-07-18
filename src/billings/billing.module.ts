import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentModule } from 'src/appointments/appointment.module';
import { FacilityModule } from 'src/facilities/facility.module';
import { InsuranceModule } from 'src/insurance/insurance.module';
import { PolicyHolderService } from 'src/insurance/services/policy-holder.service';
import { PatientModule } from 'src/patients/patient.module';
import { ProviderModule } from 'src/providers/provider.module';
import { Billing } from './entities/billing.entity';
import { Code } from './entities/code.entity';
import { BillingResolver } from './resolvers/billing.resolver';
import { BillingService } from './services/billing.service';
import { UsersModule } from 'src/users/users.module';
import { PracticeModule } from 'src/practice/practice.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Billing,Code]),
    UsersModule,
    PatientModule,
    AppointmentModule,
    InsuranceModule,
    ProviderModule,
    FacilityModule,
    PracticeModule,
    HttpModule
  ],
  providers: [BillingResolver, BillingService],
  exports: [TypeOrmModule],
})
export class BillingModule { }



