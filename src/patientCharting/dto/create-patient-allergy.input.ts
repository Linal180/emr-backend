import { Field, InputType } from '@nestjs/graphql';
import { AllergyType } from '../entities/allergies.entity';
import { AllergyOnset, AllergySeverity } from '../entities/patientAllergies.entity';

@InputType()
export class CreatePatientAllergyInput {

  @Field({ nullable: true })
  appointmentId?: string;

  @Field({ nullable: false })
  patientId: string;

  @Field({ nullable: true })
  staffId: string;

  @Field({ nullable: true })
  allergyId?: string;

  @Field({ nullable: true })
  allergyName?: string;

  @Field(type => AllergyType, { nullable: true })
  allergyType?: AllergyType;

  @Field({ nullable: true })
  providerId: string;

  @Field({ nullable: true })
  isActive: boolean;

  @Field({ nullable: true })
  comments: string;

  @Field({ nullable: true })
  allergyStartDate: string;

  @Field(type=> AllergyOnset,{ nullable: true })
  allergyOnset: AllergyOnset;

  @Field(type=> AllergySeverity,{ nullable: true })
  allergySeverity: AllergySeverity;

  @Field(type => [String],{ nullable: false })
  reactionsIds: string[];

}
