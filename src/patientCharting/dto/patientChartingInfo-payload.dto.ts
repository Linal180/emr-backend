import { Field, ObjectType } from '@nestjs/graphql';
import { Patient } from 'src/patients/entities/patient.entity';
import { ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { FamilyHistory } from '../entities/familyHistory.entity';
import { PatientAllergies } from '../entities/patientAllergies.entity';
import { PatientMedication } from '../entities/patientMedication.entity';
import { PatientProblems } from '../entities/patientProblems.entity';
import { PatientVitals } from '../entities/patientVitals.entity';
import { SurgicalHistory } from '../entities/surgicalHistory.entity';
import { TriageNotes } from '../entities/triageNotes.entity';

@ObjectType()
export class PatientChartingInfoPayload extends ResponsePayloadResponse {
    @Field(() => Patient, { nullable: true })
    patientInfo: Patient

    @Field(type => [PatientVitals], { nullable: 'itemsAndList' })
    patientVitals: PatientVitals[];

    @Field(type => [PatientAllergies], { nullable: 'itemsAndList' })
    patientAllergies: PatientAllergies[];

    @Field(type => [PatientProblems], { nullable: 'itemsAndList' })
    patientProblems: PatientProblems[];

    @Field(type => [TriageNotes], { nullable: 'itemsAndList' })
    triageNotes: TriageNotes[];

    @Field(type => [PatientMedication], { nullable: 'itemsAndList' })
    patientMedications: PatientMedication[];

    @Field(type => [SurgicalHistory], { nullable: 'itemsAndList' })
    surgicalHistories: SurgicalHistory[];

    @Field(type => [FamilyHistory], { nullable: 'itemsAndList' })
    familyHistories: FamilyHistory[];
}

@ObjectType()
export class PatientChartingReviewPayload extends ResponsePayloadResponse {
    @Field(type => [PatientVitals], { nullable: 'itemsAndList' })
    patientVitals: PatientVitals[];

    @Field(type => [PatientAllergies], { nullable: 'itemsAndList' })
    patientAllergies: PatientAllergies[];

    @Field(type => [PatientProblems], { nullable: 'itemsAndList' })
    patientProblems: PatientProblems[];

    @Field(type => [PatientMedication], { nullable: 'itemsAndList' })
    patientMedications: PatientMedication[];
}
