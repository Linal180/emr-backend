import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwsModule } from 'src/aws/aws.module';
import { PaginationModule } from 'src/pagination/pagination.module';
import { PracticeModule } from 'src/practice/practice.module';
import { UsersModule } from 'src/users/users.module';
import { UtilsModule } from 'src/util/utils.module';
import { AttachmentsResolver } from './resolvers/attachments.resolver';
import { AttachmentsService } from './services/attachments.service';
import { Attachment } from './entities/attachment.entity';
import { AttachmentMetadata } from './entities/attachmentMetadata.entity';
import { DocumentType } from './entities/documentType.entity';
import { DocumentTypesService } from './services/documentType.service';
import { DocumentTypesResolver } from './resolvers/documentTypes.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attachment, AttachmentMetadata, DocumentType]),
    UtilsModule,
    PaginationModule,
    forwardRef(() => AwsModule),
    forwardRef(() => UsersModule),
    forwardRef(() => PracticeModule),
  ],
  providers: [AttachmentsService, AttachmentsResolver, DocumentTypesService, DocumentTypesResolver],
  exports: [AttachmentsService],
})
export class AttachmentsModule { }
