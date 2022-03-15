import { Args, Mutation, Resolver } from '@nestjs/graphql';
//user imports
import { InvoiceService } from '../services/invoice.service';
import { CreateInvoiceInputs } from '../dto/invoice.input';
import { InvoicePayload } from '../dto/invoice.dto';
//resolver
@Resolver()
export class InvoiceResolver {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Mutation(()=> InvoicePayload)
  async createInvoice(@Args('createInvoiceInputs') createInvoiceInputs: CreateInvoiceInputs):Promise<any>{
    return { invoice:await this.invoiceService.create(createInvoiceInputs),response: { status: 200, message: "OK" }}
  }
}
