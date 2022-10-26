import { Field, ObjectType } from '@nestjs/graphql';
import { ResponsePayload } from 'src/customDecorators/response-payload.dto';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { Macros } from '../entities/macro.entity';

@ObjectType()
export class MacrosPayload extends ResponsePayload {
  @Field(() => [Macros])
  macros: Macros[];

  @Field(() => PaginationPayload, { nullable: true })
  pagination?: PaginationPayload
}

@ObjectType()
export class MacroPayload extends ResponsePayload {
  @Field(() => Macros, { nullable: true })
  macro: Macros;
}
