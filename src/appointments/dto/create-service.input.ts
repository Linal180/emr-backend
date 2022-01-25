import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateServiceInput {

  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  duration: string;

  @Field({ nullable: false })
  price: string;

  @Field({ nullable: false })
  facilityId: string;

  @Field({ nullable: true })
  isActive: boolean;


}