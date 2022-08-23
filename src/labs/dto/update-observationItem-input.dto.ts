import { Field, InputType } from '@nestjs/graphql';
import { AbnormalFlag } from '../entities/observations.entity';

@InputType()
export class UpdateObservationItemInput {
    @Field({ nullable: true })
    orderNumber?: string

    @Field({ nullable: true })
    testName?: string

    @Field({ nullable: true })
    result?: string
}

@InputType()
export class UpdateObservationInput {
    @Field(() => [UpdateObservationItemInput], { nullable: true })
    UpdateObservationItemInput?: UpdateObservationItemInput[]
}