import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//services
import { RoomService } from './services/room.service';
//resolvers
import { RoomResolver } from './resolvers/room.resolver';
//entities
import { Room } from './entities/room.entity';
//modules
import { UtilsModule } from 'src/util/utils.module';
import { FacilityModule } from 'src/facilities/facility.module';
import { PaginationModule } from 'src/pagination/pagination.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room]),
    UtilsModule,
    FacilityModule,
    PaginationModule,
  ],
  providers: [RoomService, RoomResolver],
  exports: [RoomService, TypeOrmModule]
})
export class RoomModule { }
