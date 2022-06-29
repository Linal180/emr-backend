import { Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory } from "@nestjs/typeorm";


@Injectable()
export class LogDatabaseConfig implements TypeOrmOptionsFactory {
  constructor(
    private configService: ConfigService
  ) { }

  createTypeOrmOptions() {
    const database = this.configService.get('logDatabase');
    return database
  }
}