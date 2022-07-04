import { Field, InputType } from '@nestjs/graphql';
import { COMMUNICATIONTYPE, ETHNICITY, GENDERIDENTITY, HOLDSTATEMENT, HOMEBOUND, MARITIALSTATUS, PRONOUNS, RACE, SEXUALORIENTATION } from '../entities/patient.entity';

@InputType()
export class CreatePatientItemInput {

  @Field({ nullable: true })
  suffix?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  patientRecord?: string;

  @Field({ nullable: true })
  middleName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  firstNameUsed?: string;

  @Field({ nullable: true })
  prefferedName?: string;

  @Field({ nullable: true })
  previousFirstName?: string;

  @Field({ nullable: true })
  pharmacy?: string;

  @Field({ nullable: true })
  usualProviderId?: string;

  @Field({ nullable: true })
  previouslastName?: string;

  @Field({ nullable: true })
  motherMaidenName?: string;

  @Field({ nullable: true })
  ssn?: string;

  @Field({ nullable: true })
  dob?: string;

  @Field(() => GENDERIDENTITY, { nullable: true })
  gender?: GENDERIDENTITY

  @Field({ nullable: true })
  registrationDepartment?: string

  @Field({ nullable: true })
  primaryDepartment?: string

  @Field({ nullable: true, })
  registrationDate?: string;

  @Field({ nullable: true })
  deceasedDate?: string;

  @Field({ nullable: true })
  privacyNotice?: boolean; 

  @Field({ nullable: true })
  releaseOfInfoBill?: boolean;

  @Field({ nullable: true })
  callToConsent?: boolean;

  @Field({ nullable: true })
  inviteAccepted?: boolean;

  @Field({ nullable: true })
  smsPermission?: boolean;

  @Field({ nullable: true })
  phonePermission?: boolean;

  @Field({ nullable: true })
  medicationHistoryAuthority?: boolean;

  @Field({ nullable: true })
  patientNote?: string;

  @Field({ nullable: true })
  language?: string;
  
  @Field(() => COMMUNICATIONTYPE, { nullable: true })
  preferredCommunicationMethod?: COMMUNICATIONTYPE

  @Field(() => RACE, { nullable: true })
  race?: RACE

  @Field(() => ETHNICITY, { nullable: true })
  ethnicity?: ETHNICITY

  @Field(() => MARITIALSTATUS, { nullable: true })
  maritialStatus?: MARITIALSTATUS

  @Field(() => SEXUALORIENTATION, { nullable: true })
  sexualOrientation?: SEXUALORIENTATION

  @Field(() => GENDERIDENTITY, { nullable: true })
  genderIdentity?: GENDERIDENTITY

  @Field(() => GENDERIDENTITY, { nullable: true })
  sexAtBirth?: GENDERIDENTITY

  @Field(() => PRONOUNS, { nullable: true })
  pronouns?: PRONOUNS

  @Field(() => HOMEBOUND, { nullable: true })
  homeBound?: HOMEBOUND

  @Field(() => HOLDSTATEMENT, { nullable: true })
  holdStatement?: HOLDSTATEMENT

  @Field({ nullable: true })
  statementDelivereOnline?: boolean;

  @Field({ nullable: true })
  statementNote?: string;

  @Field({ nullable: true })
  statementNoteDateFrom?: string;

  @Field({ nullable: true })
  statementNoteDateTo?: string;

  @Field({ nullable: true })
  adminId?: string;

  @Field({ nullable: true })
  facilityId?: string;
}
