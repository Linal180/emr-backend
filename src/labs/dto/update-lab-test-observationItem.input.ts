import { Field, InputType } from '@nestjs/graphql';
import { UpdateLabTestObservationItemInput } from './update-lab-test-observation.input';

@InputType()
export default class UpdateLabTestObservationInput {

    @Field({nullable: false})
    labTestId: string

    @Field(()=> [UpdateLabTestObservationItemInput],{nullable: true})
    updateLabTestObservationItemInput: UpdateLabTestObservationItemInput[]
  
}

@InputType()
export class RemoveLabTestObservation {
  @Field()
  id: string;
}