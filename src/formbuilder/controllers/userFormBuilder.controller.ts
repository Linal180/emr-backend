import { Body, ClassSerializerInterceptor, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
//user import
import { UpdateAttachmentMediaInput } from "src/attachments/dto/update-attachment.input";
import { mediaFilesFilter } from "src/lib/helper";
import { FormAttachmentPayload } from "../dto/userForms.dto";
import { UserFormsService } from "../services/userForms.service";
import { File } from 'src/aws/dto/file-input.dto';

@Controller('user-form')
export class UserFormController {

	constructor(private readonly userFormsService: UserFormsService) { }

	@UseInterceptors(ClassSerializerInterceptor)
	@Post('upload')
	@UseInterceptors(FileInterceptor('file', {
		fileFilter: mediaFilesFilter
	}))
	async uploadMedia(@UploadedFile() file: File, @Body() updateAttachmentMediaInput: UpdateAttachmentMediaInput): Promise<FormAttachmentPayload> {
		const attachment = await this.userFormsService.uploadUserFormMedia(file, updateAttachmentMediaInput);
		return {
			attachment,
			response: { status: 200, message: 'User Form attachment created successfully.' }
		}
	}
}