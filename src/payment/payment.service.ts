import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BraintreeGateway, Environment } from 'braintree';
import { AppointmentService } from '../appointments/services/appointment.service';
import { Repository } from 'typeorm';
import { BraintreePayload } from './dto/payment.dto';
import { CreateTransactionInputs, PaymentInput } from './dto/payment.input';
import { Transactions } from './entity/payment.entity';

@Injectable()
export class PaymentService {
  private gateway = new BraintreeGateway({
    environment: Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_ID,
    privateKey: process.env.BRAINTREE_SECRET_ID,
  });

  constructor(
    @InjectRepository(Transactions)
    private transactionRepo: Repository<Transactions>,
    private appointmentService: AppointmentService
  ) {}

  async getToken(): Promise<BraintreePayload> {
    try {
      return await this.gateway.clientToken.generate({});
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async checkCard() {
    const data = await this.gateway.paymentMethod.create({
      paymentMethodNonce: '', // must
      customerId: '', // must
      cardholderName: '',
      cvv: '', //must
      billingAddress: {
        firstName: '',
        lastName: '',
        postalCode: '',
      },
      options: {
        verifyCard: process.env.NODE_ENV === 'production' ? true : false,
      },

      expirationDate: '', // must
      number: '', //must
    });

    return data;
  }

  async charge(req: PaymentInput) {
    const { amount, clientIntent } = req;
    try {
      const brainTrans = await this.gateway.transaction.sale({
        amount: amount,
        paymentMethodNonce: clientIntent,
      });

     

      if (brainTrans?.success) {
        const appointment = await this.appointmentService.createAppointment({
          ...req,
          paymentStatus: 'paid',
        });

        if (appointment?.id) {
          const data = {
            transactionId: brainTrans?.transaction?.id,
            doctorId: appointment?.providerId,
            facilityId: appointment?.facilityId,
            patientId: appointment?.patientId,
            appointmentId: appointment?.id,
          };
          const transaction = this.create(data);

          return {
            message: 'Appointment created Successfully',
          };
        } else {
          const refunded = await this.refund(brainTrans?.transaction?.id);
          if (refunded?.success) {
            throw new Error(
              'We are not able to create appointment aganist you request.Your amount is refunded. You will receive shortly or according to you bank policy.'
            );
          }
        }
      }
      else{
        throw new Error(brainTrans?.message);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(data: CreateTransactionInputs) {
    try {
      return await this.transactionRepo.create(data);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async refund(id: string) {
    try {
      return await this.gateway.transaction.refund(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getTransaction(id: string) {
    return await this.gateway.transaction.find(id);
  }
}
