import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//user imports
import { Invoice } from '../entity/invoice.entity';
import { CreateInvoiceInputs } from '../dto/invoice.input';
import { InvoicePayload } from '../dto/invoice.dto';
//service
@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepo: Repository<Invoice>
  ) { }

  //create invoice

  async create( createInvoiceInputs: CreateInvoiceInputs): Promise<any> {
    try {
      const invoice = await this.invoiceRepo.create(createInvoiceInputs);
      const updatedInvoice = await this.invoiceRepo.save(invoice);
      return updatedInvoice;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
