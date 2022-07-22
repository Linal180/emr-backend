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

@Module({
  imports: [
    TypeOrmModule.forFeature([Facility, Service]),
    PaginationModule,
    forwardRef(() => UsersModule),
    forwardRef(() => PracticeModule),
    forwardRef(() => ProviderModule),
    forwardRef(() => AppointmentModule),
  ],
  providers: [FacilityResolver, FacilityService, ServiceResolver, ServicesService],
  exports: [FacilityService, ServicesService, TypeOrmModule],
})
export class FacilityModule { }



