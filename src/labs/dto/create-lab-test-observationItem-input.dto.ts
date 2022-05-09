import { Field, InputType } from '@nestjs/graphql';
import { AbnormalFlag } from '../entities/observations.entity';

@InputType()
export default class CreateLabTestObservationItemInput {

    @Field({nullable: true})
    doctorsSignOff?: boolean

    @Field({nullable: false})
    resultValue: string

    @Field({nullable: false})
    resultUnit: string

    @Field({nullable: false})
    normalRange: string

    @Field({nullable: false})
    normalRangeUnit: string

    @Field({nullable: false})
    abnormalFlag: AbnormalFlag

    @Field({nullable: false})
    description: string

}