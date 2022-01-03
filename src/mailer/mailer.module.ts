import { Module } from '@nestjs/common';
import { RedisModule } from 'src/redis/redis.module';
import { MailerService } from './mailer.service';
import { SendGridMailer } from './send-grid-mailer';

@Module({
  imports: [RedisModule],
  providers: [MailerService, SendGridMailer],
  exports: [MailerService, SendGridMailer]
})
export class MailerModule { }
