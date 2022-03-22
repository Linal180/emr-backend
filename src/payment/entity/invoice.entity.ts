import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
//user imports
import { Transactions } from './payment.entity';
//constants or enums
export enum BILLING_TYPE {
  SELF_PAY = 'self_pay',
  INSURANCE = 'insurance',
}
export enum STATUS {
  PAID = 'paid',
  INSURANCE_CLAIM = 'insurance_claim',
  PENDING = 'pending',
}
//register enums with graphql
registerEnumType(BILLING_TYPE, {
  name: 'BILLING_TYPE',
  description: 'The invoice payment type',
});
registerEnumType(STATUS, {
  name: 'STATUS',
  description: 'The invoice status',
});
//entity
@Entity({ name: 'Invoice' })
@ObjectType()
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  invoiceNo: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  facilityId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  paymentTransactionId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  generatedBy: string;

  @Column({ enum: BILLING_TYPE, default: BILLING_TYPE.SELF_PAY, type: 'enum' })
  @Field(() => BILLING_TYPE)
  billingType: BILLING_TYPE;

  @Column({ nullable: true })
  @Field({ nullable: true })
  paymentMethod: string;

  @Column({ enum: STATUS, default: STATUS.PENDING, type: 'enum' })
  @Field(() => STATUS)
  status: STATUS;

  @Column({ nullable: false })
  @Field({ nullable: false })
  amount: string;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

  @Field(() => Transactions, { nullable: true })
  @ManyToOne(() => Transactions, (transaction) => transaction.id)
  transction: Transactions;
}
