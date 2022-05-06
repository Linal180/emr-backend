import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
//user import
import { UpdateAttachmentMediaInput } from 'src/attachments/dto/update-attachment.input';
import { File } from 'src/aws/dto/file-input.dto';
import { mediaFilesFilter, mediaFilesInter } from 'src/lib/helper';
import { StaffPayload } from '../dto/staff-payload.dto';
import { StaffService } from '../services/staff.service';

@Controller('staff')
export class StaffController {
    constructor(private readonly staffService: StaffService) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        fileFilter: mediaFilesFilter
    }))
    async uploadMedia(@UploadedFile() file: File, @Body() updateAttachmentMediaInput: UpdateAttachmentMediaInput): Promise<StaffPayload> {
        const staff = await this.staffService.uploadStaffMedia(file, updateAttachmentMediaInput)
        return {
            staff,
            response: { status: 200, message: 'Staff attachment created successfully' }
        }
    }

    @Delete('image/:id')
    async remove(@Param('id') id: string) {
        await this.staffService.removeStaffMedia(id)
        return { status: 200, message: 'Staff attachment deleted successfully' }
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('image/update')
    @UseInterceptors(FileInterceptor('file', {
        fileFilter: mediaFilesInter
    }))
    async updateMedia(@UploadedFile() file: File, @Body() updateAttachmentMediaInput: UpdateAttachmentMediaInput): Promise<StaffPayload> {
        const staff = await this.staffService.updateStaffMedia(file, updateAttachmentMediaInput)
        return {
            staff,
            response: { status: 200, message: 'Staff attachment updated successfully' }
        }
    }

    @Get('image/:id')
    async getMedia(@Param('id') id: string) {
        await this.staffService.getStaffMedia(id)
        return { status: 200, message: 'Staff attachment fetched successfully' }
    }

}