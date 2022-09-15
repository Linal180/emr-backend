import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//modules
import { UsersModule } from 'src/users/users.module';
import { PatientModule } from 'src/patients/patient.module';
import { ProviderModule } from 'src/providers/provider.module';
import { PaginationModule } from 'src/pagination/pagination.module';
import { AppointmentModule } from 'src/appointments/appointment.module';
//entities
import { ICDCodes } from './entities/icdcodes.entity';
import { Allergies } from './entities/allergies.entity';
import { Reactions } from './entities/reactions.entity';
import { TriageNotes } from './entities/triageNotes.entity';
import { Medications } from './entities/medications.entity';
import { SnoMedCodes } from './entities/snowmedCodes.entity';
import { PatientVitals } from './entities/patientVitals.entity';
import { FamilyHistory } from './entities/familyHistory.entity';
import { PatientProblems } from './entities/patientProblems.entity';
import { SurgicalHistory } from './entities/surgicalHistory.entity';
import { PatientAllergies } from './entities/patientAllergies.entity';
import { PatientMedication } from './entities/patientMedication.entity';
import { FamilyHistoryRelative } from './entities/familyHistoryRelative.entity';
//resolvers
import { VitalsResolver } from './resolvers/patientVitals.resolver';
import { ProblemResolver } from './resolvers/patientProblems.resolver';
import { TriageNotesResolver } from './resolvers/triageNotes.resolver';
import { FamilyHistoryResolver } from './resolvers/familyHistory.resolver';
import { SurgicalHistoryResolver } from './resolvers/surgicalHistory.resolver';
import { PatientAllergiesResolver } from './resolvers/patientAllergies.resolver';
import { PatientMedicationsResolver } from './resolvers/patientMedication.resolver';
//services
import { ICDCodeService } from './services/icdCode.service';
import { ReactionsService } from './services/reactions.service';
import { VitalsService } from './services/patientVitals.service';
import { ProblemService } from './services/patientProblems.service';
import { TriageNotesService } from './services/triageNotes.service';
import { FamilyHistoryService } from './services/familyHistory.service';
import { SurgicalHistoryService } from './services/surgicalHistory.service';
import { PatientAllergiesService } from './services/patientAllergies.service';
import { PatientMedicationService } from './services/patientMedication.service';
import { FamilyHistoryRelativeService } from './services/familyHistoryRelative.service';


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
  ],
  exports: [
    ProblemService, VitalsService, PatientAllergiesService, ReactionsService, TypeOrmModule, FamilyHistoryService
  ],
})
export class ProblemChartingModule { }



