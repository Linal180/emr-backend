import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateAttachmentMediaInput } from 'src/attachments/dto/update-attachment.input';
import { File } from '../aws/dto/file-input.dto';
import { mediaFilesFilter, mediaFilesInter } from '../lib/helper';
import { LabTestObservationPayload } from './dto/labTestObservation-payload.dto';
import { LabTestsObservationsService } from './services/labTestObservation.service';

@Controller('labs')
export class LabTestsObservationsController {
  constructor(private readonly labTestsObservationsService: LabTestsObservationsService) { }


  @UseInterceptors(ClassSerializerInterceptor)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: mediaFilesFilter
  }))
  async uploadMedia(@UploadedFile() file: File, @Body() updateAttachmentMediaInput: UpdateAttachmentMediaInput): Promise<LabTestObservationPayload> {
    console.log("updateAttachmentMediaInput", updateAttachmentMediaInput);
    const labTestObservation = await this.labTestsObservationsService.uploadLabsMedia(file, updateAttachmentMediaInput)
    return {
      ...labTestObservation,
      response: { status: 200, message: 'Lab result attachment created successfully' }
    }
  }

  @Delete('image/:id')
  async remove(@Param('id') id: string) {
    await this.labTestsObservationsService.removeLabsMedia(id)
    return { status: 200, message: 'Lab result attachment deleted successfully' }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('image/update')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: mediaFilesInter
  }))
  async updateMedia(@UploadedFile() file: File, @Body() updateAttachmentMediaInput: UpdateAttachmentMediaInput): Promise<LabTestObservationPayload> {
    const labTestObservation = await this.labTestsObservationsService.updateLabsMedia(file, updateAttachmentMediaInput)
    return {
      ...labTestObservation,
      response: { status: 200, message: 'Lab result attachment updated successfully' }
    }
  }

  @Get('image/:id')
  async getMedia(@Param('id') id: string) {
    const preSignedUrl = await this.labTestsObservationsService.getLabsMedia(id)
    return {
      preSignedUrl,
      response: { status: 200, message: 'Lab result attachment fetched successfully' }
    }
  }

}