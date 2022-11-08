import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
// modules
import { UsersModule } from 'src/users/users.module';
import { MailerModule } from 'src/mailer/mailer.module';
import { PatientModule } from 'src/patients/patient.module';
import { PracticeModule } from 'src/practice/practice.module';
import { FacilityModule } from 'src/facilities/facility.module';
import { PaginationModule } from 'src/pagination/pagination.module';
import { AttachmentsModule } from 'src/attachments/attachments.module';
import { AppointmentModule } from 'src/appointments/appointment.module';
//entities
import { Staff } from './entities/staff.entity';
import { Doctor } from './entities/doctor.entity';
import { Contact } from './entities/contact.entity';
import { Schedule } from './entities/schedule.entity';
import { BillingAddress } from './entities/billing-address.entity';
import { ScheduleServices } from './entities/scheduleServices.entity';
//resolvers
import { StaffResolver } from './resolvers/staff.resolver';
import { DoctorResolver } from './resolvers/doctor.resolver';
import { ContactResolver } from './resolvers/contact.resolver';
import { ScheduleResolver } from './resolvers/schedule.resolver';
//services
import { StaffService } from './services/staff.service';
import { DoctorService } from './services/doctor.service';
import { ContactService } from './services/contact.service';
import { ScheduleService } from './services/schedule.service';
import { BillingAddressService } from './services/billing-address.service';
//controllers
import { StaffController } from './controllers/staff.controller';
import { DoctorController } from './controllers/doctor.controller';
//subscriber
import { StaffSubscriber } from './subscribers/staff.subscriber';
import { DoctorSubscriber } from './subscribers/doctor.subscriber';

@Module({
  imports: [
    TypeOrmModule.forFeature([Staff, Doctor, Contact, BillingAddress, Schedule, ScheduleServices]),
    MailerModule,
    PaginationModule,
    forwardRef(() => UsersModule),
    forwardRef(() => PatientModule),
    forwardRef(() => PracticeModule),
    forwardRef(() => FacilityModule),
    forwardRef(() => AppointmentModule),
    forwardRef(() => AttachmentsModule),
  ],
  providers: [StaffResolver, StaffService, ContactResolver, ContactService, BillingAddressService,
    DoctorResolver, DoctorService, ScheduleResolver, ScheduleService, DoctorSubscriber, StaffSubscriber],
  controllers: [DoctorController, StaffController],
  exports: [ContactService, StaffService, ScheduleService, TypeOrmModule, BillingAddressService, DoctorService]
})
export class ProviderModule { }


