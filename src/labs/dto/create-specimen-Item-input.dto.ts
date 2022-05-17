import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class CreateSpecimenItemInput {
    @Field({ nullable: false })
    testSpecimen?: string

    @Field({ nullable: true })
    specimenNotes?: string

    @Field({ nullable: true })
    collectionDate?: string

    @Field({ nullable: true })
    collectionTime?: string
    
}