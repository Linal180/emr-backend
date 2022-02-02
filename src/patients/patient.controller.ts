import { Controller, Post, Body, Param, Delete, UploadedFile, UseInterceptors, ClassSerializerInterceptor, UseGuards, SetMetadata, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { mediaFilesFilter, mediaFilesInter } from '../lib/helper';
import { JwtAuthRestFulGuard } from 'src/users/auth/jwt-auth-restful.guard';
import RestFulRoleGuard from 'src/users/auth/roleRestful.guard';
import { PatientService } from './services/patient.service';
import { PatientPayload } from './dto/patient-payload.dto';
import { UpdateAttachmentMediaInput } from 'src/attachments/dto/update-attachment.input';
import {File} from '../aws/dto/file-input.dto'

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) { }


  @UseInterceptors(ClassSerializerInterceptor)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: mediaFilesFilter
  }))
  async uploadMedia(@UploadedFile() file: File, @Body() updateAttachmentMediaInput: UpdateAttachmentMediaInput): Promise<PatientPayload> {
    console.log("updateAttachmentMediaInput1", updateAttachmentMediaInput);
    const patient = await this.patientService.uploadPatientMedia(file, updateAttachmentMediaInput)
    return {
      ...patient,
      response: { status: 200, message: 'Patient attachment created successfully' }
    }
  }

  @Delete('image/:id')
  async remove(@Param('id') id: string) {
    await this.patientService.removePatientMedia(id)
    return { status: 200, message: 'Patient attachment deleted successfully' }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('image/update')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: mediaFilesInter
  }))
  async updateMedia(@UploadedFile() file: File, @Body() updateAttachmentMediaInput: UpdateAttachmentMediaInput): Promise<PatientPayload> {
    const patient = await this.patientService.updatePatientMedia(file, updateAttachmentMediaInput)
    return {
      ...patient,
      response: { status: 200, message: 'Patient attachment updated successfully' }
    }
  }

  @Get('image/:id')
  async getMedia(@Param('id') id: string) {
    const preSignedUrl = await this.patientService.getPatientMedia(id)
    return { status: 200, message: 'Patient attachment fetched successfully' }
  }

}