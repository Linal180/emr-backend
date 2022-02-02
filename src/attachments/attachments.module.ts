import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwsModule } from 'src/aws/aws.module';
import { UsersModule } from 'src/users/users.module';
import { UtilsModule } from 'src/util/utils.module';
import { AttachmentsResolver } from './attachments.resolver';
import { AttachmentsService } from './attachments.service';
import { Attachment } from './entities/attachment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attachment]),
    AwsModule,
    UtilsModule,
    forwardRef(() => UsersModule)
  ],
  providers: [AttachmentsService, AttachmentsResolver],
  exports: [AttachmentsService],
})
export class AttachmentsModule { }
