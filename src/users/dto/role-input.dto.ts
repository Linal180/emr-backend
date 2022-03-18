import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';
import { Role } from '../entities/role.entity';

@InputType()
export class RoleItemInput {
  @Field({ nullable: false })
  role: string;
}

@InputType()
export default class RoleInput {
    @Field(type => PaginationInput)
    paginationOptions: PaginationInput
}

@InputType()
export class UpdateRoleItemInput extends PartialType(RoleItemInput){
  @Field({nullable: true})
  id: string;
}

@InputType()
export class GetRole extends PickType(UpdateRoleItemInput, ['id'] as const) { }


@InputType()
export class RemoveRole extends PickType(UpdateRoleItemInput, ['id'] as const) { }


