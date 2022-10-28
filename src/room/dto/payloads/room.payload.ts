import { Field, ObjectType } from "@nestjs/graphql";
//payload
import PaginationPayload from "src/pagination/dto/pagination-payload.dto";
import { ResponsePayloadResponse } from "src/customDecorators/response-payload.dto";
//entities
import { Room } from "src/room/entities/room.entity";

@ObjectType()
export class RoomPayload {
  @Field(() => Room, { nullable: true })
  room: Room;

  @Field({ nullable: true })
  response?: ResponsePayloadResponse
}

@ObjectType()
export class FindAllRoomPayload {
  @Field(() => [Room],{ nullable: true })
  rooms: Room[];
  
  @Field(() => PaginationPayload, { nullable: true })
  pagination: PaginationPayload

  @Field({ nullable: true })
  response?: ResponsePayloadResponse
  
}