import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaginationModule } from 'src/pagination/pagination.module';
import { ProviderModule } from 'src/providers/provider.module';
import { UsersModule } from 'src/users/users.module';
import { Appointment } from './entities/appointment.entity';
import { AppointmentResolver } from './resolvers/appointment.resolver';
import { AppointmentService } from './services/appointment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment]),
    forwardRef(() => UsersModule),
    PaginationModule,
    forwardRef(() => ProviderModule)
  ],
  providers: [AppointmentResolver, AppointmentService],
  exports: [AppointmentService, TypeOrmModule],
})
export class AppointmentModule { }



