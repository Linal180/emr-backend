import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaginationModule } from 'src/pagination/pagination.module';
import { PracticeModule } from 'src/practice/practice.module';
import { ProviderModule } from 'src/providers/provider.module';
import { UsersModule } from 'src/users/users.module';
import { Facility } from './entities/facility.entity';
import { Service } from './entities/services.entity';
import { FacilityResolver } from './resolvers/facility.resolver';
import { ServiceResolver } from './resolvers/services.resolver';
import { FacilityService } from './services/facility.service';
import { ServicesService } from './services/services.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Facility, Service]),
    forwardRef(() => UsersModule),
    PaginationModule,
    PracticeModule,
    forwardRef(() => ProviderModule)
  ],
  providers: [FacilityResolver, FacilityService, ServiceResolver, ServicesService],
  exports: [FacilityService, ServicesService, TypeOrmModule],
})
export class FacilityModule { }



