import { Resolver,Query, Mutation } from '@nestjs/graphql';
import { PaymentService } from './payment.service';
import { BraintreePayload } from './dto/payment.dto';

@Resolver()
export class PaymentResolver {

    constructor(private readonly paymentService: PaymentService){}

    @Query(()=> BraintreePayload)
    async getToken():Promise<BraintreePayload>{
       return await this.paymentService.getToken()
    }

    @Mutation()
    async chargePayment(){
    
    }
}
