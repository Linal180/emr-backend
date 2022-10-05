import { Field, InputType } from "@nestjs/graphql";
import { SocialAnswerInput } from "./socialAnswer.inputs";

@InputType()
export class PatientSocialHistoryInput {

  @Field({ nullable: true })
  patientId: string;

}

@InputType()
export class CreatePatientSocialHistoryInput {

  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  patientId: string;

  @Field(() => [SocialAnswerInput])
  socialAnswer: SocialAnswerInput[]

}