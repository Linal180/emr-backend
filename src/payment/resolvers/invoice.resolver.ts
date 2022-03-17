import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
//user imports
import { InvoiceService } from '../services/invoice.service';
import { CreateInvoiceInputs, CreateExternalInvoiceInputs, InvoiceInputs } from '../dto/invoice.input';
import { InvoicePayload, InvoicesPayload } from '../dto/invoice.dto';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
//resolver
@Resolver()
export class InvoiceResolver {
  constructor(private readonly invoiceService: InvoiceService) { }
  //create invoice
  @Mutation(() => InvoicePayload)
  async createInvoice(@Args('createInvoiceInputs') createInvoiceInputs: CreateInvoiceInputs): Promise<InvoicePayload> {
    return { invoice: await this.invoiceService.create(createInvoiceInputs), response: { status: 200, message: "OK" } }
  }
  //create external invoice
  @Mutation(() => InvoicePayload)
  async createExternalInvoice(@Args('createExternalInvoiceInputs') createInvoiceInputs: CreateExternalInvoiceInputs): Promise<InvoicePayload> {
    return await this.invoiceService.createExternalInvoice(createInvoiceInputs)
  }
  //get all invoices

  @UseGuards(JwtAuthGraphQLGuard)
  // @SetMetadata('roles', ['admin', 'super-admin'])
  @Query(() => InvoicesPayload)
  async getAllInvoices(@Args('invoiceInput') invoiceInput: InvoiceInputs): Promise<InvoicesPayload> {
    // @CurrentUser() user: User
    return await this.invoiceService.getInvoices(invoiceInput)
  }
}
