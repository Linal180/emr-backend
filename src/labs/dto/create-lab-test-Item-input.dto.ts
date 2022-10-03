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
    
    @Field({ nullable: true })
    collectedDate? : string

    @Field({ nullable: true })
    receivedDate? : string

    @Field({ nullable: true })
    accessionNumber? : string

    @Field({ nullable: true })
    labName? : string

    @Field({ nullable: true })
    vendorName? : string

    @Field({ nullable: true })
    doctorId? : string

    @Field({ nullable: true })
    primaryProviderId? : string

    @Field({ nullable: true })
    referringProviderId? : string

    @Field({ nullable: true })
    providerNotes? : string

    @Field({ nullable: true })
    problemId? : string
}