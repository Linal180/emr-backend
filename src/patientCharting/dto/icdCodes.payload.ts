import { Field, ObjectType } from "@nestjs/graphql";
import { ResponsePayload } from "src/customDecorators/response-payload.dto";
import PaginationPayload from "src/pagination/dto/pagination-payload.dto";
import { ICDCodes } from "../entities/icdcodes.entity";


@ObjectType()
export class FindAllIcdCodesPayload extends ResponsePayload {
  @Field(() => [ICDCodes], { nullable: 'itemsAndList' })
  icdCodes: ICDCodes[];

  @Field(() => PaginationPayload, { nullable: true })
  pagination?: PaginationPayload
}

@ObjectType()
export class IcdCodePayload extends ResponsePayload {

  @Field(() => ICDCodes, { nullable: true })
  icdCode: ICDCodes
}