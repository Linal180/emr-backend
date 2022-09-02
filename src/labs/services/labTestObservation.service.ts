import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import * as moment from 'moment';
import * as pdf from 'html-pdf'
import { InjectRepository } from '@nestjs/typeorm';
import { AttachmentsService } from 'src/attachments/services/attachments.service';
import { UpdateAttachmentMediaInput } from 'src/attachments/dto/update-attachment.input';
import { AttachmentType } from 'src/attachments/entities/attachment.entity';
import { UtilsService } from 'src/util/utils.service';
import { Repository } from 'typeorm';
import { File } from '../../aws/dto/file-input.dto';
import CreateLabTestObservationInput from '../dto/create-lab-test-observation-input.dto';
import { LabTestObservationPayload } from '../dto/labTestObservation-payload.dto';
import UpdateLabTestObservationInput, { RemoveLabTestObservation } from '../dto/update-lab-test-observationItem.input';
import { LabTests, LabTestStatus } from '../entities/labTests.entity';
import { Observations, AbnormalFlag } from '../entities/observations.entity';
import { LabTestsService } from './labTests.service';
import { LoincCodesService } from './loincCodes.service';
import { UpdateObservationInput } from '../dto/update-observationItem-input.dto';
import template from "../../lib/templates"
import { MailerService } from 'src/mailer/mailer.service';
import { DocumentTypesService } from 'src/attachments/services/documentType.service';
import { blobToFile } from 'src/lib/helper';

@Injectable()
export class LabTestsObservationsService {
  constructor(
    @InjectRepository(Observations)
    private ObservationsRepository: Repository<Observations>,
    private readonly labTestsService: LabTestsService,
    private readonly utilsService: UtilsService,
    private readonly attachmentsService: AttachmentsService,
    private readonly documentTypeService: DocumentTypesService,
    private readonly loincCodesService: LoincCodesService,
    private readonly mailerService: MailerService
  ) { }

  /**
   * Creates lab test observation
   * @param createLabTestObservationInput 
   * @returns lab test observation 
   */
  async createLabTestObservation(createLabTestObservationInput: CreateLabTestObservationInput): Promise<Observations> {
    try {
      //get lab test
      const labTest = await this.labTestsService.findOne(createLabTestObservationInput.labTestId)
      //create lab test observation
      const labTestObservationInstance = this.ObservationsRepository.create(createLabTestObservationInput.createLabTestObservationItemInput)
      const labTestObservationInstanceRes = await this.mapLabTestWithResults(labTestObservationInstance, labTest)
      await this.ObservationsRepository.save(labTestObservationInstanceRes)
      return
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Maps lab test with results
   * @param labTestObservationInstance 
   * @param labTest 
   * @returns  
   */
  async mapLabTestWithResults(labTestObservationInstance: Observations[], labTest: LabTests) {
    return labTestObservationInstance.map((item) => {
      item.labTest = labTest
      return item
    })
  }

  /**
   * Updates lab test observation
   * @param updateLabTestObservationInput 
   * @returns lab test observation 
   */
  async updateLabTestObservation(updateLabTestObservationInput: UpdateLabTestObservationInput): Promise<Observations[]> {
    try {
      //updating multiple records of lab test observations
      for (let index = 0; index < updateLabTestObservationInput.updateLabTestObservationItemInput.length; index++) {
        const element = updateLabTestObservationInput.updateLabTestObservationItemInput[index];
        if (element.id) {
          await this.utilsService.updateEntityManager(Observations, element.id, element, this.ObservationsRepository)

        } else {
          const createItemInput = [element].map((createItem) => {
            return {
              resultValue: createItem.resultValue,
              resultUnit: createItem.resultUnit,
              normalRange: createItem.normalRange,
              normalRangeUnit: createItem.normalRangeUnit,
              abnormalFlag: createItem.abnormalFlag,
              description: createItem.description,
            }
          })

          await this.createLabTestObservation({
            createLabTestObservationItemInput: createItemInput,
            labTestId: updateLabTestObservationInput.labTestId
          })
        }
      }
      return
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  getBuffer(pdfInstance: any) {
    return new Promise((resolve, reject) => {
      pdfInstance.toBuffer((err, data) => {
        if (err) reject(err)
        resolve(data)
      })
    })
  }

  async syncLabResults(updateObservationInput: UpdateObservationInput): Promise<Observations[]> {
    const { UpdateObservationItemInput } = updateObservationInput
    try {
      const documentType = await this.documentTypeService.fetchDocumentTypeByName('Lab')

      //updating multiple records of lab test observations
      await Promise.all(UpdateObservationItemInput.map(async (observationValues) => {
        const { orderNumber, result, testName } = observationValues
        const labTest = await this.labTestsService.findLabTestByTestAndOrderNo(orderNumber, testName)
        if (labTest?.id) {
          const { testObservations } = labTest
          const { id } = testObservations?.[0] || {}

          if (id) {
            await this.utilsService.updateEntityManager(Observations, id, { ...testObservations?.[0], resultValue: result }, this.ObservationsRepository)
          } else {
            const element = {
              resultValue: result,
              resultUnit: '',
              normalRange: '',
              normalRangeUnit: '',
              abnormalFlag: AbnormalFlag.NONE,
              description: '',
            }
            const createItemInput = [element].map((createItem) => {
              return {
                resultValue: createItem.resultValue,
                resultUnit: createItem.resultUnit,
                normalRange: createItem.normalRange,
                normalRangeUnit: createItem.normalRangeUnit,
                abnormalFlag: createItem.abnormalFlag,
                description: createItem.description,
              }
            })

             await this.createLabTestObservation({
              createLabTestObservationItemInput: createItemInput,
              labTestId: labTest?.id
            })
          }

          return await this.labTestsService.updateLabTest({
            updateLabTestItemInput:
              { id: labTest?.id, collectedDate: moment().format('MM-DD-YYYY'), receivedDate: moment().format('MM-DD-YYYY'), status: LabTestStatus.RESULT_RECEIVED }
          })
        }
      }))

      const orderNumbers = [...new Set(UpdateObservationItemInput.map((value) => value.orderNumber))]
      orderNumbers.map(async (orderNumber) => {
        const labResultPayload = await this.labTestsService.findLabResultInfo(orderNumber)
        const labTests = await Promise.all(labResultPayload.labTests.map(async (labTest) => {
          const testObservations = await this.GetLabTestObservations(labTest.id)
          const test= await this.loincCodesService.findOne(labTest.testId)
          return {
            ...labTest,
            test,
            testObservations
          }
        }))
        const { patientInfo } = labResultPayload
        const { email, firstName, lastName, id: patientId } = patientInfo

        const pdfInstance = await pdf.create(await template({ ...labResultPayload, labTests }), {})
        const buffer = await this.getBuffer(pdfInstance)
        if (email) {
          await this.mailerService.sendLabResultsEmail(email, `${firstName} ${lastName}`, (buffer as Buffer).toString('base64'))
        }

        await this.attachmentsService.uploadAttachment({
          buffer: buffer as Buffer,
          fieldname: 'Lab Result',
          encoding: '',
          mimetype: 'application/pdf',
          originalname: 'Lab Result',
          size: (buffer as Buffer).length
        }, {
          type: AttachmentType.PATIENT,
          typeId: patientId,
          attachmentName: `Lab Result_${orderNumber}`,
          title: 'Lab Order',
          documentTypeId: documentType.documentType.id
        })
      })
      return
    }
    catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds one
   * @param id 
   * @returns one 
   */
  async findOne(id: string): Promise<Observations> {
    const labTestObservation = await this.ObservationsRepository.findOne(id);
    if (labTestObservation) {
      return labTestObservation
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Lab test observation not found',
    });
  }

  /**
   * Gets lab test observation
   * @param id 
   * @returns lab test observation 
   */
  async GetLabTestObservation(id: string): Promise<LabTestObservationPayload> {
    const labTestObservation = await this.findOne(id);
    if (labTestObservation) {
      return { labTestObservation }
    }
  }

  /**
   * Gets lab test observations
   * @param id 
   * @returns lab test observations 
   */
  async GetLabTestObservations(id: string): Promise<Observations[]> {
    const labTestObservations = await this.ObservationsRepository.find({
      where: {
        labTestId: id
      }
    })
    if (labTestObservations) {
      return labTestObservations
    }
  }

  /**
   * Removes lab test observation
   * @param { id } 
   */
  async removeLabTestObservation({ id }: RemoveLabTestObservation) {
    try {
      const labTestObservation = await this.findOne(id)
      if (labTestObservation) {
        await this.ObservationsRepository.delete(labTestObservation.id)
        return
      }
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Lab test observation not found',
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Uploads labs media
   * @param file 
   * @param updateAttachmentMediaInput 
   * @returns labs media 
   */
  async uploadLabsMedia(file: File, updateAttachmentMediaInput: UpdateAttachmentMediaInput): Promise<LabTestObservationPayload> {
    try {
      updateAttachmentMediaInput.type = AttachmentType.lab;
      const attachment = await this.attachmentsService.uploadAttachment(file, updateAttachmentMediaInput)
      const labTestObservation = await this.findOne(updateAttachmentMediaInput.typeId)
      if (attachment) {
        return { labTestObservation };
      }
      throw new PreconditionFailedException({
        status: HttpStatus.PRECONDITION_FAILED,
        error: 'Could not create or upload media',
      });
    }
    catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Removes labs media
   * @param id 
   * @returns  
   */
  async removeLabsMedia(id: string) {
    try {
      return await this.attachmentsService.removeMedia(id)
    }
    catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Updates labs media
   * @param file 
   * @param updateAttachmentMediaInput 
   * @returns labs media 
   */
  async updateLabsMedia(file: File, updateAttachmentMediaInput: UpdateAttachmentMediaInput): Promise<LabTestObservationPayload> {
    try {
      updateAttachmentMediaInput.type = AttachmentType.lab
      const attachment = await this.attachmentsService.updateAttachment(file, updateAttachmentMediaInput)
      const labTestObservation = await this.ObservationsRepository.findOne(updateAttachmentMediaInput.typeId)
      if (attachment) {
        return { labTestObservation }
      }
      throw new PreconditionFailedException({
        status: HttpStatus.PRECONDITION_FAILED,
        error: 'Could not create or upload media',
      });
    }
    catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Gets labs media
   * @param id 
   * @returns  
   */
  async getLabsMedia(id: string) {
    try {
      return await this.attachmentsService.getMedia(id)
    }
    catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

}
