import { Field, Int, ObjectType } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { Insurance } from '../entities/insurance.entity';

@ObjectType()
export class Response{
   @Field(()=>Int,{nullable:true})
   status:number

   @Field({nullable:true})
   message:string
}

@ObjectType()
export class InsurancesPayload{
  @Field(type => [Insurance])
  insurances: Insurance[];

  @Field(type => PaginationPayload, { nullable: true })
  pagination?: PaginationPayload

  @Field(type=>Response,{nullable:true})
  response?:Response
}
