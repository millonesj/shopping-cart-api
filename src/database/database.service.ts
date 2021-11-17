import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import {
  ConnectionManager,
  getConnectionManager,
  LoggerOptions,
} from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as path from 'path';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    const connectionManager: ConnectionManager = getConnectionManager();
    const connectionName = 'default';

    let options: TypeOrmModuleOptions;
    if (connectionManager.has(connectionName)) {
      options = connectionManager.get(connectionName).options;
      await connectionManager.get(connectionName).close();
    } else {
      options = {
        type: 'postgres',
        host: this.configService.get<string>('DB_HOST'),
        port: this.configService.get<number>('DB_INTERNAL_PORT'),
        database: this.configService.get<string>('DB_NAME'),
        username: this.configService.get<string>('DB_USER'),
        password: this.configService.get<string>('DB_PASSWORD'),
        logging: this.configService.get<LoggerOptions>('DB_LOG_LEVEL'),
        synchronize: true,
        entities: [path.join(__dirname, '/../shop/**/*.entity{.ts,.js}')],
        namingStrategy: new SnakeNamingStrategy(),
      } as TypeOrmModuleOptions;
    }

    return options;
  }
}
