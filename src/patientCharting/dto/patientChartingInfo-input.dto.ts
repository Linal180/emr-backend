import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PatientChartingInfoInput {
    @Field({ nullable: true })
    patientId?: string
}