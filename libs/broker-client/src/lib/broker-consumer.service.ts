import { Injectable, Logger } from '@nestjs/common';
import { BrokerManagerService } from './broker-manager.service';

@Injectable()
export class BrokerConsumerService {

    private logger = new Logger(BrokerConsumerService.name);

    constructor(private brokerManagerService: BrokerManagerService){}

    consumer(queues: Array<string>, receiveMessage: (msg: any) => void)
    {
        try
        {
            if(queues && queues.length)
            {
                for(const queue of queues)
                {
                    this.brokerManagerService.consumer(queue, (payload) => {
                        console.log("call receiveMessage");
                        receiveMessage({payload, queue});
                    });
                }
            }   
        }
        catch(e)
        {
            this.logger.error(`[consumer] - Error no consumo da mensagem `, e);
        }
    }
    
  
}

