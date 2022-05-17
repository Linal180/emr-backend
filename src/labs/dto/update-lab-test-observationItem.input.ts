import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Attachment } from 'src/attachments/entities/attachment.entity';
import { Observations } from '../entities/observations.entity';
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


@InputType()
export class ObservationsAttachmentsPayload extends PartialType(Observations) {
  @Field(type => [Attachment], { nullable: 'itemsAndList' })
  attachments?: Attachment[];
}
