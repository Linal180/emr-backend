import { Field, InputType } from '@nestjs/graphql';
import { Speciality } from '../entities/doctor.entity';

@InputType()
export class CreateDoctorItemInput {

  @Field({ nullable: false })
  firstName: string;

  @Field({ nullable: false })
  middleName: string;

  @Field({ nullable: false })
  lastName: string;

  @Field({ nullable: true })
  prefix: string;

  @Field({ nullable: true })
  suffix: string;

  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  adminId?: string;

  @Field({ nullable: true })
  timeZone?: string;

  @Field({ nullable: false })
  facilityId?: string;

  @Field({ nullable: true })
  practiceId?: string;

  @Field({ nullable: true })
  providerIntials: string;

  @Field({ nullable: true })
  degreeCredentials: string;

  @Field(type => Speciality, { description: 'Doctor speciality', nullable: true })
  speciality: Speciality;

  @Field({ nullable: true })
  dob: string;

  @Field({ nullable: true })
  ssn: string;

  @Field({ nullable: true })
  taxonomyCode: string;

  @Field({ nullable: true })
  deaNumber: string;

  @Field({ nullable: true })
  deaActiveDate: string;

  @Field({ nullable: true })
  deaTermDate: string;

  @Field({ nullable: true })
  languagesSpoken: string;

  @Field({ nullable: true })
  taxId: string;

  @Field({ nullable: true })
  npi: string;

  @Field({ nullable: true })
  upin: string;

  @Field({ nullable: true })
  emcProviderId: string;

  @Field({ nullable: true })
  billingFacility: string;

  @Field({ nullable: true })
  medicareGrpNumber: string;

  @Field({ nullable: true })
  medicaidGrpNumber: string;

  @Field({ nullable: true })
  meammographyCertNumber: string;

  @Field({ nullable: true })
  campusGrpNumber: string;

  @Field({ nullable: true })
  blueShildNumber: string;

  @Field({ nullable: true })
  taxIdStuff: string;

  @Field({ nullable: true })
  specialityLicense: string;

  @Field({ nullable: true })
  anesthesiaLicense: string;

  @Field({ nullable: true })
  dpsCtpNumber: string;

  @Field({ nullable: true })
  stateLicense: string;

  @Field({ nullable: true })
  licenseActiveDate: string;

  @Field({ nullable: true })
  licenseTermDate: string;

  @Field({ nullable: true })
  prescriptiveAuthNumber: string;

}
