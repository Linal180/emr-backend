import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Slots {
    @Field({ nullable: true })
    startTime: string;

    @Field({ nullable: true })
    endTime: string;
}
