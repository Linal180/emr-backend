import { Field, ObjectType } from '@nestjs/graphql';
import { Modifier } from 'src/feeSchedule/entities/modifier.entity';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'LiveClaimFeed' })
@ObjectType()
export class LiveClaimFeed {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  paidDate: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  provAddress1: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  provState: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  provCompanyId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  provCity: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  payerAddress1: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  provRouting: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  payerRouting: string;
  
  @Column({ nullable: true })
  @Field({ nullable: true })
  payerCity: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  eraId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  paymentFormat: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  payerName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  provTaxId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  fromDos: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  patientFullName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  InsuranceFullName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  totalPaid: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  thruDos: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  crossOverCarrier: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  crossOverId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  pcn: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  provNpi: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  totalCharge: string;

  @Column({ nullable: false, type: "jsonb" })
  @Field({ nullable: false })
  charge: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  paidAmount: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  provAccount: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  payerAccount: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  provZip: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  paymentMethod: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  provName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  payerId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  checkNumber: string;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}
