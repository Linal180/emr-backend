import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentModule } from 'src/appointments/appointment.module';
import { PaginationModule } from 'src/pagination/pagination.module';
import { PatientModule } from 'src/patients/patient.module';
import { ProviderModule } from 'src/providers/provider.module';
import { UsersModule } from 'src/users/users.module';
import { Allergies } from './entities/allergies.entity';
import { ICDCodes } from './entities/icdcodes.entity';
import { PatientProblems } from './entities/patientProblems.entity';
import { PatientVitals } from './entities/patientVitals.entity';
import { Reactions } from './entities/reactions.entity';
import { SnoMedCodes } from './entities/snowmedCodes.entity';
import { ProblemResolver } from './resolvers/patientProblems.resolver';
import { VitalsResolver } from './resolvers/patientVitals.resolver';
import { ProblemService } from './services/patientProblems.service';
import { VitalsService } from './services/patientVitals.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ICDCodes, PatientProblems, SnoMedCodes, PatientVitals, Allergies, Reactions]),
    forwardRef(() => UsersModule),
    PaginationModule,
    ProviderModule,
    AppointmentModule,
    PatientModule,
  ],
  providers: [ProblemResolver, ProblemService, VitalsResolver, VitalsService],
  exports: [ProblemService, VitalsService, TypeOrmModule],
})
export class ProblemChartingModule { }



