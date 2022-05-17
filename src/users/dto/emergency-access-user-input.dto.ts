import { Field, InputType } from '@nestjs/graphql';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';
import { Role } from '../entities/role.entity';
import { ResponsePayload } from './response-payload.dto';

@InputType()
export class EmergencyAccessUserInput{
  @Field({ nullable: true })
  facilityId?: string

  @Field({ nullable: true })
  practiceId?: string

  @Field({ nullable: true })
  email?: string

  @Field(type => PaginationInput, { nullable: true })
  paginationInput: PaginationInput
}
