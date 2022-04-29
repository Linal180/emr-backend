import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateLabTestObservationInput from '../dto/create-lab-test-observation-input.dto';
import { LabTestObservationPayload } from '../dto/labTestObservation-payload.dto';
import UpdateLabTestObservationInput, { RemoveLabTestObservation } from '../dto/update-lab-test-observationItem.input';
import { LabTests } from '../entities/labTests.entity';
import { Observations } from '../entities/observations.entity';
import { LabTestsService } from './labTests.service';
import { LoincCodesService } from './loincCodes.service';

@Injectable()
export class LabTestsObservationsService {
  constructor(
    @InjectRepository(Observations)
    private ObservationsRepository: Repository<Observations>,
    private readonly labTestsService: LabTestsService,
    private readonly loincCodesService: LoincCodesService,
  ) { }

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

  async mapLabTestWithResults(labTestObservationInstance: Observations[], labTest: LabTests){
    return labTestObservationInstance.map((item)=> {
      item.labTest = labTest
      return item
    })

  }

  async updateLabTestObservation(updateLabTestObservationInput: UpdateLabTestObservationInput): Promise<Observations[]> {
      try {
      //get lab test
      const labTest = await this.labTestsService.findOne(updateLabTestObservationInput.labTestId)
      for (let index = 0; index < updateLabTestObservationInput.updateLabTestObservationItemInput.length; index++) {
        const element = updateLabTestObservationInput.updateLabTestObservationItemInput[index];
        const labTestObservationInstance = await this.findOne(element.id)
        const labTestObservationInstanceRes = await this.mapLabTestWithResults([labTestObservationInstance], labTest)
        console.log("labTestObservationInstanceRes",labTestObservationInstanceRes);
        await this.ObservationsRepository.save(labTestObservationInstanceRes)
      }
      return
      } catch (error) {
        throw new InternalServerErrorException(error);
      }
  }

  async findOne(id: string): Promise<Observations> {
    const labTestObservation = await this.ObservationsRepository.findOne(id);
    if(labTestObservation){
      return labTestObservation
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Lab test observation not found',
    });
  }

  async GetLabTestObservation(id: string): Promise<LabTestObservationPayload> {
    const labTestObservation = await this.findOne(id);
    if (labTestObservation) {
      return {labTestObservation}
    }
  }

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


  async removeLabTest({ id }: RemoveLabTestObservation) {
    try {
      const labTest = await this.findOne(id)
      if (labTest) {
        await this.ObservationsRepository.delete(labTest.id)
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

}
