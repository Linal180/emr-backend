import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


export enum PracticeType {
  HOSPITAL = "hospital",
  LAB = "lab",
  CLINIC = "clinic",
}

registerEnumType(PracticeType, {
  name: "PracticeType",
  description: "The facility assigned type",
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

  @Column({ nullable: true })
  @Field()
  email: string;

  @Column({ nullable: true })
  @Field()
  phone: string;

  @Column({ nullable: true })
  @Field()
  mobile: string;

  @Column({ nullable: true })
  @Field()
  fax: string;

  @Column({ nullable: true })
  @Field()
  stateImmunizationId: string;

  @Column({
    type: "enum",
    enum: PracticeType,
    default: PracticeType.HOSPITAL
  })
  @Field(type => PracticeType)
  practiceType: PracticeType

  @Column({ nullable: true })
  @Field()
  federalTaxId: string;

  @Column({ nullable: true })
  @Field()
  checkPayableTo: string;

  @Column({ nullable: true })
  @Field()
  bankAccount: string;

  @Column({ nullable: true })
  @Field()
  revenueCode: string;

  @Column({ nullable: true })
  @Field()
  tamxonomyCode: string;

  @Column({ nullable: true })
  @Field()
  pos: string;

  @Column({ nullable: true })
  @Field()
  merchantId: string;

  @Column({ nullable: true })
  @Field()
  hpsaModifier: string;

  @Column({ nullable: true })
  @Field()
  serviceLocationQualifies: string;

  @Column({ nullable: true })
  @Field()
  excludeChargesFromPatient: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  startDate: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  npi: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;

}
