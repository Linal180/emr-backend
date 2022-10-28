import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
//entities
import { Room } from '../entities/room.entity';
//services
import { PaginationService } from 'src/pagination/pagination.service';
import { FacilityService } from 'src/facilities/services/facility.service';
//inputs
import { CreateRoomInput, FindAllRoomInput, UpdateRoomInput } from '../dto/inputs/room.input';
//payloads
import { FindAllRoomPayload } from '../dto/payloads/room.payload';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepo: Repository<Room>,
    private readonly facilityService: FacilityService,
    private readonly paginationService: PaginationService,
  ) { }


  /**
   * Finds all
   * @param params 
   * @returns all 
   */
  async findAll(params: FindAllRoomInput): Promise<FindAllRoomPayload> {
    try {

      const { paginationOptions, searchString, facilityId, practiceId } = params || {}
      const response = await this.paginationService.willPaginate<Room>(this.roomRepo, {
        paginationOptions, facilityId, practiceId, associatedToField: {
          filterType: "stringFilter", columnValue: searchString, columnName: 'name', columnName2: 'number'
        }, associatedTo: 'Room'
      })

      const { data, ...pagination } = response;

      return {
        pagination,
        rooms: data
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds one
   * @param id 
   * @returns one 
   */
  async findOne(id: string): Promise<Room> {
    return await this.roomRepo.findOne(id);
  }

  /**
   * Finds one by no
   * @param number 
   * @param [id] 
   * @returns one by no 
   */
  async findOneByNo(number: string, id?: string): Promise<Room> {
    return await this.roomRepo.findOne({ number, ...(id && { id: Not(id) }) })
  }

  /**
   * Creates room service
   * @param params 
   * @returns create 
   */
  async create(params: CreateRoomInput): Promise<Room> {
    try {
      const { number, facilityId } = params;
      const oldRoom = await this.findOneByNo(number);
      if (oldRoom) {
        throw new Error(`Room is already exist with Number: ${number}`);
      }
      const roomInstance = this.roomRepo.create(params);
      const { facility } = await this.facilityService.GetFacility(facilityId);
      roomInstance.facility = facility
      roomInstance.practiceId = facility?.practiceId
      return await this.roomRepo.save(roomInstance)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  /**
   * Updates room service
   * @param params 
   * @returns update 
   */
  async update(params: UpdateRoomInput): Promise<Room> {
    try {
      const { id, number, facilityId, name } = params || {}
      const oldRoom = await this.findOneByNo(number, id);
      if (oldRoom) {
        throw new Error(`Room is already exist with Number: ${number}`);
      }
      const roomInstance = await this.findOne(id);
      const { facility } = await this.facilityService.GetFacility(facilityId);
      roomInstance.facility = facility
      roomInstance.facilityId = facility?.id
      roomInstance.practiceId = facility?.practiceId
      return await this.roomRepo.save({ ...roomInstance, number, name })
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Removes room service
   * @param id 
   * @returns remove 
   */
  async remove(id: string): Promise<Room> {
    try {
      const room = await this.findOne(id);
      await this.roomRepo.delete(id);
      return room;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

}
