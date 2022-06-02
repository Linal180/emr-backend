import { Field, InputType } from '@nestjs/graphql';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';
import { FormType } from '../entities/form.entity';

@InputType()
export default class FormInput {

    @Field({ nullable: true })
    practiceId?: string;

    @Field({ nullable: true })
    facilityId?: string

    @Field(() => Boolean, { nullable: true })
    isSystemForm?: boolean

    @Field(() => FormType, { nullable: true })
    formType?: FormType;

    @Field(() => PaginationInput)
    paginationOptions: PaginationInput
}