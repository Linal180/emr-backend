import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class LoincCodeInput {
    @Field({ nullable: true })
    loincNum?: string

    @Field({ nullable: true })
    component?: string
}