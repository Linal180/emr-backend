import { Field, InputType } from '@nestjs/graphql';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';
import { UserStatus } from '../entities/user.entity';


@InputType()
export default class UsersInput {
  @Field(() => UserStatus, { nullable: true })
  status?: UserStatus

  @Field({ nullable: true })
  role?: string

  @Field(() => [String], { nullable: true })
  roles?: string[]

  @Field({ nullable: true })
  facilityId?: string;

  @Field({ nullable: true })
  searchString?: string;

  @Field(() => PaginationInput)
  paginationOptions: PaginationInput
}