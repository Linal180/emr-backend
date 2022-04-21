import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { LabTests } from './labTests.entity';
import { Observations } from './observations.entity';


@Entity({ name: 'LoincCodes' })
@ObjectType()
export class LoincCodes {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({nullable: true})
  @Field({nullable: true})
  loincNum: string;

  @Column({nullable: true})
  @Field({nullable: true})
  component: string;

  @Column({nullable: true})
  @Field({nullable: true})
  property: string;

  @Column({nullable: true})
  @Field({nullable: true})
  timeAspect: string;

  @Column({nullable: true})
  @Field({nullable: true})
  system: string;

  @Column({nullable: true})
  @Field({nullable: true})
  scaleTyp: string;

  @Column({nullable: true})
  @Field({nullable: true})
  methodTyp: string;

  @Column({nullable: true})
  @Field({nullable: true})
  class: string;

  @Column({nullable: true})
  @Field({nullable: true})
  versionLastChanged: string;

  @Column({nullable: true})
  @Field({nullable: true})
  chngType: string;

  @Column({nullable: true})
  @Field({nullable: true})
  definitionDescription: string;

  @Column({nullable: true})
  @Field({nullable: true})
  status: string;
  
  @Column({nullable: true})
  @Field({nullable: true})
  consumerName: string;

  @Column({nullable: true})
  @Field({nullable: true})
  classType: string;

  @Column({nullable: true})
  @Field({nullable: true})
  formula: string;

  @Column({nullable: true})
  @Field({nullable: true})
  exmplAnswers: string;

  @Column({nullable: true})
  @Field({nullable: true})
  surveyQuestTest: string;

  @Column({nullable: true})
  @Field({nullable: true})
  surveyQuestSRC: string;

  @Column({nullable: true})
  @Field({nullable: true})
  unitsRequired: string;

  @Column({nullable: true})
  @Field({nullable: true})
  submittedUnits: string;

  @Column({nullable: true})
  @Field({nullable: true})
  relatedNames2: string;

  @Column({nullable: true})
  @Field({nullable: true})
  shortName: string;

  @Column({nullable: true})
  @Field({nullable: true})
  orderObs: string;

  @Column({nullable: true})
  @Field({nullable: true})
  cdiscCommonTests: string;

  @Column({nullable: true})
  @Field({nullable: true})
  hl7FieldSubFieldId: string;

  @Column({nullable: true})
  @Field({nullable: true})
  externalCopyRightNotice: string;
  
  @Column({nullable: true})
  @Field({nullable: true})
  exampleUnits: string;
  
  @Column({nullable: true})
  @Field({nullable: true})
  longCommonName: string;

  @Column({nullable: true})
  @Field({nullable: true})
  unitsAndRange: string;

  @Column({nullable: true})
  @Field({nullable: true})
  exampleUcumUnits: string;

  @Column({nullable: true})
  @Field({nullable: true})
  exampleSiUcumUnits: string;

  @Column({nullable: true})
  @Field({nullable: true})
  statusReason: string;

  @Column({nullable: true})
  @Field({nullable: true})
  statusText: string;

  @Column({nullable: true})
  @Field({nullable: true})
  changeReasonPublic: string;

  @Column({nullable: true})
  @Field({nullable: true})
  commonTestRank: string;

  @Column({nullable: true})
  @Field({nullable: true})
  commonOrderRank: string;

  @Column({nullable: true})
  @Field({nullable: true})
  commonSiTestRank: string;

  @Column({nullable: true})
  @Field({nullable: true})
  hl7AttachmentStructure: string;

  @Column({nullable: true})
  @Field({nullable: true})
  externalCopyRightLink: string;

  @Column({nullable: true})
  @Field({nullable: true})
  panelType: string;

  @Column({nullable: true})
  @Field({nullable: true})
  askAtOrderEntry: string;

  @Column({nullable: true})
  @Field({nullable: true})
  associationObservations: string;

  @Column({nullable: true})
  @Field({nullable: true})
  versionFirstRelease: string;

  @Column({nullable: true})
  @Field({nullable: true})
  validHl7AttachmentRequest: string;

  @Column({nullable: true})
  @Field({nullable: true})
  displayName: string;

  @OneToMany(() => LabTests, labTests => labTests.test, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(type => [LabTests], { nullable: true })
  labTests: LabTests[];

  @OneToMany(() => Observations, observations => observations.loincCodes, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(type => [Observations], { nullable: true })
  observations: Observations[];

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;
}
