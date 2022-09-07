import { Field, InputType, PartialType } from '@nestjs/graphql';
import { AppointmentCreateType, BillingStatus, PaymentType } from '../entities/appointment.entity';
import { CreateContractInput } from './contract.input';

@InputType()
export class CreateAppointmentInput extends PartialType(CreateContractInput) {

    @Field(() => PaymentType)
    paymentType: PaymentType;

    @Field(() => BillingStatus, { nullable: false })
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

    @Field(() => AppointmentCreateType, { nullable: true })
    appointmentCreateType?: AppointmentCreateType

    @Field(() => String, { nullable: true })
    insuranceStatus?: string

    @Field({ nullable: true })
    appointmentDate: string;

    @Field({ nullable: true })
    timeZone: string;
}