import { Field, InputType, PartialType } from '@nestjs/graphql';
import CreateLabTestItemInput from './create-lab-test-Item-input.dto';
import CreateSpecimenItemInput from './create-specimen-Item-input.dto';

@InputType()
export class UpdateLabTestItemInput extends PartialType(CreateLabTestItemInput) {
  @Field()
  id: string;
}

@InputType()
export class UpdateSpecimenItemInput extends PartialType(CreateSpecimenItemInput) {
  @Field()
  id: string;
}

@InputType()
export class UpdateLabTestInput {
  @Field({ nullable: true })
  updateLabTestItemInput?: UpdateLabTestItemInput

  @Field({ nullable: true })
  test?: string

  @Field(type => [String],{ nullable: true })
  diagnoses?: string[];

  @Field(()=> [UpdateSpecimenItemInput],{ nullable: true })
  updateSpecimenItemInput?: UpdateSpecimenItemInput[]
}

@InputType()
export class GetLabTest {
  @Field({ nullable: true })
  id?: string
 }

@InputType()
export class RemoveLabTest { 
  @Field({ nullable: true })
  id?: string
}
