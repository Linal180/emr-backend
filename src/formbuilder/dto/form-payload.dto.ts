import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ResponsePayload, ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { ElementType } from '../entities/element.entity';
import { Form } from '../entities/form.entity';

@ObjectType()
export class FormPayload extends ResponsePayloadResponse {
    @Field(() => Form, { nullable: true })
    form: Form;

    @Field({ nullable: true })
    response?: ResponsePayload
}



@ObjectType()
export class FieldOptionsType {
    @Field()
    name: string;

    @Field()
    value: string;
}

@ObjectType()
export class FieldsTypes {

    @Field({ nullable: false })
    label: string;

    @Field({ nullable: false })
    name: string;

    @Field(() => ElementType)
    type: ElementType;

    @Field({ nullable: false })
    css: string;

    @Field(() => Int, { nullable: false })
    column: number;

    @Field({ nullable: false })
    placeholder: string;

    @Field({ nullable: false })
    defaultValue: string;

    @Field(() => Boolean, { nullable: false })
    required: boolean;

    @Field({ nullable: false })
    errorMsg: string;

    @Field({ nullable: true })
    tableName: string;

    @Field({ nullable: true })
    columnName: string;

    @Field({ nullable: false })
    fieldId: string;

    @Field(() => [FieldOptionsType], { nullable: false })
    options: FieldOptionsType[];

    @Field(() => Boolean, { nullable: false })
    textArea: boolean;

    @Field(() => Boolean, { nullable: true })
    isMultiSelect: boolean;

}
@ObjectType()
export class SectionsTypes {
    @Field({ nullable: false })
    id: string;

    @Field(() => Int, { nullable: false })
    col: number;

    @Field({ nullable: false })
    name: string;

    @Field(() => [FieldsTypes])
    fields: FieldsTypes[]
}

@ObjectType()
export class LayoutJSONType {
    @Field(() => [SectionsTypes])
    sections: SectionsTypes[]
}



