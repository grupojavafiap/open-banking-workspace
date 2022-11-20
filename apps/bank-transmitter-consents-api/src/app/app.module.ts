import { Module } from '@nestjs/common';
import { ConsentsDbModule } from '@open-banking-workspace/db/consents-db';

import { ConsentController } from './consent/consent.controller';
import { ConsentService } from './consent/consent.service';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    ConsentsDbModule.forRoot({
      database: process.env.BACK_TRANSMITTER_DB_CONSENT_NAME,
      host: process.env.BACK_TRANSMITTER_DB_CONSENT_HOST,
      password: process.env.BACK_TRANSMITTER_DB_CONSENT_PASS,
      port: parseInt(process.env.BACK_TRANSMITTER_DB_CONSENT_PORT || '3306' ),
      username: process.env.BACK_TRANSMITTER_DB_CONSENT_USER
  })],
  controllers: [ConsentController],
  providers: [ConsentService],
})
export class AppModule {}
