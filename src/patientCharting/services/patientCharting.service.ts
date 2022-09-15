import { Injectable } from '@nestjs/common';
import { PatientService } from 'src/patients/services/patient.service';
import { PatientChartingInfoInput } from '../dto/patientChartingInfo-input.dto';
import { FamilyHistoryService } from './familyHistory.service';
import { PatientAllergiesService } from './patientAllergies.service';
import { PatientMedicationService } from './patientMedication.service';
import { ProblemService } from './patientProblems.service';
import { VitalsService } from './patientVitals.service';
import { SurgicalHistoryService } from './surgicalHistory.service';
import { TriageNotesService } from './triageNotes.service';

@Injectable()
export class PatientChartingService {
  constructor(
    private readonly patientService: PatientService,
    private readonly patientAllergiesService: PatientAllergiesService,
    private readonly patientProblemService: ProblemService,
    private readonly patientVitalService: VitalsService,
    private readonly patientTriageNotesService: TriageNotesService,
    private readonly patientMedicationsService: PatientMedicationService,
    private readonly surgicalHistoryService: SurgicalHistoryService,
    private readonly familyHistoryService: FamilyHistoryService,
  ) { }

  async getPatientChartingInfo(patientChartingInfoInput: PatientChartingInfoInput) {
    const { patientId } = patientChartingInfoInput

    const patientInfo = await this.patientService.findOne(patientId)
    const patientAllergies = await this.patientAllergiesService.getPatientAllergies(patientId)

    const patientProblems = await this.patientProblemService.getPatientProblems(patientId)

    const patientVitals = await this.patientVitalService.getPatientVitals(patientId)

    const triageNotes = await this.patientTriageNotesService.getPatientTriageNotes(patientId)

    const patientMedications = await this.patientMedicationsService.getPatientMedications(patientId)

    const surgicalHistories = await this.surgicalHistoryService.getPatientSurgicalHistory(patientId)
    
    const familyHistories = await this.familyHistoryService.findByPatientId(patientId)

    return {
      patientInfo,
      patientAllergies,
      patientProblems,
      patientVitals,
      triageNotes,
      patientMedications,
      surgicalHistories,
      familyHistories
    }
  }
}
