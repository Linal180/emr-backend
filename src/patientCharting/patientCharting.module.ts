import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaginationModule } from 'src/pagination/pagination.module';
import { PatientModule } from 'src/patients/patient.module';
import { UsersModule } from 'src/users/users.module';
import { ICDCodes } from './entities/icdcodes.entity';
import { PatientProblems } from './entities/patientProblems.entity';
import { ProblemResolver } from './resolvers/patientProblem.resolver';
import { ProblemService } from './services/patientProblem.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ICDCodes, PatientProblems]),
    forwardRef(() => UsersModule),
    PaginationModule,
    PatientModule,
  ],
  providers: [ProblemResolver, ProblemService],
  exports: [ProblemService, TypeOrmModule],
})
export class ProblemChartingModule { }



