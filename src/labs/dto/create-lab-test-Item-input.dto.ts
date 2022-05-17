import { Field, InputType } from '@nestjs/graphql';
import { LabTestStatus } from '../entities/labTests.entity';

@InputType()
export default class CreateLabTestItemInput {
    @Field({ nullable: false })
    patientId: string

    @Field({ nullable: true })
    appointmentId?: string

    @Field(type=>LabTestStatus,{ nullable: true })
    status?: LabTestStatus

    @Field({ nullable: true })
    testNotes?: string

    @Field({ nullable: true })
    testDate?: string

    @Field({ nullable: true })
    testTime?: string    

    @Field({ nullable: true })
    orderNumber?: string 
}