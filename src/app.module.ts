import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
//modules
import { AwsModule } from './aws/aws.module';
import { SmsModule } from './sms/sms.module';
import { LabModule } from './labs/labs.module';
import { UtilsModule } from './util/utils.module';
import { UsersModule } from './users/users.module';
import { MailerModule } from './mailer/mailer.module';
import { PaymentModule } from './payment/payment.module';
import { BillingModule } from './billings/billing.module';
import { UserLogsModule } from './userLogs/userLogs.module'
import { PracticeModule } from './practice/practice.module';
import { ShortUrlModule } from './shortUrl/shortUrl.module';
import { ProviderModule } from './providers/provider.module';
import { FacilityModule } from './facilities/facility.module';
import { InsuranceModule } from './insurance/insurance.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AgreementModule } from './agreements/agreement.module';
import { PaginationModule } from './pagination/pagination.module';
import { FormBuilderModule } from './formbuilder/formbuilder.module'
import { AttachmentsModule } from './attachments/attachments.module';
import { FeeScheduleModule } from './feeSchedule/feeSchedule.module';
import { AppointmentModule } from './appointments/appointment.module';
import { SocialHistoryModule } from './socialHistory/socialHistory.module';
import { ProblemChartingModule } from './patientCharting/patientCharting.module';
//configs, 
import { DatabaseConfig } from './database.config';
import configuration from './config/configuration';
import { LogDatabaseConfig } from './logDatabase.config';
//services
import { AppService } from './app.service';
//controller
import { AppController } from './app.controller';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
      introspection: true,
      playground: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      name: process.env.DATABASE_LOG_ID || 'logs',
      useClass: LogDatabaseConfig
    }),
    LabModule,
    AwsModule,
    SmsModule,
    UsersModule,
    UtilsModule,
    MailerModule,
    BillingModule,
    PaymentModule,
    FacilityModule,
    ProviderModule,
    PracticeModule,
    UserLogsModule,
    AgreementModule,
    InsuranceModule,
    DashboardModule,
    PaginationModule,
    FeeScheduleModule,
    AttachmentsModule,
    AppointmentModule,
    FormBuilderModule,
    ProblemChartingModule,
    ShortUrlModule,
    SocialHistoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
