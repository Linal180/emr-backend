import { Field, InputType } from '@nestjs/graphql';
import CreateLabTestObservationItemInput from './create-lab-test-observationItem-input.dto';

@InputType()
export default class CreateLabTestObservationInput {

    @Field({nullable: false})
    labTestId: string

    @Field(()=> [CreateLabTestObservationItemInput],{nullable: true})
    createLabTestObservationItemInput: CreateLabTestObservationItemInput[]

}
