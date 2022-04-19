import { Field, InputType, PickType } from '@nestjs/graphql';
import { AllergyOnset, AllergySeverity } from '../entities/patientAllergies.entity';

@InputType()
export class UpdatePatientAllergyInput{ 

  @Field()
  id: string

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

}

@InputType()
export class UpdateAllergyInput{ 

  @Field(type => UpdatePatientAllergyInput)
  updatePatientAllergyInput: UpdatePatientAllergyInput

  @Field(type => [String],{ nullable: false })
  reactionsIds: string[];

  @Field({ nullable: true })
  appointmentId?: string;

  @Field({ nullable: true })
  patientId: string;

  @Field({ nullable: true })
  staffId: string;

  @Field({ nullable: true })
  allergyId: string;

  @Field({ nullable: true })
  providerId: string;
}


@InputType()
export class GetPatientAllergy extends PickType(UpdatePatientAllergyInput, ['id'] as const) { }

@InputType()
export class RemovePatientAllergy extends PickType(UpdatePatientAllergyInput, ['id'] as const) { }
