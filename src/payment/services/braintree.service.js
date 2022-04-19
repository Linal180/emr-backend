import { InternalServerErrorException } from '@nestjs/common';

import braintree, { BraintreeGateway, Environment } from 'braintree';

const gateway = new BraintreeGateway({
  environment: Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_ID,
  privateKey: process.env.BRAINTREE_SECRET_ID,
});

export const braintreeACHPayment = async (inputs) => {
  try {
    const data = await gateway.paymentMethod.create({
      ...inputs,
      options:{
        usBankAccountVerificationMethod: braintree.UsBankAccountVerification.VerificationMethod.NetworkCheck  
      }
    });
    const { success, message, usBankAccount } = data;
    console.log('data => ', data);
    if (success && usBankAccount) {
      const { paymentMethod } = data;
      const { verified } = usBankAccount || {};
      const { token } = paymentMethod;
      console.log('verified =>', verified);
      if (token && verified) {
        const trans = await gateway.transaction.sale({
          amount: '10.00',
          paymentMethodToken: token,
          options: {
            submitForSettlement: true,
          },
        });
        console.log('updatedToken', trans);
      }
      else {
        throw new InternalServerErrorException({ message: "Account is not verified." });
      }
      return paymentMethod;
    } else {
      throw new InternalServerErrorException({ message });
    }
  } catch (error) {
    throw new InternalServerErrorException(error);
  }
};
