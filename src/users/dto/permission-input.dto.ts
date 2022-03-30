import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';

@InputType()
export class PermissionItemInput {
  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  moduleType: string;

  @Field({ nullable: true })
  roleId?: string;
}

@InputType()
export default class PermissionInput {
    @Field(type => PaginationInput)
    paginationOptions: PaginationInput
}

@InputType()
export class UpdatePermissionItemInput extends PartialType(PermissionItemInput){
  @Field({nullable: true})
  id: string;
}

@InputType()
export class GetPermission extends PickType(UpdatePermissionItemInput, ['id'] as const) { }


@InputType()
export class RemovePermission extends PickType(UpdatePermissionItemInput, ['id'] as const) { }


