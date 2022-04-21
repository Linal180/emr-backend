import { Field, ObjectType } from "@nestjs/graphql";
//user import
import { ResponsePayloadResponse } from "src/customDecorators/response-payload.dto";
import { FormTemplate } from "../entities/formTemplates.entity";

//form template payload

@ObjectType()
export class FormTemplatePayload {
    @Field(() => FormTemplate, { nullable: true })
    form: FormTemplate;

    @Field({ nullable: true })
    response?: ResponsePayloadResponse
}

//form templates payload

@ObjectType()
export class FormsTemplatesPayload {
    @Field(() => [FormTemplate], { nullable: true })
    forms: FormTemplate[];

    @Field({ nullable: true })
    response?: ResponsePayloadResponse
}