import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
//user imports
import { PaymentService } from '../services/payment.service';
import { BraintreePayload, TransactionPayload } from '../dto/payment.dto';
import { GetAllTransactionsInputs, PaymentInput, PaymentInputsAfterAppointment } from '../dto/payment.input';
import { AppointmentPayload } from '../../appointments/dto/appointment-payload.dto';
//resolver
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

  //get all transactions

  @Mutation(()=> TransactionPayload)
  async getAllTransactions(@Args('transactionInputs') transactionInputs: GetAllTransactionsInputs):Promise<TransactionPayload> {
    return await this.paymentService.getAll(transactionInputs);
  }
}
