import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Insurance } from './entities/insurance.entity';
import { InsuranceService } from './services/insurance.service';
import { InsuranceResolver } from './resolvers/insurance.resolver';
import { Policy } from './entities/policy.entity';
import { PolicyHolder } from './entities/policy-holder.entity';
import { PolicyService } from './services/policy.service';
import { PolicyResolver } from './resolvers/policy.resolver';
import { Copay } from './entities/copay.entity';
import { PatientModule } from 'src/patients/patient.module';
import { PolicyHolderService } from './services/policy-holder.service';
import { PolicyHolderResolver } from './resolvers/policy-holder.resolver';
import { CopayResolver } from './resolvers/copay.resolver';
import { CopayService } from './services/copay.service';
import { ProviderModule } from 'src/providers/provider.module';
import { PaginationModule } from 'src/pagination/pagination.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Insurance, Policy, PolicyHolder, Copay]),
    UsersModule,
    PatientModule,
    PaginationModule,
    forwardRef(() => ProviderModule),
  ],
  providers: [
    InsuranceResolver, InsuranceService, PolicyResolver, PolicyService, PolicyHolderService, PolicyHolderResolver,
    CopayResolver, CopayService
  ],
  exports: [PolicyService, TypeOrmModule, InsuranceService, PolicyHolderService]
})
export class InsuranceModule { }

