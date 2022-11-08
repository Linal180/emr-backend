import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
//modules
import { LabModule } from 'src/labs/labs.module';
import { UsersModule } from 'src/users/users.module';
import { PatientModule } from 'src/patients/patient.module';
import { ProviderModule } from 'src/providers/provider.module';
import { PaginationModule } from 'src/pagination/pagination.module';
import { FeeScheduleModule } from 'src/feeSchedule/feeSchedule.module';
import { AppointmentModule } from 'src/appointments/appointment.module';
//entities
import { MVX } from './entities/mvx.entity';
import { CVX } from './entities/cvx.entity';
import { NDC } from './entities/ndc.entity';
import { Vaccine } from './entities/vaccines.entity';
import { ICDCodes } from './entities/icdcodes.entity';
import { Allergies } from './entities/allergies.entity';
import { Reactions } from './entities/reactions.entity';
import { Medications } from './entities/medications.entity';
import { TriageNotes } from './entities/triageNotes.entity';
import { SnoMedCodes } from './entities/snowMedCodes.entity';
import { FamilyHistory } from './entities/familyHistory.entity';
import { PatientVitals } from './entities/patientVitals.entity';
import { VaccineProduct } from './entities/vaccineProduct.entity';
import { SurgicalHistory } from './entities/surgicalHistory.entity';
import { PatientProblems } from './entities/patientProblems.entity';
import { PatientAllergies } from './entities/patientAllergies.entity';
import { PatientMedication } from './entities/patientMedication.entity';
import { NdcVaccineProduct } from './entities/ndcVaccineProduct.entity';
import { FamilyHistoryRelative } from './entities/familyHistoryRelative.entity';
//resolvers
import { NDCResolver } from './resolvers/ndc.resolver';
import { CVXResolver } from './resolvers/cvx.resolver';
import { MVXResolver } from './resolvers/mvx.resolver';
import { VaccineResolver } from './resolvers/vaccine.resolver';
import { IcdCodeResolver } from './resolvers/icdCode.resolver';
import { VitalsResolver } from './resolvers/patientVitals.resolver';
import { TriageNotesResolver } from './resolvers/triageNotes.resolver';
import { ProblemResolver } from './resolvers/patientProblems.resolver';
import { FamilyHistoryResolver } from './resolvers/familyHistory.resolver';
import { VaccineProductResolver } from './resolvers/vaccineProduct.resolver';
import { SurgicalHistoryResolver } from './resolvers/surgicalHistory.resolver';
import { PatientChartingResolver } from './resolvers/patientCharting.resolver';
import { PatientAllergiesResolver } from './resolvers/patientAllergies.resolver';
import { NdcVaccineProductResolver } from './resolvers/ndcVaccineProduct.resolver';
import { PatientMedicationsResolver } from './resolvers/patientMedication.resolver';
//services
import { NDCService } from './services/ndc.service';
import { CVXService } from './services/cvx.service';
import { MVXService } from './services/mvx.service';
import { ICDCodeService } from './services/icdCode.service';
import { VaccineService } from './services/vaccine.service';
import { ReactionsService } from './services/reactions.service';
import { VitalsService } from './services/patientVitals.service';
import { ProblemService } from './services/patientProblems.service';
import { TriageNotesService } from './services/triageNotes.service';
import { FamilyHistoryService } from './services/familyHistory.service';
import { VaccineProductService } from './services/vaccineProduct.service';
import { PatientChartingService } from './services/patientCharting.service';
import { SurgicalHistoryService } from './services/surgicalHistory.service';
import { PatientAllergiesService } from './services/patientAllergies.service';
import { PatientMedicationService } from './services/patientMedication.service';
import { NdcVaccineProductService } from './services/ndcVaccineProduct.service';
import { FamilyHistoryRelativeService } from './services/familyHistoryRelative.service';
import { ReviewOfSystemModule } from 'src/reviewOfSystems/reviewOfSystems.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      ICDCodes, PatientProblems, PatientAllergies, SnoMedCodes, PatientVitals, Allergies, Reactions, TriageNotes,
      FamilyHistory, FamilyHistoryRelative, Medications, PatientMedication, SurgicalHistory, Vaccine, MVX, CVX, NDC,
      VaccineProduct, NdcVaccineProduct
    ]),
    forwardRef(() => LabModule),
    forwardRef(() => UsersModule),
    forwardRef(() => ProviderModule),
    forwardRef(() => PatientModule),
    forwardRef(() => PaginationModule),
    FeeScheduleModule,
    AppointmentModule,
    forwardRef(() => ReviewOfSystemModule),
  ],
  providers: [
    //services
    NDCService,
    MVXService,
    CVXService,
    VitalsService,
    VaccineService,
    ProblemService,
    ICDCodeService,
    ReactionsService,
    TriageNotesService,
    FamilyHistoryService,
    VaccineProductService,
    PatientChartingService,
    SurgicalHistoryService,
    PatientAllergiesService,
    PatientAllergiesService,
    PatientMedicationService,
    NdcVaccineProductService,
    FamilyHistoryRelativeService,
    //resolvers
    NDCResolver,
    CVXResolver,
    MVXResolver,
    VitalsResolver,
    ProblemResolver,
    IcdCodeResolver,
    VaccineResolver,
    TriageNotesResolver,
    FamilyHistoryResolver,
    VaccineProductResolver,
    SurgicalHistoryResolver,
    PatientChartingResolver,
    PatientAllergiesResolver,
    NdcVaccineProductResolver,
    PatientMedicationsResolver,
  ],
  exports: [
    ProblemService, VitalsService, PatientAllergiesService, ReactionsService, TypeOrmModule, FamilyHistoryService
  ],
})
export class PatientChartingModule { }



