import { Field, InputType } from '@nestjs/graphql';
import { Json } from 'aws-sdk/clients/robomaker';

@InputType()
export class CreateFormInput {

  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  type: string;

  @Field({ nullable: true })
  facilityId: string;

  @Field({ nullable: false })
  layout: Json;

  @Field({ nullable: true })
  isSystemForm: boolean;

}