import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserLogInput } from "../inputs/user-logs.input";
import { UserLogs } from "../entities/user-logs.entity.logs";


@Injectable()
export class UserLogsService {
  constructor(
    @InjectRepository(UserLogs, process.env.DATABASE_LOG_ID || 'logs')
    private usersRepository: Repository<UserLogs>) { }

  async create(body: UserLogInput): Promise<UserLogs> {
    try {
      console.log('body => ', body )
      const userLogInstance = this.usersRepository.create(body)
      return await this.usersRepository.save(userLogInstance)
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(body: UserLogs): Promise<UserLogs> {
    try {
      console.log('body => ', body )
      return await this.usersRepository.save(body)
    } catch (error) {
      throw new Error(error);
    }
  }
}