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
import { PaginationModule } from 'src/pagination/pagination.module';

@Module({
  imports: [TypeOrmModule.forFeature([Room]),
    PaginationModule,
    UtilsModule],
  providers: [RoomService, RoomResolver]
})
export class RoomModule { }
