import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePracticeItemInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  phone: string;

  @Field({ nullable: true })
  fax: string;

  @Field({ nullable: true })
  ein: string;

  @Field({ nullable: true })
  upin: string;

  @Field({ nullable: true })
  medicare: string;

  @Field({ nullable: true })
  medicaid: string;

  @Field({ nullable: true })
  champus: string;

  @Field({ nullable: true })
  npi: string;

  @Field({ nullable: true })
  taxId: string;

  @Field({ nullable: true })
  taxonomyCodeId: string;

  @Field(() => Boolean, { nullable: true, defaultValue: true })
  active?: boolean;
}