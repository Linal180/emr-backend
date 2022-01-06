import { InputType, Field } from '@nestjs/graphql';
import { Facility } from 'src/facilities/entities/facility.entity';

@InputType()
export class CreateContactInput {

  @Field({ nullable: false })
  email?: string;

  @Field({ nullable: false })
  pager?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  mobile?: string;

  @Field({ nullable: true })
  fax?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  address2?: string;

  @Field({ nullable: true })
  zipCode?: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  state?: string;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  userId?: string;

  @Field({ nullable: true })
  facility: Facility;
}