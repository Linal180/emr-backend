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
import { SnoMedCodes } from './entities/snowmedCodes.entity';
import { PatientVitals } from './entities/patientVitals.entity';
import { FamilyHistory } from './entities/familyHistory.entity';
import { PatientProblems } from './entities/patientProblems.entity';
import { PatientAllergies } from './entities/patientAllergies.entity';
import { FamilyHistoryRelative } from './entities/familyHistoryRelative.entity';
//resolvers
import { VitalsResolver } from './resolvers/patientVitals.resolver';
import { ProblemResolver } from './resolvers/patientProblems.resolver';
import { FamilyHistoryResolver } from './resolvers/familyHistory.resolver';
import { PatientAllergiesResolver } from './resolvers/patientAllergies.resolver';
//services
import { ReactionsService } from './services/reactions.service';
import { VitalsService } from './services/patientVitals.service';
import { ProblemService } from './services/patientProblems.service';
import { FamilyHistoryService } from './services/familyHistory.service';
import { PatientAllergiesService } from './services/patientAllergies.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ICDCodes, PatientProblems, PatientAllergies, SnoMedCodes, PatientVitals, Allergies, Reactions, FamilyHistory,
      FamilyHistoryRelative
    ]),
    forwardRef(() => UsersModule),
    PatientModule,
    ProviderModule,
    PaginationModule,
    AppointmentModule,
  ],
  providers: [
    PatientAllergiesService, ProblemResolver, PatientAllergiesResolver, ProblemService, VitalsResolver, VitalsService,
    PatientAllergiesService, ReactionsService, FamilyHistoryService, FamilyHistoryResolver
  ],
  exports: [ProblemService, VitalsService, PatientAllergiesService, ReactionsService, TypeOrmModule],
})
export class ProblemChartingModule { }



