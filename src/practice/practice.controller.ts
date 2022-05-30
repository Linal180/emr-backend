import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { UpdateAttachmentMediaInput } from 'src/attachments/dto/update-attachment.input';
import { File } from '../aws/dto/file-input.dto';
import { mediaFilesFilter, mediaFilesInter } from '../lib/helper';
import { PracticePayload } from './dto/practice-payload.dto';
import { PracticeService } from './practice.service';

@Controller('practices')
export class PracticeController {
  constructor(private readonly practiceService: PracticeService) { }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: mediaFilesFilter
  }))
  @ApiExcludeEndpoint()
  async uploadMedia(@UploadedFile() file: File, @Body() updateAttachmentMediaInput: UpdateAttachmentMediaInput): Promise<PracticePayload> {
    
    const practice = await this.practiceService.uploadPracticeMedia(file, updateAttachmentMediaInput)
    return {
      ...practice,
      response: { status: 200, message: 'Practice attachment created successfully' }
    }
  }

  @Delete('image/:id')
  @ApiExcludeEndpoint()
  async remove(@Param('id') id: string) {
    await this.practiceService.removePracticeMedia(id)
    return { status: 200, message: 'Practice attachment deleted successfully' }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('image/update')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: mediaFilesInter
  }))
  @ApiExcludeEndpoint()
  async updateMedia(@UploadedFile() file: File, @Body() updateAttachmentMediaInput: UpdateAttachmentMediaInput): Promise<PracticePayload> {
    const practice = await this.practiceService.updatePracticeMedia(file, updateAttachmentMediaInput)
    return {
      ...practice,
      response: { status: 200, message: 'Practice attachment updated successfully' }
    }
  }

  @Get('image/:id')
  @ApiExcludeEndpoint()
  async getMedia(@Param('id') id: string) {
    const preSignedUrl = await this.practiceService.getPracticeMedia(id)
    return { status: 200, message: 'Practice attachment fetched successfully' }
  }
}