import { Field, InputType } from '@nestjs/graphql';
import { PaymentType } from '../entities/appointment.entity';

@InputType()
export class CreateAppointmentInput {
  
    @Field(type => PaymentType)
    paymentType: PaymentType;
  
    @Field({ nullable: true })
    insuranceCompany?: string;

    @Field({ nullable: true })
    membershipID?: string;

    @Field({ nullable: true })
    reason?: string;
  
    @Field({ nullable: true })
    notes?: string;
  
    @Field({ nullable: true })
    employment?: boolean;
  
    @Field({ nullable: true })
    autoAccident?: boolean;
  
    @Field({ nullable: true })
    otherAccident?: boolean;
  
    @Field({ nullable: true })
    otherPartyResponsible?: boolean;
  
    @Field({ nullable: true })
    primaryInsurance?: string;
  
    @Field({ nullable: true })
    secondaryInsurance?: string;
  
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
    paymentStatus?: string;
    
}