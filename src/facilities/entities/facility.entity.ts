import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { Contact } from 'src/providers/entities/contact.entity';
import { Staff } from 'src/providers/entities/staff.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


export enum PracticeType {
  HOSPITAL = "hospital",
  LAB = "lab",
  CLINIC = "clinic",
}

registerEnumType(PracticeType, {
  name: "PracticeType",
  description: "The facility practice type assigned type",
});

export enum ServiceCode {
  AMBULANCE_41 = "AMBULANCE - LAND [41]",
  AMBULANCE_42 = "AMBULANCE - AIR OR WATER [42]",
  AMBULANCE_24 = "AMBULATORY SURGICAL CENTER [24]",
  ASSISTED_LIVING_13 = "ASSISTED LIVING [13]",
  BIRTHING_CENTER_25 = "BIRTHING CENTER [25]",
  COMMUNITY_MENTAL_HEALTH_CENTER_53 = "COMMUNITY MENTAL HEALTH CENTER [53]",
  COMPREHENSIVE_INPATIENT_REHABILITATION_FACILITY_61 = "COMPREHENSIVE INPATIENT REHABILITATION FACILITY [61]",
  COMPREHENSIVE_OUTPATIENT_REHABILITATION_FACILITY_62 = "COMPREHENSIVE OUTPATIENT REHABILITATION FACILITY [62]",
  CUSTODIAL_CARE_FACILITY_33 = "CUSTODIAL CARE FACILITY [33]",
  EMERGENCY_ROOM_23 = "EMERGENCY ROOM [23]",
  END_STAGE_RENAL_DISEASE_TREATMENT_FACILITY_65 = "END STAGE RENAL DISEASE TREATMENT FACILITY [65]",
  FEDERALLY_QUALIFIED_HEALTH_CENTER_50 = "FEDERALLY QUALIFIED HEALTH CENTER [50]",
  GROUP_HOME_14 = "GROUP HOME [14]",
  HOMELESS_SHELTER_04 = "HOMELESS SHELTER [04]",
  HOSPICE_34 = "HOSPICE [34]",
  INDEPENDENT_CLINIC_49 = "INDEPENDENT CLINIC [49]",
  INDEPENDENT_LABORATORY_81 = "INDEPENDENT LABORATORY [81]",
  INDIAN_HEALTH_SERVICE_FREE_STANDING_FACILITY_05 = "INDIAN HEALTH SERVICE FREE-STANDING FACILITY [05]",
  INDIAN_HEALTH_SERVICE_PROVIDER_BASED_FACILITY_06 = "INDIAN HEALTH SERVICE PROVIDER-BASED FACILITY [06]"
}

registerEnumType(ServiceCode, {
  name: "ServiceCode",
  description: "The facility service code type assigned",
});


@Entity({ name: 'Facilities' })
@ObjectType()
export class Facility {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @Column({
    type: "enum",
    enum: PracticeType,
    default: PracticeType.HOSPITAL
  })
  @Field(type => PracticeType)
  practiceType: PracticeType

  @Column({ nullable: true })
  @Field()
  code: string;

  @Column({ nullable: true })
  @Field()
  cliaIdNumber: string;

  @Column({ nullable: true })
  @Field()
  federalTaxId: string;

  @Column({ nullable: true, default: false })
  @Field()
  isPrivate: boolean;

  @Column({ nullable: true })
  @Field()
  revenueCode: string;

  @Column({ nullable: true })
  @Field()
  tamxonomyCode: string;

  @Column({ nullable: true })
  @Field()
  insurancePlanType: string;

  @Column({ nullable: true })
  @Field()
  mammographyCertificationNumber: string;

  @Column({ nullable: true })
  @Field()
  npi: string;

  @Column({
    type: "enum",
    enum: ServiceCode,
    default: ServiceCode.AMBULANCE_24
  })
  @Field(type => ServiceCode)
  serviceCode: ServiceCode

  @Field(() => [Staff], { nullable: true })
  @OneToMany(() => Staff, staff => staff.facility, { eager: true, onUpdate: 'CASCADE', onDelete: "CASCADE" })
  staff: Staff[];

  @Field(() => [User], { nullable: true })
  @OneToMany(() => User, user => user.facility, { eager: true, onUpdate: 'CASCADE', onDelete: "CASCADE" })
  user: User[];

  @OneToMany(() => Contact, contact => contact.faciltiy, { onUpdate: 'CASCADE', onDelete: "CASCADE", eager: true })
  @Field(type => [Contact], { nullable: true })
  contacts: Contact[];

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;

}
