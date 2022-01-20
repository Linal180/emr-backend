import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdatePatientProvider {
  @Field()
  patientId: string

  @Field()
  providerId?: string
}