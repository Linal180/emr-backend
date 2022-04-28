import { Field, InputType } from '@nestjs/graphql';
import CreateLabTestItemInput from './create-lab-test-Item-input.dto';
import CreateSpecimenItemInput from './create-specimen-Item-input.dto';

@InputType()
export default class CreateLabTestInput {
    @Field(()=> CreateLabTestItemInput,{ nullable: true })
    createLabTestItemInput?: CreateLabTestItemInput

    @Field({ nullable: true })
    test?: string

    @Field(type => [String],{ nullable: true })
    diagnoses?: string[];

    @Field(()=> [CreateSpecimenItemInput],{ nullable: true })
    createSpecimenItemInput?: CreateSpecimenItemInput[]

}   