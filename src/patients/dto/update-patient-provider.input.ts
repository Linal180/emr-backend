import { Field, InputType } from '@nestjs/graphql';
import { DoctorPatientRelationType } from '../entities/doctorPatient.entity';

@InputType()
export class UpdatePatientProvider {
  @Field()
  patientId: string

  @Field()
  providerId?: string

  @Field({ nullable: true })
  otherRelation?: string;

  @Field(() => DoctorPatientRelationType, { nullable: true })
  relation?: DoctorPatientRelationType
}

@InputType()
export class UpdatePatientProviderRelationInputs {

  @Field({ nullable: false })
  id: string;

  @Field({ nullable: true })
  otherRelation?: string;

  @Field(() => DoctorPatientRelationType, { nullable: true })
  relation: DoctorPatientRelationType
}

@InputType()
export class PatientProviderInputs { 
  @Field({ nullable: false })
  patientId: string;

  @Field({ nullable: true })
  providerId: string;
}