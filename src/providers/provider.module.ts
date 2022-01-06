import { forwardRef, Module } from '@nestjs/common';
import { StaffService } from './services/staff.service';
import { StaffResolver } from './resolvers/staff.resolver';
import { Staff } from './entities/staff.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { PaginationModule } from 'src/pagination/pagination.module';
import { FacilityModule } from 'src/facilities/facility.module';
import { Doctor } from './entities/doctor.entity';
import { Contact } from './entities/contact.entity';
import { ContactService } from './services/contact.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Staff, Doctor, Contact]),
    PaginationModule,
    forwardRef(() => FacilityModule),
    forwardRef(() => UsersModule)
  ],
  providers: [StaffResolver, StaffService, ContactService],
  exports: [ContactService, StaffService, TypeOrmModule]
})
export class ProviderModule { }



