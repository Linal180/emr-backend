import { Field, ObjectType } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';
import { ResponsePayload } from './response-payload.dto';

@ObjectType()
export class EmergencyAccessUserPayload {
  @Field(()=>[User],{ nullable: true })
  emergencyAccessUsers?: User[]

  @Field({ nullable: true })
  pagination?: PaginationPayload

  @Field({ nullable: true })
  response?: ResponsePayload
}
