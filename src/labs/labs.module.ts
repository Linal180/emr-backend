import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaginationModule } from 'src/pagination/pagination.module';
import { PracticeModule } from 'src/practice/practice.module';
import { ProviderModule } from 'src/providers/provider.module';
import { UsersModule } from 'src/users/users.module';
import { LoincCodes } from './entities/loincCodes.entity';
import { SpecimenTypes } from './entities/specimenTypes.entity';
import { LabTestsResolver } from './resolvers/labTests.resolver';
import { LoincCodesResolver } from './resolvers/loincCodes.resolver';
import { LoincCodesService } from './services/loincCodes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LoincCodes,SpecimenTypes]),
    forwardRef(() => UsersModule),
    PaginationModule,
    PracticeModule,
    forwardRef(() => ProviderModule)
  ],
  providers: [LoincCodesResolver, LoincCodesService, LabTestsResolver],
  exports: [LoincCodesService, TypeOrmModule],
})
export class LabModule { }



