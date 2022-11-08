import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
//entities
import { Copay } from './entities/copay.entity';
import { Policy } from './entities/policy.entity';
import { Insurance } from './entities/insurance.entity';
import { PolicyHolder } from './entities/policy-holder.entity';
import { PolicyCoverage } from './entities/policy-coverage.entity';
import { PolicyEligibility } from './entities/policy-eligibility.entity';
//services
import { CopayService } from './services/copay.service';
import { PolicyService } from './services/policy.service';
import { InsuranceService } from './services/insurance.service';
import { PolicyHolderService } from './services/policy-holder.service';
//resolvers
import { CopayResolver } from './resolvers/copay.resolver';
import { PolicyResolver } from './resolvers/policy.resolver';
import { InsuranceResolver } from './resolvers/insurance.resolver';
import { PolicyHolderResolver } from './resolvers/policy-holder.resolver';
import { PolicyEligibilityResolver } from './resolvers/policy-eligibilities.resolver';
// modules
import { UsersModule } from 'src/users/users.module';
import { PatientModule } from 'src/patients/patient.module';
import { PracticeModule } from 'src/practice/practice.module';
import { ProviderModule } from 'src/providers/provider.module';
import { FacilityModule } from 'src/facilities/facility.module';
import { PaginationModule } from 'src/pagination/pagination.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Insurance, Policy, PolicyHolder, Copay, PolicyEligibility, PolicyCoverage]),
    HttpModule,
    PaginationModule,
    forwardRef(() => UsersModule),
    forwardRef(() => PatientModule),
    forwardRef(() => ProviderModule),
    forwardRef(() => FacilityModule),
    forwardRef(() => PracticeModule),
  ],
  providers: [
    InsuranceResolver, InsuranceService, PolicyResolver, PolicyService, PolicyHolderService, PolicyHolderResolver,
    CopayResolver, CopayService, PolicyEligibilityResolver
  ],
  exports: [PolicyService, TypeOrmModule, InsuranceService, PolicyHolderService]
})
export class InsuranceModule { }

