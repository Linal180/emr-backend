import { InternalServerErrorException } from "@nestjs/common";

import { BraintreeGateway, Environment } from "braintree";

const gateway = new BraintreeGateway({
  environment: Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_ID,
  privateKey: process.env.BRAINTREE_SECRET_ID,
});

export const braintreeACHPayment = async (inputs) => {
  try {
    const { paymentMethodNonce, customerId, price } = inputs || {};
    const data = await gateway.paymentMethod.create({
      paymentMethodNonce,
      customerId,
      options: {
        usBankAccountVerificationMethod: "network_check",
      },
    });

    const { success, message, usBankAccount } = data;
    if (success && usBankAccount) {
      const { paymentMethod } = data;
      const { verified, verifications } = usBankAccount || {};
      const { token } = paymentMethod;
      if (token && verified) {
        const verification = verifications[0] || {};
        if (verification) {
          const { status } = verification || {};
          if (status === "verified") {
            if (price) {
              const response = await gateway.transaction.sale({
                amount: price,
                paymentMethodToken: token,
                options: {
                  submitForSettlement: true,
                },
              });
              const { success, transaction } = response || {};
              const { id } = transaction;
              if (success && id) {
                return id;
              } else {
                throw new InternalServerErrorException({
                  message: "Transaction failed",
                });
              }
            } else {
              throw new InternalServerErrorException({
                message: "Price is not defined.",
              });
            }
          } else {
            throw new InternalServerErrorException({
              message: "Account is not verified.",
            });
          }
        }
      } else {
        throw new InternalServerErrorException({
          message: "Account is not verified.",
        });
      }
      return paymentMethod;
    } else {
      throw new InternalServerErrorException({ message });
    }
  } catch (error) {
    throw new InternalServerErrorException(error);
  }
};
