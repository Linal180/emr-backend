import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
//services
import { RoomService } from '../services/room.service';
import { FacilityService } from 'src/facilities/services/facility.service';
//entities
import { Room } from '../entities/room.entity';
import { Facility } from 'src/facilities/entities/facility.entity';
//payloads
import { FindAllRoomPayload, RoomPayload } from '../dto/payloads/room.payload';
//inputs
import { CreateRoomInput, FindAllRoomInput, GetRoomInput, RemoveRoomInput, UpdateRoomInput } from '../dto/inputs/room.input';

@Resolver(() => Room)
export class RoomResolver {
  constructor(
    private readonly roomService: RoomService,
    private readonly facilityService: FacilityService,
  ) { }

  //queries

  @Query(() => FindAllRoomPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'findAllCvx')
  async findAllRoom(@Args('findAllRoomInput') findAllRoomInput: FindAllRoomInput): Promise<FindAllRoomPayload> {
    const { rooms, pagination } = await this.roomService.findAll(findAllRoomInput);
    if (rooms) {
      return {
        rooms,
        pagination,
        response: {
          message: "OK", status: 200,
        }
      }
    }
  }

  @Query(() => RoomPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'getNdcCode')
  async getRoom(@Args('getRoomInput') getRoomInput: GetRoomInput): Promise<RoomPayload> {
    const { id } = getRoomInput
    const room = await this.roomService.findOne(id)
    if (room) {
      return {
        room,
        response: {
          message: "OK", status: 200,
        }
      }
    }
  }

  //mutations

  @Mutation(() => RoomPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'createNdcCode')
  async createRoom(@Args('createRoomInput') createRoomInput: CreateRoomInput): Promise<RoomPayload> {
    return {
      room: await this.roomService.create(createRoomInput),
      response: { status: 200, message: 'Room created successfully.' }
    };
  }

  @Mutation(() => RoomPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'updateCvxCode')
  async updateRoom(@Args('updateRoomInput') updateRoomInput: UpdateRoomInput): Promise<RoomPayload> {
    return {
      room: await this.roomService.update(updateRoomInput),
      response: { status: 200, message: 'Room is updated successfully' }
    };
  }


  @Mutation(() => RoomPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'removeIcdCode')
  async removeRoom(@Args('removeRoomInput') removeRoomInput: RemoveRoomInput): Promise<RoomPayload> {
    const { id } = removeRoomInput
    return {
      room: await this.roomService.remove(id),
      response: { status: 200, message: 'Room is removed successfully' }
    };
  }

  //resolve fields

  @ResolveField(() => Facility)
  async facility(@Parent() room: Room): Promise<Facility> {
    if (room?.facilityId) {
      return await this.facilityService.findOne(room?.facilityId);
    }
  }

}
