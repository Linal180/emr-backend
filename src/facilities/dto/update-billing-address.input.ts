import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import { CreateBillingAddressInput } from 'src/providers/dto/create-billing-address.input';

@InputType()
export class UpdateBillingAddressInput extends PartialType(CreateBillingAddressInput) {
  @Field({nullable: true})
  id?: string;
}

@InputType()
export class GetBillingAddress extends PickType(UpdateBillingAddressInput, ['id'] as const) { }

@InputType()
export class RemoveBillingAddress extends PickType(UpdateBillingAddressInput, ['id'] as const) { }
