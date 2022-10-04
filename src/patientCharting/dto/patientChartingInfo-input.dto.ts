import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PatientChartingInfoInput {
    @Field({ nullable: true })
    patientId?: string
}

@InputType()
export class PatientChartingReviewInput {
    @Field({ nullable: true })
    patientId?: string

    @Field({ nullable: true })
    appointmentId?: string
}