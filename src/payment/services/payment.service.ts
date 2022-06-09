import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BraintreeGateway, Environment } from 'braintree';
//user imports
import { AppointmentService } from '../../appointments/services/appointment.service';
import { BraintreePayload, TransactionsPayload } from '../dto/payment.dto';
import {
  CreateTransactionInputs,
  PaymentInput,
  PaymentInputsAfterAppointment,
  UpdatePaymentStatus,
  GetAllTransactionsInputs,
  ACHPaymentInputs,
} from '../dto/payment.input';
import { Transactions, TRANSACTIONSTATUS } from '../entity/payment.entity';
import {
  Appointment,
  BillingStatus,
  AppointmentStatus
} from '../../appointments/entities/appointment.entity';
import { UtilsService } from '../../util/utils.service';
import { InvoiceService } from './invoice.service';
import { BILLING_TYPE, STATUS } from '../entity/invoice.entity';
import { PaginationService } from 'src/pagination/pagination.service';
import { braintreeACHPayment } from './braintree.service'

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

  /**
   * Gets token
   * @returns token 
   */
  async getToken(): Promise<BraintreePayload> {
    try {
      return await this.gateway.clientToken.generate({});
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Checks card
   * @returns  
   */
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

  /**
   * Charges after
   * @param req 
   * @returns after 
   */
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

  /**
   * Charges before
   * @param req 
   * @returns before 
   */
  async chargeBefore(req: PaymentInput): Promise<Transactions> {
    const {
      clientIntent,
      serviceId,
      appointmentId,
      providerId,
      facilityId,
      patientId
    } = req;
    try {
      const { price } = await this.appointmentService.getAmount(serviceId);
      if (clientIntent) {
        const brainTrans = await this.gateway.transaction.sale({ amount: price, paymentMethodNonce: clientIntent });
        if (brainTrans?.success) {
          if (appointmentId) {
            await this.appointmentService.updateAppointmentBillingStatus({ id: appointmentId, billingStatus: BillingStatus.PAID });
            await this.appointmentService.updateAppointmentStatus({ id: appointmentId, status: AppointmentStatus.DISCHARGED });
            const data = { transactionId: brainTrans?.transaction?.id, doctorId: providerId, facilityId, patientId, appointmentId, status: TRANSACTIONSTATUS.PAID };
            return await this.create(data);
          } else {
            const refunded = await this.refund(brainTrans?.transaction?.id, appointmentId);
            if (refunded?.success) {
              throw new Error(
                'We are not able to create appointment aganist you request.Your amount is refunded. You will receive shortly or according to you bank policy.'
              );
            }
          }
        } else {
          throw new Error(brainTrans?.message);
        }
      }
      else {
        await this.appointmentService.updateAppointmentBillingStatus({ id: appointmentId, billingStatus: BillingStatus.PAID });
        await this.appointmentService.updateAppointmentStatus({ id: appointmentId, status: AppointmentStatus.DISCHARGED });
        const data = { transactionId: null, doctorId: providerId, facilityId, patientId, appointmentId, status: TRANSACTIONSTATUS.PAID };
        return await this.create(data);
      }


    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Paypal checkout
   */
  async paypalCheckout() {
    this.gateway.transaction.sale({
      amount: '',
      paymentMethodNonce: '',
      orderId: '',
    });
  }

  /**
   * Creates payment service
   * @param data 
   * @returns  
   */
  async create(data: CreateTransactionInputs) {
    try {
      const transaction = this.transactionRepo.create(data);
      const saved = await this.transactionRepo.save(transaction);
      return saved;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Refunds payment service
   * @param transactionId 
   * @param id 
   * @returns  
   */
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

  /**
   * Gets transaction
   * @param id 
   * @returns  
   */
  async getTransaction(id: string) {
    return await this.gateway.transaction.find(id);
  }

  /**
   * Gets payment transaction by braintree transaction id
   * @param id 
   * @returns  
   */
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

  /**
   * Gets transaction by appointment id
   * @param id 
   * @returns  
   */
  async getTransactionByAppointmentId(id: string) {
    return await this.transactionRepo.findOne({
      where: {
        appointmentId: id,
      },
    });
  }

  /**
   * Updates payment status
   * @param updateAppointmentPayStatus 
   * @returns  
   */
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

  /**
   * Gets all
   * @param transactionInputs 
   * @returns all 
   */
  async getAll(transactionInputs: GetAllTransactionsInputs): Promise<TransactionsPayload> {
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

  /**
   * Creates customer
   * @param input 
   * @returns  
   */
  async createCustomer(input: ACHPaymentInputs) {
    try {
      const { firstName, lastName, company, deviceData } = input || {}
      const response = await this.gateway.customer.create({ firstName, lastName, company, deviceData });
      const { success, customer, message } = response;
      if (success) {
        const { id } = customer;
        return id
      }
      else {
        throw new InternalServerErrorException(message)
      }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  /**
   * Ach payment
   * @param achPaymentInputs 
   * @returns payment 
   */
  async achPayment(achPaymentInputs: ACHPaymentInputs): Promise<Transactions> {
    try {
      const { token: paymentMethodNonce, price, appointmentId, doctorId, facilityId, patientId } = achPaymentInputs || {}
      const customerId = await this.createCustomer(achPaymentInputs);
      const trans = await braintreeACHPayment({ paymentMethodNonce, customerId, price });
      if (trans) {
        const transactionId = trans as string
        await this.appointmentService.updateAppointmentBillingStatus({ id: appointmentId, billingStatus: BillingStatus.PAID });
        const transactionInputs = { transactionId, patientId, doctorId, facilityId, appointmentId, status: TRANSACTIONSTATUS.PAID }
        const transaction = await this.create(transactionInputs)
        return transaction
      }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
