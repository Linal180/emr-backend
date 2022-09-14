import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentModule } from 'src/appointments/appointment.module';
import { PaginationModule } from 'src/pagination/pagination.module';
import { PatientModule } from 'src/patients/patient.module';
import { ProviderModule } from 'src/providers/provider.module';
import { UsersModule } from 'src/users/users.module';
import { Allergies } from './entities/allergies.entity';
import { ICDCodes } from './entities/icdcodes.entity';
import { Medications } from './entities/medications.entity';
import { PatientAllergies } from './entities/patientAllergies.entity';
import { PatientMedication } from './entities/patientMedication.entity';
import { PatientProblems } from './entities/patientProblems.entity';
import { PatientVitals } from './entities/patientVitals.entity';
import { Reactions } from './entities/reactions.entity';
import { SnoMedCodes } from './entities/snowmedCodes.entity';
import { SurgicalHistory } from './entities/surgicalHistory.entity';
import { TriageNotes } from './entities/triageNotes.entity';
import { PatientAllergiesResolver } from './resolvers/patientAllergies.resolver';
import { PatientMedicationsResolver } from './resolvers/patientMedication.resolver';
import { ProblemResolver } from './resolvers/patientProblems.resolver';
import { VitalsResolver } from './resolvers/patientVitals.resolver';
import { SurgicalHistoryResolver } from './resolvers/surgicalHistory.resolver';
import { TriageNotesResolver } from './resolvers/triageNotes.resolver';
import { PatientAllergiesService } from './services/patientAllergies.service';
import { PatientMedicationService } from './services/patientMedication.service';
import { ProblemService } from './services/patientProblems.service';
import { VitalsService } from './services/patientVitals.service';
import { ReactionsService } from './services/reactions.service';
import { SurgicalHistoryService } from './services/surgicalHistory.service';
import { TriageNotesService } from './services/triageNotes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ICDCodes, PatientProblems, PatientAllergies, SnoMedCodes, PatientVitals, Allergies, 
      Reactions, TriageNotes, Medications, PatientMedication, SurgicalHistory]),
    forwardRef(() => UsersModule),
    PaginationModule,
    ProviderModule,
    AppointmentModule,
    PatientModule,
  ],
  providers: [PatientAllergiesService, ProblemResolver, PatientAllergiesResolver, ProblemService, VitalsResolver,
    VitalsService, PatientAllergiesService, ReactionsService, TriageNotesResolver, TriageNotesService, 
    PatientMedicationService, PatientMedicationsResolver, SurgicalHistoryResolver, SurgicalHistoryService],
  exports: [ProblemService, VitalsService, PatientAllergiesService, ReactionsService, TypeOrmModule],
})
export class ProblemChartingModule { }



