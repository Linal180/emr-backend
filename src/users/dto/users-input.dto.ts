import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';
import { UserRole } from '../entities/role.entity';
import { UserStatus } from '../entities/user.entity';


@InputType()
export default class UsersInput {
  @Field(type => UserStatus, { nullable: true })
  status?: UserStatus

  @Field(type => UserRole, { nullable: true })
  role?: UserRole

  @Field(type => PaginationInput)
  paginationOptions: PaginationInput
}