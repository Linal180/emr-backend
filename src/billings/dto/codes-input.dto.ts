import { Field, InputType } from '@nestjs/graphql';
import { CodeType } from '../entities/code.entity';

@InputType()
export default class CodesInput {
  @Field({ nullable: true })
  code?: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  price?: string

  @Field(type => CodeType, { nullable: true })
  codeType?: CodeType
}