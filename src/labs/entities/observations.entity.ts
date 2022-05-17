import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Attachment } from 'src/attachments/entities/attachment.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { LabTests } from './labTests.entity';
import { LoincCodes } from './loincCodes.entity';

export enum AbnormalFlag {
  NONE = "None",
  BELOW_LOW_NORMAL = "Below low normal",
  ABOVE_HIGH_NORMAL = "Above high normal",
  BELOW_LOWER_PANIC_LIMIT = "Below lower panic limits",
  BELOW_UPPER_PANIC_LIMIT = "Above upper panic limits",
  BELOW_ABSOLUTE_LOW_OFF_SCALE = "Below absolute low-off instrument scale",
  ABOVE_ABSOLUTE_HIGH_OFF_SCALE = "Above absolute high-off instrument scale",
  NORMAL = "Normal",
  ABNORMAL_APPLIED_TO_NON_NUMERIC_RESULTS = "Abnormal (applies to non-numeric results)",
  VERY_ABNORMAL_APPLIED_TO_NON_NUMERIC = "Very abnormal (applies to non-numeric units)",
  SIGNIFICANT_CHANGE_UP = "Significant change up",
  SIGNIFICANT_CHANGE_DOWN = "Significant change down",
  BETTER_USE_WHEN_DIRECTION_NOT_RELEVANT = "Better--use when direction not relevant",
  WORST_USE_WHEN_DIRECTION_NOT_RELEVANT = "Worse--use when direction not relevant",
  SUSCEPTIBLE = "Susceptible. Indicates for microbiology susceptibilities only",
  RESISTANT = "Resistant. Indicates for microbiology susceptibilities only",
  INTERMEDIATE = "Intermediate. Indicates for microbiology susceptibilities only",
  MODERATELY = "Moderately susceptible",
  VERY_SUSCEPTIBLE = "Very susceptible",
}

registerEnumType(AbnormalFlag, {
  name: "AbnormalFlag",
  description: "The test result's abnormal flag status assigned",
});

@Entity({ name: 'Observations' })
@ObjectType()
export class Observations {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({nullable: true, default: false})
  @Field({nullable: true})
  doctorsSignOff: boolean;

  @Column({nullable: true})
  @Field({nullable: true})
  resultValue: string;

  @Column({nullable: true})
  @Field({nullable: true})
  resultUnit: string;

  @Column({nullable: true})
  @Field({nullable: true})
  normalRange: string;

  @Column({nullable: true})
  @Field({nullable: true})
  normalRangeUnit: string;

  @Column({
    type: "enum",
    enum: AbnormalFlag,
    default: AbnormalFlag.NONE
  })
  @Field(type => AbnormalFlag)
  abnormalFlag: AbnormalFlag

  @Column("text", { nullable: true })
  @Field({nullable: true})
  description: string;

  @Column({nullable: true})
  @Field({nullable: true})
  labTestId: string;

  @Field(() => [Attachment], { nullable: true })
  attachments: Attachment[];
  
  @ManyToOne(() => LoincCodes, loincCodes => loincCodes.observations, { onDelete: 'CASCADE' })
  @Field(type => LoincCodes, { nullable: true })
  loincCodes: LoincCodes;
  
  @ManyToOne(() => LabTests, labTests => labTests.testObservations, { onDelete: 'CASCADE' })
  @Field(type => LabTests, { nullable: true })
  labTest: LabTests;
  
  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;
}
