import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';

@InputType()
export class RoleItemInput {
  @Field({ nullable: false })
  role: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: false })
  customRole?: boolean;
}

@InputType()
export default class RoleInput {

  @Field({nullable: true})
  role?: string

  @Field({ nullable: true })
  roleName?: string
  
  @Field({ nullable: true })
  customRole?: boolean;

  @Field(type => PaginationInput)
  paginationOptions: PaginationInput
}

@InputType()
export class UpdateRoleItemInput extends PartialType(RoleItemInput) {
  @Field({nullable: true})
  id: string;
}

@InputType()
export class GetRole extends PickType(UpdateRoleItemInput, ['id'] as const) { }


@InputType()
export class RemoveRole extends PickType(UpdateRoleItemInput, ['id'] as const) { }


