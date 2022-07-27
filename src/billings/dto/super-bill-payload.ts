import { Field, ObjectType } from "@nestjs/graphql";
import { Appointment } from "src/appointments/entities/appointment.entity";
import { PolicyHolder } from "src/insurance/entities/policy-holder.entity";
import { Policy } from "src/insurance/entities/policy.entity";
import { Patient } from "src/patients/entities/patient.entity";
import { Doctor } from "src/providers/entities/doctor.entity";
import { ResponsePayload } from "src/users/dto/response-payload.dto";
import { Billing } from "../entities/billing.entity";

@ObjectType()
export class SuperBillPayload {
  @Field(() => Appointment, { nullable: true })
  appointmentInfo: Appointment

  @Field(() => Doctor, { nullable: true })
  providerInfo: Doctor

  @Field(() => Policy, { nullable: true })
  insuranceDetail: Policy
  
  @Field(() => PolicyHolder, { nullable: true })
  policyHolderInfo: PolicyHolder

  @Field(() => Billing, { nullable: true })
  billingInfo: Billing

  @Field(() => Patient, { nullable: true })
  patientInfo: Patient

  @Field(() => ResponsePayload, { nullable: true })
  response?: ResponsePayload
}