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

  @Field({ nullable: true })
  diagPointer: string;
  
  @Field({ nullable: true })
  m1: string;

  @Field({ nullable: true })
  m2: string;

  @Field({ nullable: true })
  m3: string;

  @Field({ nullable: true })
  m4: string;
  
  @Field({ nullable: true })
  unit: string;

  @Field(type => CodeType, { nullable: true })
  codeType?: CodeType
}