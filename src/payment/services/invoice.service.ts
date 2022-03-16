import { forwardRef, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//user imports
import { Invoice } from '../entity/invoice.entity';
import { CreateInvoiceInputs } from '../dto/invoice.input';
import { InvoicePayload } from '../dto/invoice.dto';
import { PaymentService } from './payment.service';
//service
@Injectable()
export class InvoiceService {
  constructor(@InjectRepository(Invoice) private invoiceRepo: Repository<Invoice>, @Inject(forwardRef(() => PaymentService)) private transactionService: PaymentService) { }
  //create  invoice
  async create(createInvoiceInputs: CreateInvoiceInputs): Promise<any> {
    try {
      const invoice = await this.invoiceRepo.create(createInvoiceInputs);
      const updatedInvoice = await this.invoiceRepo.save(invoice);
      return updatedInvoice;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  //create external invoice
  async createExternalInvoice(createInvoiceInputs: CreateInvoiceInputs): Promise<InvoicePayload> {
    try {
      const invoice = await this.invoiceRepo.create(createInvoiceInputs);
      const transaction = await this.transactionService.getPaymentTransactionByBraintreeTransactionId(createInvoiceInputs.paymentTransactionId);
      invoice.transction = transaction;
      const updatedInvoice = await this.invoiceRepo.save(invoice);
      return { invoice: updatedInvoice, response: { status: 200, message: "OK" } };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  //get all invoices
  async getInvoices(id: string): Promise<Invoice[]> {
    try {
      return await this.invoiceRepo.find({
       
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
