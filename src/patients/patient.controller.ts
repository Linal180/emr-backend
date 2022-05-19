import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { UpdateAttachmentMediaInput } from 'src/attachments/dto/update-attachment.input';
import { File } from '../aws/dto/file-input.dto';
import { mediaFilesFilter, mediaFilesInter } from '../lib/helper';
import { PatientPayload } from './dto/patient-payload.dto';
import { PatientService } from './services/patient.service';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) { }

  
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: mediaFilesFilter
  }))
  @ApiExcludeEndpoint()
  async uploadMedia(@UploadedFile() file: File, @Body() updateAttachmentMediaInput: UpdateAttachmentMediaInput): Promise<PatientPayload> {
    console.log("updateAttachmentMediaInput1", updateAttachmentMediaInput);
    const patient = await this.patientService.uploadPatientMedia(file, updateAttachmentMediaInput)
    return {
      ...patient,
      response: { status: 200, message: 'Patient attachment created successfully' }
    }
  }

  @Delete('image/:id')
  @ApiExcludeEndpoint()
  async remove(@Param('id') id: string) {
    await this.patientService.removePatientMedia(id)
    return { status: 200, message: 'Patient attachment deleted successfully' }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('image/update')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: mediaFilesInter
  }))
  @ApiExcludeEndpoint()
  async updateMedia(@UploadedFile() file: File, @Body() updateAttachmentMediaInput: UpdateAttachmentMediaInput): Promise<PatientPayload> {
    const patient = await this.patientService.updatePatientMedia(file, updateAttachmentMediaInput)
    return {
      ...patient,
      response: { status: 200, message: 'Patient attachment updated successfully' }
    }
  }

  @Get('image/:id')
  @ApiExcludeEndpoint()
  async getMedia(@Param('id') id: string) {
    const preSignedUrl = await this.patientService.getPatientMedia(id)
    return { status: 200, message: 'Patient attachment fetched successfully' }
  }

  @Get('/:limit/:page')
  async getPatients(@Param('limit') limit: number, @Param('page') page: number) {
    const patientsResponse = await this.patientService.fetchAllFhirPatients({ limit,page })
    return patientsResponse
  }

}