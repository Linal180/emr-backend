import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PaymentService } from './payment.service';
import {  BraintreeChargePayload, BraintreePayload } from './dto/payment.dto';
import { PaymentInput, PaymentInputsAfterAppointment } from './dto/payment.input';
import { Appointment } from '../appointments/entities/appointment.entity';
import { AppointmentPayload } from '../appointments/dto/appointment-payload.dto';

@Resolver()
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Query(() => BraintreePayload)
  async getToken(): Promise<BraintreePayload> {
    return await this.paymentService.getToken();
  }

  @Mutation(() => AppointmentPayload)
  async chargePayment(@Args('paymentInput') paymentInput: PaymentInput): Promise<Appointment> {
    return await this.paymentService.chargeBefore(paymentInput);
  }
  @Mutation(() => AppointmentPayload)
  async chargeAfterAppointment(@Args('paymentInput') paymentInput: PaymentInputsAfterAppointment): Promise<Appointment> {
    return await this.paymentService.chargeAfter(paymentInput);
  }
}
