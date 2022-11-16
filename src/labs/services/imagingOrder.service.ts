import { Connection, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { forwardRef, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
//entities
import { ImagingOrder } from "../entities/imagingOrder.entity";
//services
import { ImagingOrderTestService } from "./imagingOrderTest.service";
import { PaginationService } from "src/pagination/pagination.service";
import { PatientService } from "src/patients/services/patient.service";
import { AppointmentService } from "src/appointments/services/appointment.service";
import { ProblemService } from "src/patientCharting/services/patientProblems.service";
//payloads
import { FindAllImagingOrderPayload } from "../dto/image-order.payload";
//inputs
import { CreateImagingOrderInput, FindAllImagingOrderInput, UpdateImagingOrderInput } from "../dto/image-order.input";

@Injectable()
export class ImagingOrderService {
  constructor(
    @InjectRepository(ImagingOrder)
    private imagingOrderRepo: Repository<ImagingOrder>,
    private readonly connection: Connection,
    private readonly patientService: PatientService,
    private readonly paginationService: PaginationService,
    private readonly appointmentService: AppointmentService,
    @Inject(forwardRef(() => ProblemService))
    private readonly problemService: ProblemService,
    @Inject(forwardRef(() => ImagingOrderTestService))
    private readonly imagingOrderTestService: ImagingOrderTestService,
  ) { }

  /**
   * Finds all
   * @param params 
   * @returns all 
   */
  async findAll(params: FindAllImagingOrderInput): Promise<FindAllImagingOrderPayload> {
    try {

      const { paginationOptions, searchQuery } = params || {}
      const response = await this.paginationService.willPaginate<ImagingOrder>(this.imagingOrderRepo, {
        paginationOptions, associatedToField: {
          filterType: "stringFilter", columnValue: searchQuery, columnName: 'orderNumber',
        }, associatedTo: 'ImagingOrder'
      })

      const { data: imagingOrders, ...pagination } = response;

      return {
        pagination,
        imagingOrders
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
  async findOne(id: string): Promise<ImagingOrder> {
    return await this.imagingOrderRepo.findOne(id);
  }

  /**
   * Creates imaging test service
   * @param params 
   * @returns create 
   */
  async create(params: CreateImagingOrderInput): Promise<ImagingOrder> {
    //Transaction start
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { patientId, appointmentId, imagingTests, problemId, ...rest } = params

      //create imaging order
      const imagingTestInstance = this.imagingOrderRepo.create(rest);

      // associate appointment
      if (appointmentId) {
        const appointmentInstance = await this.appointmentService.findOne(appointmentId)
        imagingTestInstance.appointment = appointmentInstance
        imagingTestInstance.appointmentId = appointmentInstance?.id
      }

      // associate problem
      if (problemId) {
        const problemInstance = await this.problemService.findOne(problemId)
        imagingTestInstance.patientProblem = problemInstance
        imagingTestInstance.patientProblemId = problemInstance?.id
      }

      // associate patient
      if (patientId) {
        const patientInstance = await this.patientService.findOne(patientId);
        imagingTestInstance.patient = patientInstance
        imagingTestInstance.patientId = patientInstance?.id
      }
      //save imaging order
      const imagingOrder = await this.imagingOrderRepo.save(imagingTestInstance)

      // associate imaging order test
      if (imagingTests?.length) {
        await Promise.all(imagingTests?.map(async (imagingTestId) => {
          return await this.imagingOrderTestService.create({ imagingTestId, imagingOrderId: imagingOrder?.id })
        }));
      }

      await queryRunner.commitTransaction();
      return imagingOrder
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Updates imaging test service
   * @param params 
   * @returns update 
   */
  async update(params: UpdateImagingOrderInput): Promise<ImagingOrder> {
    //Transaction start
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { id, patientId, appointmentId, imagingTests, problemId, ...rest } = params

      //create imaging order
      const imagingTestInstance = await this.findOne(id);

      if (!imagingTestInstance) {
        throw new Error("Imaging Test not found");
      }

      // associate appointment
      if (appointmentId) {
        const appointmentInstance = await this.appointmentService.findOne(appointmentId)
        imagingTestInstance.appointment = appointmentInstance
        imagingTestInstance.appointmentId = appointmentInstance?.id
      }

      // associate problem
      if (problemId) {
        const problemInstance = await this.problemService.findOne(problemId)
        imagingTestInstance.patientProblem = problemInstance
        imagingTestInstance.patientProblemId = problemInstance?.id
      }

      // associate patient
      if (patientId) {
        const patientInstance = await this.patientService.findOne(patientId);
        imagingTestInstance.patient = patientInstance
        imagingTestInstance.patientId = patientInstance?.id
      }

      //save imaging order
      const imagingOrder = await this.imagingOrderRepo.save({ ...imagingTestInstance, ...rest })

      // associate imaging order test
      if (imagingTests?.length) {
        await Promise.all(imagingTests?.map(async (imagingTestId) => {
          return await this.imagingOrderTestService.create({ imagingTestId, imagingOrderId: imagingOrder?.id })
        }));
      }
      await queryRunner.commitTransaction();
      return imagingOrder
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Removes imaging test service
   * @param id 
   * @returns remove 
   */
  async remove(id: string): Promise<ImagingOrder> {
    try {
      const imagingTestInstance = await this.findOne(id);
      await this.imagingOrderRepo.delete(id);
      return imagingTestInstance;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds by problem id
   * @param patientProblemId 
   * @returns by problem id 
   */
  async findByProblemId(patientProblemId: string): Promise<ImagingOrder[]> {
    return await this.imagingOrderRepo.find({ patientProblemId })
  }

  async removeByProblemId(patientProblemId: string) {
    const imagingOrder = await this.imagingOrderRepo.find({ patientProblemId });
    await this.imagingOrderRepo.remove(imagingOrder)
  }
}