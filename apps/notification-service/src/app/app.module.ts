import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import path from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: [
      path.resolve(process.cwd(), '.env'),
      path.resolve(process.cwd(), 'apps/notification-service/.env')
    ],
    isGlobal: true
  }),MailerModule.forRootAsync({
    imports: [ConfigModule],
    useFactory:(configService: ConfigService) => ({
      transport: {
        host: configService.get<string>('MAIL_HOST'),
        port: configService.get<number>('MAIL_PORT'),
        secure: configService.get<boolean>('MAIL_SECURE'),
        auth: {
          user: configService.get<string>('MAIL_USER'),
          pass: configService.get<string>('MAIL_PASS'),
        },
      },
      defaults: {
        from: `"No Reply" <${configService.get<string>('MAIL_FROM')}>`,
      },
    }),
    inject: [ConfigService],
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
