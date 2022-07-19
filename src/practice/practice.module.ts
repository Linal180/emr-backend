import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
//modules
import { UsersModule } from 'src/users/users.module';
import { ProviderModule } from 'src/providers/provider.module';
import { FacilityModule } from 'src/facilities/facility.module';
import { PaginationModule } from 'src/pagination/pagination.module';
import { AttachmentsModule } from 'src/attachments/attachments.module';
import { FeeScheduleModule } from 'src/feeSchedule/feeSchedule.module';
//services
import { PracticeService } from './practice.service';
//entities
import { Practice } from './entities/practice.entity';
//controllers
import { PracticeController } from './practice.controller';
//resolvers
import { PracticeResolver } from './practice.resolver';
@Module({
  imports: [
    TypeOrmModule.forFeature([Practice]),
    PaginationModule,
    forwardRef(() => UsersModule),
    forwardRef(() => FacilityModule),
    forwardRef(() => ProviderModule),
    forwardRef(() => FeeScheduleModule),
    forwardRef(() => AttachmentsModule),
  ],
  providers: [PracticeResolver, PracticeService],
  controllers: [PracticeController],
  exports: [PracticeService, TypeOrmModule],
})
export class PracticeModule { }



