import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class PatientConsentInput {
  @Field()
  id: string
}


@InputType()
export class CreatePatientConsentInputs {

  @Field({ nullable: true })
  appointmentId: string;

  @Field({ nullable: true })
  patientId: string;

  @Field(() => [String], { nullable: true })
  agreementIds: string[];

  @Field({ nullable: true })
  body: string;

}

