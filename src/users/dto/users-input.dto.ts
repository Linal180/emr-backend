import { Field, InputType } from '@nestjs/graphql';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';
import { UserStatus } from '../entities/user.entity';


@InputType()
export default class UsersInput {
  @Field(type => UserStatus, { nullable: true })
  status?: UserStatus

  @Field( { nullable: true })
  role?: string

  @Field(type => PaginationInput)
  paginationOptions: PaginationInput
}