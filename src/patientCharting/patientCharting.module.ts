import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentModule } from 'src/appointments/appointment.module';
import { PaginationModule } from 'src/pagination/pagination.module';
import { PatientModule } from 'src/patients/patient.module';
import { ProviderModule } from 'src/providers/provider.module';
import { UsersModule } from 'src/users/users.module';
import { Allergies } from './entities/allergies.entity';
import { ICDCodes } from './entities/icdcodes.entity';
import { PatientAllergies } from './entities/patientAllergies.entity';
import { PatientProblems } from './entities/patientProblems.entity';
import { PatientVitals } from './entities/patientVitals.entity';
import { Reactions } from './entities/reactions.entity';
import { SnoMedCodes } from './entities/snowmedCodes.entity';
import { PatientAllergiesResolver } from './resolvers/patientAllergies.resolver';
import { ProblemResolver } from './resolvers/patientProblems.resolver';
import { VitalsResolver } from './resolvers/patientVitals.resolver';
import { PatientAllergiesService } from './services/patientAllergies.service';
import { ProblemService } from './services/patientProblems.service';
import { VitalsService } from './services/patientVitals.service';
import { ReactionsService } from './services/reactions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ICDCodes, PatientProblems,PatientAllergies, SnoMedCodes, PatientVitals, Allergies, Reactions]),
    forwardRef(() => UsersModule),
    PaginationModule,
    ProviderModule,
    AppointmentModule,
    PatientModule,
  ],
  providers: [PatientAllergiesService,ProblemResolver, PatientAllergiesResolver, ProblemService, VitalsResolver, VitalsService, PatientAllergiesService, ReactionsService],
  exports: [ProblemService, VitalsService, PatientAllergiesService, ReactionsService, TypeOrmModule],
})
export class ProblemChartingModule { }



