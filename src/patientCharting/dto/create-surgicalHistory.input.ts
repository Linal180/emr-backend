import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSurgicalHistoryInput {
  @Field({nullable: true})
  notes: string;

  @Field({nullable: true})
  code: string

  @Field({nullable: true})
  codeType: string

  @Field({nullable: true})
  description: string

  @Field({nullable: true})
  surgeryDate:string

  @Field({nullable: true})
  patientId: string;
}