import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConsentService } from './consent/consent.service';
import { ConsentController } from './consent/consent.controller';
import { ConsentsDbModule } from '@open-banking-workspace/db/consents-db';
import { ConfigModule } from '@nestjs/config';
import { BrokerProducerService } from './broker/broker-producer.service';
import { BrokerManagerService } from './broker/broker-manager.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    ConsentsDbModule.forRoot({
      database: process.env.BACK_RECEIVER_DB_CONSENT_NAME,
      host: process.env.BACK_RECEIVER_DB_CONSENT_HOST,
      password: process.env.BACK_RECEIVER_DB_CONSENT_PASS,
      port: parseInt(process.env.BACK_RECEIVER_DB_CONSENT_PORT || '3307' ),
      username: process.env.BACK_RECEIVER_DB_CONSENT_USER
  })],
  controllers: [ConsentController],
  providers: [
    ConsentService,
    BrokerProducerService,
    BrokerManagerService],
})
export class AppModule {}
