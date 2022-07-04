import { Repository } from "typeorm";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
//user imports
import { UserLogsPayload } from "../dto/user-logs.payload";
import { UserLogs } from "../entities/user-logs.entity.logs";
import { PaginationService } from "src/pagination/pagination.service";
import { CreateUserLogInput, UserLogsInput } from "../inputs/user-logs.input";


@Injectable()
export class UserLogsService {
  constructor(
    @InjectRepository(UserLogs, process.env.DATABASE_LOG_ID || 'logs')
    private usersRepository: Repository<UserLogs>,
    private readonly paginationService: PaginationService,
  ) { }


  /**
   * Creates user logs service
   * @param body 
   * @returns create 
   */
  async create(body: CreateUserLogInput): Promise<UserLogs> {
    try {
      const userLogInstance = this.usersRepository.create(body)
      return await this.usersRepository.save(userLogInstance)
    } catch (error) {
      throw new Error(error);
    }
  }


  async fetchAll(params: UserLogsInput): Promise<UserLogsPayload> {
    try {
      const { paginationOptions } = params
      const paginationResponse = await this.paginationService.willPaginate<UserLogs>(this.usersRepository, { paginationOptions })

      const { data, limit, page, totalCount, totalPages } = paginationResponse
      return {
        pagination: {
          limit,
          page,
          totalCount,
          totalPages
        },
        userLogs: data,
      }

    } catch (error) {
      throw new InternalServerErrorException(error);
    }

  }
}