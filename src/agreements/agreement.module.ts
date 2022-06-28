//package block
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
//modules
import { UtilsModule } from 'src/util/utils.module';
import { PracticeModule } from 'src/practice/practice.module';
import { FacilityModule } from 'src/facilities/facility.module';
import { PaginationModule } from 'src/pagination/pagination.module';
//services
import { AgreementService } from './services/agreement.service';
//entities
import { Agreement } from './entities/agreement.entity';
//resolvers
import { AgreementResolver } from './resolvers/agreement.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Agreement]),
    forwardRef(() => PaginationModule),
    forwardRef(() => FacilityModule),
    forwardRef(() => PracticeModule),
    UtilsModule
  ],
  providers: [AgreementResolver, AgreementService],
  exports: [TypeOrmModule, AgreementService],
})
export class AgreementModule { }



