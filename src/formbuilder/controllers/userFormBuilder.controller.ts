import { Body, ClassSerializerInterceptor, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UpdateAttachmentMediaInput } from "src/attachments/dto/update-attachment.input";
//user import
import { mediaFilesFilter } from "src/lib/helper";
import { UserFormPayload } from "../dto/userForms.dto";
import { UserFormsService } from "../services/userForms.service";
import { File } from 'src/aws/dto/file-input.dto';
import { AttachmentPayload } from "src/attachments/dto/attachment-payload.dto";


@Controller('user-form')
export class UserFormController {

	constructor(private readonly userFormsService: UserFormsService) { }

	@UseInterceptors(ClassSerializerInterceptor)
	@Post('upload')
	@UseInterceptors(FileInterceptor('file', {
		fileFilter: mediaFilesFilter
	}))
	async uploadMedia(@UploadedFile() file: File, @Body() updateAttachmentMediaInput: UpdateAttachmentMediaInput): Promise<AttachmentPayload> {
		console.log("uploadAttachment => ", updateAttachmentMediaInput);
		const attachment = await this.userFormsService.uploadUserFormMedia(file, updateAttachmentMediaInput)
		return {
			attachment,
			response: { status: 200, message: 'User Form attachments created successfully.' }
		}
	}
}