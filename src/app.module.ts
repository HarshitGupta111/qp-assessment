import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemEntity } from './utils/entity/item.entity';
import { BasicAuthStrategy } from './utils/guard/basic.auth.strategy.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [ItemEntity],
      synchronize: true,
      logging: true,
    }),
  ],
  controllers: [AppController],
  providers: [BasicAuthStrategy, AppService],
})
export class AppModule {}
