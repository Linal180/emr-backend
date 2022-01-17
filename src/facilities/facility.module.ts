import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaginationModule } from 'src/pagination/pagination.module';
import { ProviderModule } from 'src/providers/provider.module';
import { UsersModule } from 'src/users/users.module';
import { Facility } from './entities/facility.entity';
import { FacilityResolver } from './facility.resolver';
import { FacilityService } from './facility.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Facility]),
    forwardRef(() => UsersModule),
    PaginationModule,
    forwardRef(() => ProviderModule)
  ],
  providers: [FacilityResolver, FacilityService],
  exports: [FacilityService, TypeOrmModule],
})
export class FacilityModule { }



