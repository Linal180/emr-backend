import { Module } from '@nestjs/common';
//modules
import { UtilsModule } from 'src/util/utils.module';
//resolver
import { SmsResolver } from './sms.resolver';
//service
import { SmsService } from './sms.service';

@Module({
  imports: [UtilsModule],
  providers: [SmsResolver, SmsService],
})
export class SmsModule { }
