import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
//user imports
import { User } from 'src/users/entities/user.entity'
import { UserLogsPayload } from "../dto/user-logs.payload";
import { UserLogs } from "../entities/user-logs.entity.logs";
import { Patient } from "src/patients/entities/patient.entity";
import { UsersService } from "src/users/services/users.service";
import { PaginationService } from "src/pagination/pagination.service";
import { PatientService } from "src/patients/services/patient.service";
import { CreateUserLogInput, UserLogsInput } from "../inputs/user-logs.input";


@Injectable()
export class UserLogsService {
  constructor(
    @InjectRepository(UserLogs, process.env.DATABASE_LOG_ID || 'logs')
    private usersRepository: Repository<UserLogs>,
    private readonly paginationService: PaginationService,
    private readonly usersService: UsersService,
    private readonly patientService: PatientService
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
      const { paginationOptions, moduleType, patientId, userId, endDate: logEndDate, startDate: logStartDate } = params

      const paginationResponse = await this.paginationService.willPaginate<UserLogs>(this.usersRepository, {
        paginationOptions, logUserId: userId, patientId, moduleType, logEndDate, logStartDate
      })

      const { data, limit, page, totalCount, totalPages } = paginationResponse

      let logUser = ''
      let logPatient = ''
      let user: User | null = null
      let patient: Patient | null = null
      const users: UserLogs[] = []

      for (let userLogs of data) {
        const { userId, patientId } = userLogs

        if (userId || patientId) {
          let obj = userLogs;

          if (userId) {
            if (logUser === userId) {
              obj.user = user
            }
            else {
              logUser = userId
              const userInstance = await this.usersService.findById(userId)
              user = userInstance
              obj.user = userInstance
            }
          }

          if (patientId) {

            if (patientId === logPatient) {
              obj.patient = patient
            }

            else {
              logPatient = patientId
              const patientInstance = await this.patientService.GetPatient(patientId)
              patient = patientInstance?.patient
              obj.patient = patientInstance?.patient
            }
          }

          users.push(obj)
        }

        else {
          users.push({
            ...userLogs,
            user: null,
            patient: null
          })
        }
      }

      return {
        pagination: {
          limit,
          page,
          totalCount,
          totalPages
        },
        userLogs: users,
      }

    } catch (error) {
      throw new InternalServerErrorException(error);
    }

  }
}