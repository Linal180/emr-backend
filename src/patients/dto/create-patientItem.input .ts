import { Field, InputType } from '@nestjs/graphql';
import { COMMUNICATIONTYPE, ETHNICITY, GENDERIDENTITY, HOLDSTATEMENT, HOMEBOUND, MARITIALSTATUS, PrimaryDepartment, PRONOUNS, RACE, REGDepartment, SEXUALORIENTATION } from '../entities/patient.entity';

@InputType()
export class CreatePatientItemInput {

  @Field({ nullable: true })
  suffix: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  patientRecord: string;

  @Field({ nullable: true })
  middleName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  firstNameUsed: string;

  @Field({ nullable: true })
  prefferedName: string;

  @Field({ nullable: true })
  previousFirstName: string;

  @Field({ nullable: true })
  pharmacy: string;

  @Field({ nullable: true })
  usualProviderId?: string;

  @Field({ nullable: true })
  previouslastName: string;

  @Field({ nullable: true })
  motherMaidenName: string;

  @Field({ nullable: true })
  ssn: string;

  @Field({ nullable: true })
  dob: string;

  @Field(type => GENDERIDENTITY, { nullable: true })
  gender: GENDERIDENTITY

  @Field(type => REGDepartment, { nullable: true })
  registrationDepartment: REGDepartment

  @Field(type => PrimaryDepartment, { nullable: true })
  primaryDepartment: PrimaryDepartment

  @Field({ nullable: true, })
  registrationDate: string;

  @Field({ nullable: true })
  deceasedDate: string;

  @Field({ nullable: true })
  privacyNotice: boolean;

  @Field({ nullable: true })
  releaseOfInfoBill: boolean;

  @Field({ nullable: true })
  callToConsent: boolean;

  @Field({ nullable: true })
  voiceCallPermission: boolean;

  @Field({ nullable: true })
  phonePermission: boolean;

  @Field({ nullable: true })
  medicationHistoryAuthority: boolean;

  @Field({ nullable: true })
  patientNote: string;

  @Field({ nullable: true })
  language: string;
  
  @Field(type => COMMUNICATIONTYPE, { nullable: true })
  preferredCommunicationMethod: COMMUNICATIONTYPE

  @Field(type => RACE, { nullable: true })
  race: RACE

  @Field(type => ETHNICITY, { nullable: true })
  ethnicity: ETHNICITY

  @Field(type => MARITIALSTATUS, { nullable: true })
  maritialStatus: MARITIALSTATUS

  @Field(type => SEXUALORIENTATION, { nullable: true })
  sexualOrientation: SEXUALORIENTATION

  @Field(type => GENDERIDENTITY, { nullable: true })
  genderIdentity: GENDERIDENTITY

  @Field(type => GENDERIDENTITY, { nullable: true })
  sexAtBirth: GENDERIDENTITY

  @Field(type => PRONOUNS, { nullable: true })
  pronouns: PRONOUNS

  @Field(type => HOMEBOUND, { nullable: true })
  homeBound: HOMEBOUND

  @Field(type => HOLDSTATEMENT, { nullable: true })
  holdStatement: HOLDSTATEMENT

  @Field({ nullable: true })
  statementDelivereOnline: boolean;

  @Field({ nullable: true })
  statementNote: string;

  @Field({ nullable: true })
  statementNoteDateFrom: string;

  @Field({ nullable: true })
  statementNoteDateTo: string;

  @Field({ nullable: true })
  adminId?: string;

  @Field({ nullable: false })
  facilityId: string;

}