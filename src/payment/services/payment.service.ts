import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BraintreeGateway, Environment } from 'braintree';
import { AppointmentService } from '../../appointments/services/appointment.service';
import { Repository } from 'typeorm';
import { BraintreePayload, TransactionPayload } from '../dto/payment.dto';
import {
  CreateTransactionInputs,
  PaymentInput,
  PaymentInputsAfterAppointment,
  UpdatePaymentStatus,
  GetAllTransactionsInputs
} from '../dto/payment.input';
import { Transactions, TRANSACTIONSTATUS } from '../entity/payment.entity';
import {
  Appointment,
  BillingStatus,
} from '../../appointments/entities/appointment.entity';
import { UtilsService } from '../../util/utils.service';
import { InvoiceService } from './invoice.service';
import { BILLING_TYPE, STATUS } from '../entity/invoice.entity';
import { PaginationService } from 'src/pagination/pagination.service';

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
    private appointmentService: AppointmentService,
    private readonly utilsService: UtilsService,
    @Inject(forwardRef(() => InvoiceService))
    private readonly invoiceService: InvoiceService,
    private readonly paginationService: PaginationService
  ) { }

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

        const updatedAppointment =
          await this.appointmentService.updateAppointmentBillingStatus({
            id: appointmentId,
            billingStatus: BillingStatus.PAID,
          });
        const data = {
          transactionId: brainTrans?.transaction?.id,
          doctorId: req?.providerId,
          facilityId: req?.facilityId,
          patientId: req?.patientId,
          appointmentId: req?.appointmentId,
          status: TRANSACTIONSTATUS.PAID,
        };
        const trans = await this.create(data);

        const createInvoiceInputs = {
          paymentTransactionId: trans.transactionId,
          billingType: BILLING_TYPE.SELF_PAY,
          paymentMethod: brainTrans.transaction.creditCard.cardType ?? 'PayPal',
          status: STATUS.PAID,
          amount: brainTrans.transaction.amount,
          facilityId: req?.facilityId,
        }
        await this.invoiceService.createExternalInvoice(createInvoiceInputs)
        return updatedAppointment;
      } else {
        throw new InternalServerErrorException({
          message: brainTrans?.message,
        });
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
            status: TRANSACTIONSTATUS.PAID,
          };
          await this.create(data);

          return appointment;
        } else {
          const refunded = await this.refund(brainTrans?.transaction?.id, appointment.id);
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

  async refund(transactionId: string, id: string) {
    try {
      const refund = await this.gateway.transaction.void(transactionId);
      if (refund?.success) {
        this.updatePaymentStatus({
          transactionId: id,
          status: TRANSACTIONSTATUS.REFUND,
        });
      } else {
        throw new Error('Amount is not refunded');
      }
      return refund;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getTransaction(id: string) {
    return await this.gateway.transaction.find(id);
  }

  async getPaymentTransactionByBraintreeTransactionId(id: string) {
    try {
      return await this.transactionRepo.findOneOrFail({
        where: {
          transactionId: id
        }
      })
    } catch (error) {
      throw new Error(error);

    }
  }

  async getTransactionByAppointmentId(id: string) {
    return await this.transactionRepo.findOne({
      where: {
        appointmentId: id,
      },
    });
  }

  async updatePaymentStatus(updateAppointmentPayStatus: UpdatePaymentStatus) {
    try {
      return await this.utilsService.updateEntityManager(
        Transactions,
        updateAppointmentPayStatus.transactionId,
        updateAppointmentPayStatus,
        this.transactionRepo
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  //get all transactions
  async getAll(transactionInputs: GetAllTransactionsInputs): Promise<TransactionPayload> {
    try {
      const paginationResponse = await this.paginationService.willPaginate<Transactions>(this.transactionRepo, transactionInputs)
      return {
        pagination: {
          ...paginationResponse
        },
        transactions: paginationResponse.data,
      }
    } catch (error) {
      throw new Error(error);
    }
  }

}
