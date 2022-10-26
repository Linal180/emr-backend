import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaginationModule } from 'src/pagination/pagination.module';
import { Macros } from './entities/macro.entity';
import { MacroResolver } from './resolvers/macro.resolver';
import { MacroService } from './services/macro.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Macros]),
    PaginationModule
  ],
  providers: [
   MacroResolver, MacroService
  ],
  exports: [ TypeOrmModule, MacroService]
})
export class MacroModule { }

