import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { DatabaseConfig } from './database.config';
import { MailerModule } from './mailer/mailer.module';
import { PaginationModule } from './pagination/pagination.module';
import { UsersModule } from './users/users.module';
import { UtilsModule } from './util/utils.module';

@Module({
  imports: [
    UsersModule,
    MailerModule,
    PaginationModule,
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
