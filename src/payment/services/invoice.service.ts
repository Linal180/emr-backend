import { forwardRef, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//user imports
import { Invoice } from '../entity/invoice.entity';
import { CreateInvoiceInputs, CreateExternalInvoiceInputs, InvoiceInputs, InvoiceStatusInputs } from '../dto/invoice.input';
import { InvoicesPayload } from '../dto/invoice.dto';
import { PaymentService } from './payment.service';
import { UtilsService } from 'src/util/utils.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { AppointmentService } from 'src/appointments/services/appointment.service'
//service
@Injectable()
export class InvoiceService {
  constructor(@InjectRepository(Invoice) private invoiceRepo: Repository<Invoice>, @Inject(forwardRef(() => PaymentService)) private transactionService: PaymentService, private utilService: UtilsService, private paginationService: PaginationService,@Inject(forwardRef(() => AppointmentService)) private appointmentService: AppointmentService) { }
  //create  invoice
  async create(createInvoiceInputs: CreateInvoiceInputs): Promise<Invoice> {
    try {
      const invoice = this.invoiceRepo.create(createInvoiceInputs);
      if (createInvoiceInputs.paymentTransactionId) {
        const transaction = await this.transactionService.getPaymentTransactionByBraintreeTransactionId(createInvoiceInputs.paymentTransactionId);
        invoice.transction = transaction;
      }
      const appointment = await this.appointmentService.getAppointment(createInvoiceInputs.appointmentId)
      invoice.appointment = appointment.appointment;
      const invoiceNo = await this.utilService.generateInvoiceNo();
      invoice.invoiceNo = invoiceNo;
      const updatedInvoice = await this.invoiceRepo.save(invoice);
      return updatedInvoice;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  //create external invoice
  async createExternalInvoice(createInvoiceInputs: CreateExternalInvoiceInputs): Promise<Invoice> {
    try {
      const invoice = this.invoiceRepo.create(createInvoiceInputs);
      const transaction = await this.transactionService.getPaymentTransactionByBraintreeTransactionId(createInvoiceInputs.paymentTransactionId);
      const invoiceNo = await this.utilService.generateInvoiceNo();
      invoice.invoiceNo = invoiceNo;
      invoice.transction = transaction;
      return await this.invoiceRepo.save(invoice);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  //get all invoices
  async getInvoices(invoiceInput: InvoiceInputs): Promise<InvoicesPayload> {
    try {
      const paginationResponse = await this.paginationService.willPaginate<Invoice>(this.invoiceRepo, invoiceInput)
      return {
        pagination: {
          ...paginationResponse
        },
        invoices: paginationResponse.data,
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  //update invoice status

  async updateStatus(invoiceStatusInputs: InvoiceStatusInputs): Promise<Invoice> {
    try {
      return await this.utilService.updateEntityManager(Invoice, invoiceStatusInputs.id, invoiceStatusInputs, this.invoiceRepo)
    } catch (error) {
      throw new InternalServerErrorException(error)

    }

  }

  //get all invoices against facility
  async getFacilityInvoices(invoiceInput: InvoiceInputs): Promise<InvoicesPayload> {
    try {
      const paginationResponse = await this.paginationService.willPaginate<Invoice>(this.invoiceRepo, invoiceInput)
      return {
        pagination: {
          ...paginationResponse
        },
        invoices: paginationResponse.data,
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  //get invoice by invoice no
  async getInvoiceByInvoiceNo(id: string): Promise<Invoice> {
    try {
      return await this.invoiceRepo.findOneOrFail({ where: { invoiceNo: id } })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
