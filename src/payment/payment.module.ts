import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//user imports
import { PaymentService } from './services/payment.service';
import { PaymentResolver } from './resolvers/payment.resolver';
import { InvoiceResolver } from './resolvers/invoice.resolver';
import { InvoiceService } from './services/invoice.service';
import { Transactions } from './entity/payment.entity';
import { Invoice } from './entity/invoice.entity';
import { AppointmentModule } from '../appointments/appointment.module';
import { PaginationModule } from 'src/pagination/pagination.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transactions, Invoice]),
    PaginationModule,
    forwardRef(() => AppointmentModule),
    forwardRef(() => UsersModule),
  ],
  providers: [PaymentService, PaymentResolver, InvoiceResolver, InvoiceService],
  exports: [PaymentService,InvoiceService],
})  
export class PaymentModule {}
