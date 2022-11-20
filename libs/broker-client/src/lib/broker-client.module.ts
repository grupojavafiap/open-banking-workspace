import { Module } from '@nestjs/common';
import { BrokerConsumerService } from './broker-consumer.service';
import { BrokerManagerService } from './broker-manager.service';
import { BrokerProducerService } from './broker-producer.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [EventEmitterModule.forRoot(), ConfigModule],
  providers: [BrokerProducerService, BrokerManagerService, BrokerConsumerService],
  exports: [BrokerProducerService, BrokerManagerService, BrokerConsumerService],
})
export class BrokerClientModule {}
