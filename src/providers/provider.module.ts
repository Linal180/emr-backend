import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacilityModule } from 'src/facilities/facility.module';
import { PaginationModule } from 'src/pagination/pagination.module';
import { PatientModule } from 'src/patients/patient.module';
import { UsersModule } from 'src/users/users.module';
import { BillingAddress } from './entities/billing-address.entity';
import { Contact } from './entities/contact.entity';
import { Doctor } from './entities/doctor.entity';
import { Schedule } from './entities/schedule.entity';
import { Staff } from './entities/staff.entity';
import { ContactResolver } from './resolvers/contact.resolver';
import { DoctorResolver } from './resolvers/doctor.resolver';
import { StaffResolver } from './resolvers/staff.resolver';
import { BillingAddressService } from './services/billing-address.service';
import { ContactService } from './services/contact.service';
import { DoctorService } from './services/doctor.service';
import { StaffService } from './services/staff.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Staff, Doctor, Contact, BillingAddress, Schedule]),
    PaginationModule,
    forwardRef(() => PatientModule),
    forwardRef(() => FacilityModule),
    forwardRef(() => UsersModule)
  ],
  providers: [StaffResolver, StaffService, ContactResolver, ContactService, BillingAddressService, DoctorResolver, DoctorService],
  exports: [ContactService, StaffService, TypeOrmModule, BillingAddressService, DoctorService]
})
export class ProviderModule { }


