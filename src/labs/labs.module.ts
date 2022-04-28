import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaginationModule } from 'src/pagination/pagination.module';
import { ProblemChartingModule } from 'src/patientCharting/patientCharting.module';
import { PracticeModule } from 'src/practice/practice.module';
import { ProviderModule } from 'src/providers/provider.module';
import { UsersModule } from 'src/users/users.module';
import { LabTests } from './entities/labTests.entity';
import { LoincCodes } from './entities/loincCodes.entity';
import { SpecimenTypes } from './entities/specimenTypes.entity';
import { TestSpecimens } from './entities/testSpecimens.entity';
import { LabTestsResolver } from './resolvers/labTests.resolver';
import { LoincCodesResolver } from './resolvers/loincCodes.resolver';
import { LabTestsService } from './services/labTests.service';
import { LoincCodesService } from './services/loincCodes.service';
import { TestSpecimenService } from './services/testSpecimen.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LoincCodes, LabTests, SpecimenTypes, TestSpecimens]),
    forwardRef(() => UsersModule),
    PaginationModule,
    PracticeModule,
    ProblemChartingModule,
    forwardRef(() => ProviderModule)
  ],
  providers: [LoincCodesResolver, LoincCodesService, TestSpecimenService, LabTestsResolver, LabTestsService],
  exports: [LoincCodesService, LabTestsService, TestSpecimenService, TypeOrmModule],
})
export class LabModule { }



