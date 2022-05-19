import { Field, InputType, PartialType } from '@nestjs/graphql';
import CreateLabTestObservationItemInput from './create-lab-test-observationItem-input.dto';

@InputType()
export class UpdateLabTestObservationItemInput extends PartialType(CreateLabTestObservationItemInput) {
  @Field()
  id: string;
}