import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentModule } from './appointments/appointment.module';
import { AttachmentsModule } from './attachments/attachments.module';
import { AwsModule } from './aws/aws.module';
import configuration from './config/configuration';
import { DatabaseConfig } from './database.config';
import { FacilityModule } from './facilities/facility.module';
import { MailerModule } from './mailer/mailer.module';
import { PaginationModule } from './pagination/pagination.module';
import { PracticeModule } from './practice/practice.module';
import { ProviderModule } from './providers/provider.module';
import { UsersModule } from './users/users.module';
import { UtilsModule } from './util/utils.module';

@Module({
  imports: [
    UsersModule,
    FacilityModule,
    MailerModule,
    PaginationModule,
    ProviderModule,
    PracticeModule,
    AwsModule,
    AttachmentsModule,
    AppointmentModule,
    UtilsModule,
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
