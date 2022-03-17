import { forwardRef, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//user imports
import { Invoice } from '../entity/invoice.entity';
import { CreateInvoiceInputs ,CreateExternalInvoiceInputs, InvoiceInputs} from '../dto/invoice.input';
import { InvoicePayload,InvoicesPayload } from '../dto/invoice.dto';
import { PaymentService } from './payment.service';
import { UtilsService } from 'src/util/utils.service';
import { PaginationService } from 'src/pagination/pagination.service';
//service
@Injectable()
export class InvoiceService {
  constructor(@InjectRepository(Invoice) private invoiceRepo: Repository<Invoice>, @Inject(forwardRef(() => PaymentService)) private transactionService: PaymentService, private utilService: UtilsService, private paginationService: PaginationService) { }
  //create  invoice
  async create(createInvoiceInputs: CreateInvoiceInputs): Promise<Invoice> {
    try {
      const invoice = await this.invoiceRepo.create(createInvoiceInputs);
      const transaction = await this.transactionService.getPaymentTransactionByBraintreeTransactionId(createInvoiceInputs.paymentTransactionId);
      invoice.transction = transaction;
      const invoiceNo = await this.utilService.generateInvoiceNo();
      invoice.invoiceNo = invoiceNo;
      const updatedInvoice = await this.invoiceRepo.save(invoice);
      return updatedInvoice;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  //create external invoice
  async createExternalInvoice(createInvoiceInputs: CreateExternalInvoiceInputs): Promise<InvoicePayload> {
    try {
      const invoice = await this.invoiceRepo.create(createInvoiceInputs);
      const transaction = await this.transactionService.getPaymentTransactionByBraintreeTransactionId(createInvoiceInputs.paymentTransactionId);
      const invoiceNo = await this.utilService.generateInvoiceNo();
      invoice.invoiceNo = invoiceNo;
      invoice.transction = transaction;
      const updatedInvoice = await this.invoiceRepo.save(invoice);
      return { invoice: updatedInvoice, response: { status: 200, message: "OK" } };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  //get all invoices
  async getInvoices(invoiceInput:InvoiceInputs): Promise<InvoicesPayload> {
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

  //get all invoices against facility

  async getFacilityInvoices(invoiceInput:InvoiceInputs):Promise<InvoicesPayload> {
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
}
