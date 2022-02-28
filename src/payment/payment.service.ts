import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BraintreeGateway, Environment } from 'braintree';
import { BraintreePayload } from './dto/payment.dto';


@Injectable()
export class PaymentService {
    
    
    private gateway = new BraintreeGateway({
        environment: Environment.Sandbox,
        merchantId: process.env.BRAINTREE_MERCHANT_ID,
        publicKey: process.env.BRAINTREE_PUBLIC_ID,
        privateKey: process.env.BRAINTREE_SECRET_ID
      });
    

async getToken():Promise<BraintreePayload>{
    try {
        return await this.gateway.clientToken.generate({});
    } catch (error) {
        throw new InternalServerErrorException(error)
        
        
    }
}

async charge(req){
    const { amount,clientIntent} = req;
    try {
        return await this.gateway.transaction.sale({
            amount: amount,
            paymentMethodNonce: clientIntent,

        });
    } catch (error) {
        throw new InternalServerErrorException(error)
        
        
    }
}

}
