import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//modules
import { AppointmentModule } from 'src/appointments/appointment.module';
import { PaginationModule } from 'src/pagination/pagination.module';
import { PatientModule } from 'src/patients/patient.module';
import { ProviderModule } from 'src/providers/provider.module';
import { UsersModule } from 'src/users/users.module';
//entities
import { Allergies } from './entities/allergies.entity';
import { FamilyHistory } from './entities/familyHistory.entity';
import { ICDCodes } from './entities/icdcodes.entity';
import { Medications } from './entities/medications.entity';
import { PatientProblems } from './entities/patientProblems.entity';
import { PatientVitals } from './entities/patientVitals.entity';
import { Reactions } from './entities/reactions.entity';
import { SnoMedCodes } from './entities/snowmedCodes.entity';
import { SurgicalHistory } from './entities/surgicalHistory.entity';
import { TriageNotes } from './entities/triageNotes.entity';
import { PatientAllergiesResolver } from './resolvers/patientAllergies.resolver';
import { PatientChartingResolver } from './resolvers/patientCharting.resolver';
import { PatientMedicationsResolver } from './resolvers/patientMedication.resolver';
//services
import { FamilyHistoryRelative } from './entities/familyHistoryRelative.entity';
import { PatientAllergies } from './entities/patientAllergies.entity';
import { PatientMedication } from './entities/patientMedication.entity';
import { FamilyHistoryResolver } from './resolvers/familyHistory.resolver';
import { ProblemResolver } from './resolvers/patientProblems.resolver';
import { VitalsResolver } from './resolvers/patientVitals.resolver';
import { SurgicalHistoryResolver } from './resolvers/surgicalHistory.resolver';
import { TriageNotesResolver } from './resolvers/triageNotes.resolver';
import { FamilyHistoryService } from './services/familyHistory.service';
import { FamilyHistoryRelativeService } from './services/familyHistoryRelative.service';
import { ICDCodeService } from './services/icdCode.service';
import { PatientAllergiesService } from './services/patientAllergies.service';
import { PatientChartingService } from './services/patientCharting.service';
import { PatientMedicationService } from './services/patientMedication.service';
import { ProblemService } from './services/patientProblems.service';
import { VitalsService } from './services/patientVitals.service';
import { ReactionsService } from './services/reactions.service';
import { SurgicalHistoryService } from './services/surgicalHistory.service';
import { TriageNotesService } from './services/triageNotes.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      ICDCodes, PatientProblems, PatientAllergies, SnoMedCodes, PatientVitals, Allergies, Reactions, TriageNotes,
      FamilyHistory, FamilyHistoryRelative, Medications, PatientMedication, SurgicalHistory
    ]),
    forwardRef(() => UsersModule),
    forwardRef(() => PatientModule),
    ProviderModule,
    PaginationModule,
    AppointmentModule,
  ],
  providers: [
    PatientAllergiesService, ProblemResolver, PatientAllergiesResolver, ProblemService, VitalsResolver,
    VitalsService, PatientAllergiesService, ReactionsService, TriageNotesResolver, TriageNotesService,
    FamilyHistoryService, FamilyHistoryResolver, FamilyHistoryRelativeService, ICDCodeService,
    PatientMedicationService, PatientMedicationsResolver, SurgicalHistoryResolver, SurgicalHistoryService
  , PatientChartingService, PatientChartingResolver],
  exports: [
    ProblemService, VitalsService, PatientAllergiesService, ReactionsService, TypeOrmModule, FamilyHistoryService
  ],
})
export class ProblemChartingModule { }



