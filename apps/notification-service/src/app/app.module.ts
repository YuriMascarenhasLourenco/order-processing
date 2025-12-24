import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import path from 'path';
@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: [
      path.resolve(process.cwd(), '.env'),
      path.resolve(process.cwd(), 'apps/notification-service/.env')
    ],
    isGlobal: true
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
