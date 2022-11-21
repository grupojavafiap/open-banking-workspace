import { Injectable } from '@nestjs/common';
import { BrokerConsumerService } from 'libs/broker-client/src';
import { OnEvent } from '@nestjs/event-emitter';
import { IConsumer } from './consumer.interface';
import { ConsumerCreditAccountService } from './consumer.credit-account.service';
import { ConsumerAccountService } from './consumer.account.service';

@Injectable()
export class ConsumerService {

  private consumers = new Map<string, IConsumer>();

  constructor(private brokerConsumerService: BrokerConsumerService,
    private consumerCreditAccountService:ConsumerCreditAccountService,
    private consumerAccountService:ConsumerAccountService

    ){

      this.consumers.set("consumed.credit-card-account", this.consumerCreditAccountService);
      this.consumers.set("consumed.account", this.consumerAccountService);
  }

    

    @OnEvent('queues.created')
    startConsumer(msg: {queues: Array<string>})
    {
      this.brokerConsumerService.consumer(msg.queues, (message) => {

        const consumer = this.consumers.get(message.queue);

        if(consumer)
        {
            const consentData = JSON.parse(message.payload);
            consumer.consume(consentData.consentId);
        }
      })
    }
}
