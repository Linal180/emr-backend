import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PaymentService } from './payment.service';
import { BraintreeChargePayload, BraintreePayload } from './dto/payment.dto';
import { PaymentInput } from './dto/payment.input';

@Resolver()
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Query(() => BraintreePayload)
  async getToken(): Promise<BraintreePayload> {
    return await this.paymentService.getToken();
  }

  @Mutation(() => BraintreeChargePayload)
  async chargePayment(@Args('paymentInput') paymentInput: PaymentInput): Promise<any> {
    return await this.paymentService.charge(paymentInput);
  }
}
