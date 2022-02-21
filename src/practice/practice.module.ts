import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacilityModule } from 'src/facilities/facility.module';
import { PaginationModule } from 'src/pagination/pagination.module';
import { ProviderModule } from 'src/providers/provider.module';
import { UsersModule } from 'src/users/users.module';
import { Practice } from './entities/practice.entity';
import { PracticeResolver } from './practice.resolver';
import { PracticeService } from './practice.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([Practice]),
    forwardRef(() => UsersModule),
    PaginationModule,
    FacilityModule,
    forwardRef(() => ProviderModule)
  ],
  providers: [PracticeResolver, PracticeService],
  exports: [PracticeService, TypeOrmModule],
})
export class PracticeModule { }



