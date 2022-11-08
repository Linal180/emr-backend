import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class RolePermissionItemInput {
  @Field({ nullable: false })
  roleId: string;

  @Field(() => [String], { nullable: true })
  permissionsId?: string[];
}
@InputType()
export class UpdateRolePermissionItemInput extends PartialType(RolePermissionItemInput) {

  @Field({ nullable: true })
  id: string;
}

@InputType()
export class CreateRolePermissionInput {
  
  @Field({ nullable: false })
  permissionId: string;

  @Field({ nullable: false })
  roleId: string;

}