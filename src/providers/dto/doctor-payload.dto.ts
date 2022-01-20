import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ResponsePayload } from '../../users/dto/response-payload.dto';
import { Doctor } from '../entities/doctor.entity';

@ObjectType()
export class DoctorPayload {
    @Field({ nullable: true })
    doctor: Doctor;

    @Field({ nullable: true })
    response?: ResponsePayload
}