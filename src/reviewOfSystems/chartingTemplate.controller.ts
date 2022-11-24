import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
//services
//inputs
import { File } from '../aws/dto/file-input.dto';
import { UpdateAttachmentMediaInput, UploadImageInput } from 'src/attachments/dto/update-attachment.input';
//helper
import { mediaFilesFilter, mediaFilesInter } from '../lib/helper';
//payloads
import { ChartingTemplateService } from './services/chartingTemplate.service';
import { QuestionTemplatePayload } from './dto/questionTemplate-payload.dto';
import { TemplateType } from 'src/lib/constants';
import { AttachmentType } from 'src/attachments/entities/attachment.entity';
@Controller('charting')
export class ChartingTemplateController {
  constructor(private readonly chartingTemplateService: ChartingTemplateService) { }


  @UseInterceptors(ClassSerializerInterceptor)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: mediaFilesFilter
  }))
  @ApiExcludeEndpoint()
  async uploadMedia(@UploadedFile() file: File, @Body() updateAttachmentMediaInput: UploadImageInput): Promise<QuestionTemplatePayload> {
    const { name } = updateAttachmentMediaInput
    const { template } = await this.chartingTemplateService.create({ templateType: TemplateType.ANATOMICAL_DRAWINGS, templateName: name })
    await this.chartingTemplateService.uploadChartingMedia(file, { type: AttachmentType.CHARTING_TEMPLATE, typeId: template?.id })
    return {
      template,
      response: { status: 200, message: 'Patient attachment created successfully' }
    }
  }

  // @Delete('image/:id')
  // @ApiExcludeEndpoint()
  // async remove(@Param('id') id: string) {
  //   await this.chartingTemplateService.removePatientMedia(id)
  //   return { status: 200, message: 'Patient attachment deleted successfully' }
  // }

  // @UseInterceptors(ClassSerializerInterceptor)
  // @Post('image/update')
  // @UseInterceptors(FileInterceptor('file', {
  //   fileFilter: mediaFilesInter
  // }))
  // @ApiExcludeEndpoint()
  // async updateMedia(@UploadedFile() file: File, @Body() updateAttachmentMediaInput: UpdateAttachmentMediaInput): Promise<QuestionTemplatePayload> {
  //   const template = await this.chartingTemplateService.updatePatientMedia(file, updateAttachmentMediaInput)
  //   return {
  //     template,
  //     response: { status: 200, message: 'Patient attachment updated successfully' }
  //   }
  // }

  // @Get('image/:id')
  // @ApiExcludeEndpoint()
  // async getMedia(@Param('id') id: string) {
  //   const preSignedUrl = await this.chartingTemplateService.getPatientMedia(id)
  //   return { status: 200, message: 'Patient attachment fetched successfully' }
  // }


}