import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacilityModule } from 'src/facilities/facility.module';
import { PaginationModule } from 'src/pagination/pagination.module';
import { UsersModule } from 'src/users/users.module';
import { BillingAddress } from './entities/billing-address.entity';
import { Contact } from './entities/contact.entity';
import { Doctor } from './entities/doctor.entity';
import { Staff } from './entities/staff.entity';
import { StaffResolver } from './resolvers/staff.resolver';
import { BillingAddressService } from './services/billing-address.service';
import { ContactService } from './services/contact.service';
import { StaffService } from './services/staff.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Staff, Doctor, Contact, BillingAddress]),
    PaginationModule,
    forwardRef(() => FacilityModule),
    forwardRef(() => UsersModule)
  ],
  providers: [StaffResolver, StaffService, ContactService, BillingAddressService],
  exports: [ContactService, StaffService, TypeOrmModule, BillingAddressService]
})
export class ProviderModule { }


