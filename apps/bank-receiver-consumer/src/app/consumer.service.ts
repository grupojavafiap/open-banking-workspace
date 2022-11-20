import { Injectable } from '@nestjs/common';
import { BrokerConsumerService } from 'libs/broker-client/src';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class ConsumerService {

    constructor(private brokerConsumerService: BrokerConsumerService){}

    @OnEvent('queues.created')
    startConsumer(msg: {queues: Array<string>})
    {
      console.log("queues.created ....", msg.queues);
      this.brokerConsumerService.consumer(msg.queues, (message) => {
        console.log("message ", message);
      })
    }
}
