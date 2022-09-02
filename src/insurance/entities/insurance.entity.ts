import { ObjectType, Field } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
//entities
import { Policy } from './policy.entity';
import { Contact } from 'src/providers/entities/contact.entity';
@Entity({ name: 'Insurances' })
@ObjectType()
export class Insurance {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  payerId: string

  @Column()
  @Field()
  payerName: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  workersComp: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  type: string;

  @Column()
  @Field()
  ubClaims: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  state: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  eligibility: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  claimFee: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  electronicRemittanceAdvice: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  secondaryCoordinationBenefits: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  remitFee: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  attachment: string

  @OneToMany(() => Contact, contact => contact.insurance, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(() => [Contact], { nullable: true })
  contacts: Contact[];

  @OneToMany(() => Policy, policy => policy.insurance, { onDelete: "CASCADE" })
  @Field(() => [Policy], { nullable: true })
  policies: Policy[];

  @CreateDateColumn({ type: 'timestamptz' })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field({ nullable: true })
  updatedAt: string;

}