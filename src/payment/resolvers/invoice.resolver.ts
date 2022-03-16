import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
//user imports
import { InvoiceService } from '../services/invoice.service';
import { CreateInvoiceInputs } from '../dto/invoice.input';
import { InvoicePayload } from '../dto/invoice.dto';
import { Invoice } from '../entity/invoice.entity';
import { SetMetadata, UseGuards } from '@nestjs/common';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
import { CurrentUser } from 'src/customDecorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
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
  async createExternalInvoice(@Args('createExternalInvoiceInputs') createInvoiceInputs: CreateInvoiceInputs): Promise<InvoicePayload> {
    return await this.invoiceService.createExternalInvoice(createInvoiceInputs)
  }
  //get all invoices
  @Query(() => [Invoice])
  // @UseGuards(JwtAuthGraphQLGuard)
  // @SetMetadata('roles', ['admin', 'super-admin'])
  async getAllInvoices():Promise<Invoice[]> {
    // @CurrentUser() user: User
    return await this.invoiceService.getInvoices('8fb54bb9-640d-4f09-b671-9e63631254cf')
  }
}
