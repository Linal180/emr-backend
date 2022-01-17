import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ResponsePayload } from '../../users/dto/response-payload.dto';
import { Contact } from '../entities/contact.entity';

@ObjectType()
export class ContactPayload {
    @Field({ nullable: true })
    contact: Contact;

    @Field({ nullable: true })
    response?: ResponsePayload
}