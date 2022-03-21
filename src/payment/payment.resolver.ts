import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AppointmentPayload } from '../appointments/dto/appointment-payload.dto';
import { BraintreePayload } from './dto/payment.dto';
import { PaymentInput, PaymentInputsAfterAppointment } from './dto/payment.input';
import { PaymentService } from './payment.service';

@Resolver()
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Query(() => BraintreePayload)
  async getToken(): Promise<BraintreePayload> {
    return await this.paymentService.getToken();
  }

  @Mutation(() => AppointmentPayload)
  async chargePayment(@Args('paymentInput') paymentInput: PaymentInput): Promise<AppointmentPayload> {
    return  {
      appointment: await this.paymentService.chargeBefore(paymentInput),
      response: { status: 200, message: 'Appointment updated successfully' }
    };
    
    
  }
  @Mutation(() => AppointmentPayload)
  async chargeAfterAppointment(@Args('paymentInput') paymentInput: PaymentInputsAfterAppointment): Promise<AppointmentPayload> {
    return {
      appointment: await this.paymentService.chargeAfter(paymentInput),
      response: { status: 200, message: 'Appointment updated successfully' }
    };
  }
}
