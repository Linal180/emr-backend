import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttachmentsModule } from 'src/attachments/attachments.module';
import { FacilityModule } from 'src/facilities/facility.module';
import { PaginationModule } from 'src/pagination/pagination.module';
import { ProviderModule } from 'src/providers/provider.module';
import { UsersModule } from 'src/users/users.module';
import { Practice } from './entities/practice.entity';
import { PracticeController } from './practice.controller';
import { PracticeResolver } from './practice.resolver';
import { PracticeService } from './practice.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([Practice]),
    PaginationModule,
    forwardRef(() => FacilityModule),
    forwardRef(() => UsersModule),
    forwardRef(() => ProviderModule),
    forwardRef(() => AttachmentsModule),
  ],
  providers: [PracticeResolver, PracticeService],
  controllers: [PracticeController],
  exports: [PracticeService, TypeOrmModule],
})
export class PracticeModule { }



