import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
//modules
import { AwsModule } from 'src/aws/aws.module';
import { UtilsModule } from 'src/util/utils.module';
import { UsersModule } from 'src/users/users.module';
import { PracticeModule } from 'src/practice/practice.module';
import { PaginationModule } from 'src/pagination/pagination.module';
//entities
import { Attachment } from './entities/attachment.entity';
import { DocumentType } from './entities/documentType.entity';
import { AttachmentMetadata } from './entities/attachmentMetadata.entity';
//resolvers
import { AttachmentsResolver } from './resolvers/attachments.resolver';
import { DocumentTypesResolver } from './resolvers/documentTypes.resolver';
//services
import { AttachmentsService } from './services/attachments.service';
import { DocumentTypesService } from './services/documentType.service';
import { AttachmentMetaDataService } from './services/attachmentMetaData.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attachment, AttachmentMetadata, DocumentType]),
    forwardRef(() => AwsModule),
    forwardRef(() => UsersModule),
    forwardRef(() => PracticeModule),
    UtilsModule,
    PaginationModule,
  ],
  providers: [
    AttachmentsService,
    AttachmentsResolver,
    DocumentTypesService,
    DocumentTypesResolver,
    AttachmentMetaDataService
  ],
  exports: [AttachmentsService, DocumentTypesService],
})
export class AttachmentsModule { }
