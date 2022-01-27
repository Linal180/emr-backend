import { Field, InputType } from '@nestjs/graphql';
import { PaymentType } from '../entities/appointment.entity';

@InputType()
export class CreateAppointmentInput {

    @Field({ nullable: true })
    isExternal: boolean;
  
    @Field(type => PaymentType)
    paymentType: PaymentType;
  
    @Field({ nullable: true })
    insuranceCompany: string;

    @Field({ nullable: true })
    membershipID: string;

    @Field({ nullable: true })
    reason: string;
  
    @Field({ nullable: true })
    notes: string;
  
    @Field({ nullable: true })
    employment: boolean;
  
    @Field({ nullable: true })
    autoAccident: boolean;
  
    @Field({ nullable: true })
    otherAccident: boolean;
  
    @Field({ nullable: true })
    otherPartyResponsible: boolean;
  
    @Field({ nullable: true })
    primaryInsurance: string;
  
    @Field({ nullable: true })
    secondaryInsurance: string;
  
    @Field({ nullable: false })
    scheduleDateTime: string;
  
    @Field({ nullable: true })
    serviceId: string;
  
    @Field({ nullable: true })
    facilityId: string;
    
    @Field({ nullable: true })
    providerId: string;
  
    @Field({ nullable: true })
    patientId: string;
}