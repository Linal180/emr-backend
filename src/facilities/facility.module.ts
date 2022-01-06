import { forwardRef, Module } from '@nestjs/common';
import { FacilityService } from './facility.service';
import { FacilityResolver } from './facility.resolver';
import { Facility } from './entities/facility.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { PaginationModule } from 'src/pagination/pagination.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Facility]),
    forwardRef(() => UsersModule),
    PaginationModule
  ],
  providers: [FacilityResolver, FacilityService],
  exports: [FacilityService, TypeOrmModule],
})
export class FacilityModule { }



