import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AttachmentsModule } from "src/attachments/attachments.module";
import { Attachment } from "src/attachments/entities/attachment.entity";
import { AttachmentMetadata } from "src/attachments/entities/attachmentMetadata.entity";
import { PaginationModule } from "src/pagination/pagination.module";
import { UsersModule } from "src/users/users.module";
import { AwsProvider } from "../aws/aws-provider";
import { AwsService } from "./aws.service";
import { PublicAwsService } from "./publicAws.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Attachment, AttachmentMetadata]),
    PaginationModule,
    forwardRef(() => UsersModule),
    forwardRef(() => AttachmentsModule)
  ],
  providers: [AwsProvider, AwsService, PublicAwsService],
  exports: [AwsService, PublicAwsService]
})
export class AwsModule { }