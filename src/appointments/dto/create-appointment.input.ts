import { Field, InputType } from '@nestjs/graphql';
import { BillingStatus, PaymentType } from '../entities/appointment.entity';

@InputType()
export class CreateAppointmentInput {
  
    @Field(type => PaymentType)
    paymentType: PaymentType;

    @Field(type => BillingStatus,{ nullable: false })
    billingStatus?: BillingStatus;
  
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

    @Field({ nullable: true })
    isExternal: boolean;
  
    @Field({ nullable: false })
    scheduleStartDateTime?: string;

    @Field({ nullable: false })
    scheduleEndDateTime?: string;
  
    @Field({ nullable: false })
    appointmentTypeId: string;
  
    @Field({ nullable: true })
    facilityId: string;
    
    @Field({ nullable: true })
    providerId: string;
  
    @Field({ nullable: true })
    patientId: string;

    @Field({ nullable: true })
    practiceId?: string;
    
}