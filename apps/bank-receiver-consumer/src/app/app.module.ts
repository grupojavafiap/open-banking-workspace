import { Module } from '@nestjs/common';
import { BrokerClientModule } from 'libs/broker-client/src';
import { ConsumerService } from './consumer.service';


@Module({
  imports: [BrokerClientModule],
  providers: [ConsumerService],
})
export class AppModule { }
