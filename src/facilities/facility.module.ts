import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
//entities
import { Service } from './entities/services.entity';
import { Facility } from './entities/facility.entity';
//services
import { FacilityService } from './services/facility.service';
import { ServicesService } from './services/services.service';
//modules
import { UsersModule } from 'src/users/users.module';
import { PracticeModule } from 'src/practice/practice.module';
import { ProviderModule } from 'src/providers/provider.module';
import { PaginationModule } from 'src/pagination/pagination.module';
import { AppointmentModule } from 'src/appointments/appointment.module';
//resolvers
import { ServiceResolver } from './resolvers/services.resolver';
import { FacilityResolver } from './resolvers/facility.resolver';
import { TaxonomiesService } from './services/taxonomy.service';
import { TaxonomyResolver } from './resolvers/taxonomy.resolver';
import { Taxonomy } from './entities/taxonomy.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Facility, Service, Taxonomy]),
    PaginationModule,
    forwardRef(() => UsersModule),
    forwardRef(() => PracticeModule),
    forwardRef(() => ProviderModule),
    forwardRef(() => AppointmentModule),
  ],
  providers: [FacilityResolver, FacilityService, ServiceResolver, ServicesService, TaxonomyResolver, TaxonomiesService],
  exports: [FacilityService, ServicesService, TaxonomiesService, TypeOrmModule],
})
export class FacilityModule { }



