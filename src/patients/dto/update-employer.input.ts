import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import { CreateEmployerInput } from './create-employer.input';

@InputType()
export class UpdateEmployerItemInput extends PartialType(CreateEmployerInput) {
  @Field({nullable: true})
  id: string;
}

@InputType()
export class GetEmployer extends PickType(UpdateEmployerItemInput, ['id'] as const) { }

@InputType()
export class RemoveEmployer extends PickType(UpdateEmployerItemInput, ['id'] as const) { }
