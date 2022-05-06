import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentModule } from 'src/appointments/appointment.module';
import { FacilityModule } from 'src/facilities/facility.module';
import { PaginationModule } from 'src/pagination/pagination.module';
import { PatientModule } from 'src/patients/patient.module';
import { UsersModule } from 'src/users/users.module';
import { BillingAddress } from './entities/billing-address.entity';
import { Contact } from './entities/contact.entity';
import { Doctor } from './entities/doctor.entity';
import { Schedule } from './entities/schedule.entity';
import { ScheduleServices } from './entities/scheduleServices.entity';
import { Staff } from './entities/staff.entity';
import { ContactResolver } from './resolvers/contact.resolver';
import { DoctorResolver } from './resolvers/doctor.resolver';
import { ScheduleResolver } from './resolvers/schedule.resolver';
import { StaffResolver } from './resolvers/staff.resolver';
import { BillingAddressService } from './services/billing-address.service';
import { ContactService } from './services/contact.service';
import { DoctorService } from './services/doctor.service';
import { ScheduleService } from './services/schedule.service';
import { StaffService } from './services/staff.service';
import { AttachmentsModule } from 'src/attachments/attachments.module';
import { DoctorController } from './controllers/doctor.controller';
import { StaffController } from './controllers/staff.controller';
import { DoctorSubscriber } from './subscribers/doctor.subscriber';
import { StaffSubscriber } from './subscribers/staff.subscriber';

@Module({
  imports: [
    TypeOrmModule.forFeature([Staff, Doctor, Contact, BillingAddress, Schedule, ScheduleServices]),
    PaginationModule,
    forwardRef(() => PatientModule),
    forwardRef(() => FacilityModule),
    forwardRef(() => UsersModule),
    forwardRef(() => AppointmentModule),
    AttachmentsModule
  ],
  providers: [StaffResolver, StaffService, ContactResolver, ContactService, BillingAddressService,
    DoctorResolver, DoctorService, ScheduleResolver, ScheduleService, DoctorSubscriber, StaffSubscriber],
  controllers: [DoctorController, StaffController],
  exports: [ContactService, StaffService, ScheduleService, TypeOrmModule, BillingAddressService, DoctorService]
})
export class ProviderModule { }


