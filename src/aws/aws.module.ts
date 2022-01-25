import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AttachmentsResolver } from "src/attachments/attachments.resolver";
import { AttachmentsService } from "src/attachments/attachments.service";
import { Attachment } from "src/attachments/entities/attachment.entity";
import { UsersModule } from "src/users/users.module";
import { AwsProvider } from "../aws/aws-provider";
import { AwsService } from "./aws.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Attachment]),
    forwardRef(() => UsersModule)
  ],
  providers: [AwsProvider, AwsService, AttachmentsResolver, AttachmentsService],
  exports: [AwsService]
})
export class AwsModule { }