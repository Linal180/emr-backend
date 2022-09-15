import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTriageNoteInput {
  @Field({nullable: true})
  notes: string;

  @Field({nullable: true})
  patientId: string;

  @Field({nullable: true})
  appointmentId: string;
}