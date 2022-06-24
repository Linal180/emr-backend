import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
//user import
import { UpdateAttachmentMediaInput } from 'src/attachments/dto/update-attachment.input';
import { File } from 'src/aws/dto/file-input.dto';
import { mediaFilesFilter, mediaFilesInter } from 'src/lib/helper';
import { DoctorPayload } from '../dto/doctor-payload.dto';
import { DoctorService } from '../services/doctor.service';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) { }


  @UseInterceptors(ClassSerializerInterceptor)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: mediaFilesFilter
  }))
  async uploadMedia(@UploadedFile() file: File, @Body() updateAttachmentMediaInput: UpdateAttachmentMediaInput): Promise<DoctorPayload> {
    const doctor = await this.doctorService.uploadDoctorMedia(file, updateAttachmentMediaInput)
    return {
      ...doctor,
      response: { status: 200, message: 'Doctor attachment created successfully' }
    }
  }

  @Delete('image/:id')
  async remove(@Param('id') id: string) {
    await this.doctorService.removeDoctorMedia(id)
    return { status: 200, message: 'Doctor attachment deleted successfully' }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('image/update')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: mediaFilesInter
  }))
  async updateMedia(@UploadedFile() file: File, @Body() updateAttachmentMediaInput: UpdateAttachmentMediaInput): Promise<DoctorPayload> {
    const doctor = await this.doctorService.updateDoctorMedia(file, updateAttachmentMediaInput)
    return {
      ...doctor,
      response: { status: 200, message: 'Doctor attachment updated successfully' }
    }
  }

  @Get('image/:id')
  async getMedia(@Param('id') id: string) {
    const preSignedUrl = await this.doctorService.getDoctorMedia(id)
    return { status: 200, message: 'Doctor attachment fetched successfully' }
  }

}