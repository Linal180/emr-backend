import { forwardRef, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BraintreeGateway, Environment } from 'braintree';
import { AppointmentService } from '../appointments/services/appointment.service';
import { Repository } from 'typeorm';
import {  BraintreePayload } from './dto/payment.dto';
import {
  CreateTransactionInputs,
  PaymentInput,
  PaymentInputsAfterAppointment,
} from './dto/payment.input';
import { Transactions } from './entity/payment.entity';
import { Appointment, BillingStatus } from '../appointments/entities/appointment.entity';

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
    @Inject(forwardRef(() => AppointmentService))
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

  async chargeAfter(req: PaymentInputsAfterAppointment): Promise<Appointment> {
    const { clientIntent, price, appointmentId } = req;
    try {
      const brainTrans = await this.gateway.transaction.sale({
        amount: price,
        paymentMethodNonce: clientIntent,
      });
      if (brainTrans?.success) {
        console.log('brain transaction>>>', brainTrans);
        const updatedAppointment =
          await this.appointmentService.updateAppointmentBillingStatus({
            id: appointmentId,
            billingStatus: BillingStatus.PAID,
          });
        console.log('updated appointment>>>', updatedAppointment);

        const data = {
          transactionId: brainTrans?.transaction?.id,
          doctorId: req?.providerId,
          facilityId: req?.facilityId,
          patientId: req?.patientId,
          appointmentId: req?.appointmentId,
        };
        const trans = await this.create(data);
        console.log('transaction >>>', trans);
        return updatedAppointment;
      } else {
        throw new InternalServerErrorException({message: brainTrans?.message});
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async chargeBefore(req: PaymentInput): Promise<Appointment> {
    const {
      clientIntent,
      createExternalAppointmentItemInput: { serviceId },
    } = req;
    try {
      const { price } = await this.appointmentService.getAmount(serviceId);
      const brainTrans = await this.gateway.transaction.sale({
        amount: price,
        paymentMethodNonce: clientIntent,
      });

      if (brainTrans?.success) {
        const appointment =
          await this.appointmentService.createExternalAppointmentInput({
            createExternalAppointmentItemInput: {
              ...req.createExternalAppointmentItemInput,
              billingStatus: BillingStatus.PAID,
            },
            ...req,
          });

        if (appointment?.id) {
          const data = {
            transactionId: brainTrans?.transaction?.id,
            doctorId: appointment?.providerId,
            facilityId: appointment?.facilityId,
            patientId: appointment?.patientId,
            appointmentId: appointment?.id,
          };
          await this.create(data);

          return appointment;
        } else {
          const refunded = await this.refund(brainTrans?.transaction?.id);
          if (refunded?.success) {
            throw new Error(
              'We are not able to create appointment aganist you request.Your amount is refunded. You will receive shortly or according to you bank policy.'
            );
          }
        }
      } else {
        throw new Error(brainTrans?.message);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async paypalCheckout() {
    this.gateway.transaction.sale({
      amount: '',
      paymentMethodNonce: '',
      orderId: '',
    });
  }

  async create(data: CreateTransactionInputs) {
    try {
      const transaction = await this.transactionRepo.create(data);
      const saved = await this.transactionRepo.save(transaction);
      return saved;
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

  async getTransactionByAppointmentId(id: string) {
    return await this.transactionRepo.findOne({
      where: {
        appointmentId: id
      }
    });
  }
}
