import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffResolver } from './staff.resolver';
import { Staff } from './entities/staff.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { PaginationModule } from 'src/pagination/pagination.module';
import { FacilityModule } from 'src/facilities/facility.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Staff]),
    UsersModule,
    PaginationModule,
    FacilityModule
  ],
  providers: [StaffResolver, StaffService],
})
export class StaffModule { }



