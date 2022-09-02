import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Ip, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateAttachmentMediaInput } from 'src/attachments/dto/update-attachment.input';
//user import
import { mediaFilesFilter, mediaFilesInter } from 'src/lib/helper';
import { UsersService } from './services/users.service';
import { File } from 'src/aws/dto/file-input.dto';
import { UserPayload } from './dto/register-user-payload.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: mediaFilesFilter
  }))
  async uploadMedia(@Ip() ip, @UploadedFile() file: File, @Body() updateAttachmentMediaInput: UpdateAttachmentMediaInput): Promise<UserPayload> {
    const user = await this.usersService.uploadUserMedia(file, updateAttachmentMediaInput)
    return {
      user,
      response: { status: 200, message: 'User attachment created successfully' }
    }
  }

  @Delete('image/:id')
  async remove(@Param('id') id: string) {
    await this.usersService.removeUserMedia(id)
    return { status: 200, message: 'User attachment deleted successfully' }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('image/update')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: mediaFilesInter
  }))
  async updateMedia(@UploadedFile() file: File, @Body() updateAttachmentMediaInput: UpdateAttachmentMediaInput): Promise<UserPayload> {
    const user = await this.usersService.updateUserMedia(file, updateAttachmentMediaInput)
    return {
      user,
      response: { status: 200, message: 'User attachment updated successfully' }
    }
  }

  @Get('image/:id')
  async getMedia(@Param('id') id: string) {
    const preSignedUrl = await this.usersService.getUserMedia(id)
    return { status: 200, message: 'User attachment fetched successfully' }
  }

}
