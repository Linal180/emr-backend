import { Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory } from "@nestjs/typeorm";


@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  constructor(
    private configService: ConfigService
  ) { }

  createTypeOrmOptions() {
    const database = this.configService.get('database');
    return database
  }
}