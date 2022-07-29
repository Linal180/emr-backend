import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
//modules
import { UsersModule } from 'src/users/users.module';
import { PatientModule } from 'src/patients/patient.module';
import { PracticeModule } from 'src/practice/practice.module';
import { ProviderModule } from 'src/providers/provider.module';
import { FacilityModule } from 'src/facilities/facility.module';
import { InsuranceModule } from 'src/insurance/insurance.module';
import { PaginationModule } from 'src/pagination/pagination.module';
import { FeeScheduleModule } from 'src/feeSchedule/feeSchedule.module';
import { AppointmentModule } from 'src/appointments/appointment.module';
//entity
import { Code } from './entities/code.entity';
import { Billing } from './entities/billing.entity';
import { ClaimStatus } from './entities/claim-status.entity';
import { LiveClaimFeed } from './entities/liveClaimFeed.entity';
//resolvers
import { CodeResolver } from './resolvers/codes.resolver';
import { ClaimResolver } from './resolvers/claim.resolver';
import { BillingResolver } from './resolvers/billing.resolver';
import { ClaimStatusResolver } from './resolvers/claimStatus.resolver';
import { LiveClaimFeedResolver } from './resolvers/liveClaimFeed.resolver';
//services
import { ClaimService } from './services/claim.service';
import { BillingService } from './services/billing.service';
import { ClaimStatusService } from './services/claimStatus.service';
import { LiveClaimFeedService } from './services/liveClaimFeed.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Billing, Code, ClaimStatus, LiveClaimFeed]),
    HttpModule,
    UsersModule,
    PatientModule,
    ProviderModule,
    FacilityModule,
    PracticeModule,
    InsuranceModule,
    PaginationModule,
    FeeScheduleModule,
    AppointmentModule,
  ],
  providers: [
    CodeResolver,
    ClaimService,
    ClaimResolver,
    BillingService,
    BillingResolver,
    ClaimStatusService,
    ClaimStatusResolver,
    LiveClaimFeedService,
    LiveClaimFeedResolver,
  ],
  exports: [TypeOrmModule],
})
export class BillingModule { }



