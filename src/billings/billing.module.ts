import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentModule } from 'src/appointments/appointment.module';
import { FacilityModule } from 'src/facilities/facility.module';
import { FeeScheduleModule } from 'src/feeSchedule/feeSchedule.module';
import { InsuranceModule } from 'src/insurance/insurance.module';
import { PaginationModule } from 'src/pagination/pagination.module';
import { PatientModule } from 'src/patients/patient.module';
import { PracticeModule } from 'src/practice/practice.module';
import { ProviderModule } from 'src/providers/provider.module';
import { UsersModule } from 'src/users/users.module';
import { Billing } from './entities/billing.entity';
import { ClaimStatus } from './entities/claim-status.entity';
import { Code } from './entities/code.entity';
import { BillingResolver } from './resolvers/billing.resolver';
import { ClaimStatusResolver } from './resolvers/claimStatus.resolver';
import { CodeResolver } from './resolvers/codes.resolver';
import { BillingService } from './services/billing.service';
import { ClaimStatusService } from './services/claimStatus.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Billing,Code, ClaimStatus]),
    UsersModule,
    PatientModule,
    AppointmentModule,
    InsuranceModule,
    ProviderModule,
    FacilityModule,
    PracticeModule,
    PaginationModule,
    FeeScheduleModule,
    HttpModule
  ],
  providers: [BillingResolver, BillingService, ClaimStatusResolver, ClaimStatusService, CodeResolver],
  exports: [TypeOrmModule],
})
export class BillingModule { }



