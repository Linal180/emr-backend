import { InputType, Field } from '@nestjs/graphql';
import { ContactType, RelationshipType } from '../entities/contact.entity';

@InputType()
export class CreateContactInput {


  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  middleName?: string;

  @Field({ nullable: true })
  email?: string;

  @Field(type => ContactType, { nullable: true })
  contactType?: ContactType

  @Field(type => RelationshipType, { nullable: true })
  relationship?: RelationshipType

  @Field({ nullable: true })
  pager?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  suffix?: string;

  @Field({ nullable: true })
  mobile?: string;

  @Field({ nullable: true })
  fax?: string;

  @Field({ nullable: true })
  ssn?: string;

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
  doctorId?: string;

  @Field({ nullable: true })
  facilityId: string;

  @Field({ nullable: true })
  patientId: string;


  @Field({ nullable: true })
  employerName?: string;
}