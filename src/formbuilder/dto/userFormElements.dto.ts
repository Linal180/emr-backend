import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class ArrayOfStringsType {

    @Field()
    name: string;

    @Field(() => Boolean)
    value: boolean
}


