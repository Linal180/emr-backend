import { Field, InputType } from '@nestjs/graphql';
import { PaymentType } from '../entities/appointment.entity';

@InputType()
export class CreateExternalAppointmentItemInput {

    @Field({ nullable: true })
    isExternal: boolean;
  
    @Field(type => PaymentType)
    paymentType: PaymentType;
  
    @Field({ nullable: true })
    insuranceCompany?: string;

    @Field({ nullable: true })
    membershipID?: string;

    @Field({ nullable: false })
    scheduleStartDateTime?: string;
  
    @Field({ nullable: false })
    scheduleEndDateTime?: string;
  
    @Field({ nullable: false })
    serviceId: string;
  
    @Field({ nullable: false })
    facilityId: string;
    
    @Field({ nullable: false })
    providerId: string;
  
    @Field({ nullable: true })
    patientId: string;

    @Field({ nullable: true })
    paymentStatus: string;
    
}
