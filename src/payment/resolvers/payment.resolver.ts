import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
//user imports
import { PaymentService } from '../services/payment.service';
import { BraintreePayload, TransactionPayload, TransactionsPayload } from '../dto/payment.dto';
import { ACHPaymentInputs, GetAllTransactionsInputs, PaymentInput, PaymentInputsAfterAppointment } from '../dto/payment.input';
import { AppointmentPayload } from '../../appointments/dto/appointment-payload.dto';
//resolver
@Resolver()
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) { }

  @Query(() => BraintreePayload)
  async getToken(): Promise<BraintreePayload> {
    return await this.paymentService.getToken();
  }

  @Query(() => TransactionPayload)
  async getTransaction(@Args('id') id: string): Promise<TransactionPayload> {
    return { transaction: await this.paymentService.getTransaction(id),
    }
  }

  @Mutation(() => TransactionPayload)
  async chargePayment(@Args('paymentInput') paymentInput: PaymentInput): Promise<TransactionPayload> {
    return {
      transaction: await this.paymentService.chargeBefore(paymentInput),
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

  @Mutation(() => TransactionsPayload)
  async getAllTransactions(@Args('transactionInputs') transactionInputs: GetAllTransactionsInputs): Promise<TransactionsPayload> {
    return await this.paymentService.getAll(transactionInputs);
  }

  @Mutation(() => TransactionPayload)
  async achPayment(@Args('achPaymentInputs') achPaymentInputs: ACHPaymentInputs): Promise<TransactionPayload> {
    return {
      transaction: await this.paymentService.achPayment(achPaymentInputs),
      response: {
        message: "Appointment paid successfully.",
        status: 200
      }
    }
  }
}
