import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentResolver } from './payment.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transactions } from './entity/payment.entity';
import {AppointmentModule} from '../appointments/appointment.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Transactions]),
    AppointmentModule
  ],
  providers: [PaymentService, PaymentResolver],
  exports: [PaymentService]
})
export class PaymentModule {}
