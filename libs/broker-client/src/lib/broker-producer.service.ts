import { Injectable, Logger } from '@nestjs/common';
import { BrokerManagerService } from './broker-manager.service';
import { Consent } from '@open-banking-workspace/db/consents-db';

@Injectable()
export class BrokerProducerService {

    private logger = new Logger(BrokerProducerService.name);

    constructor(private brokerManagerService: BrokerManagerService){}


    /**
     * Recebe o consentimento atualizado, e envia para as 
     * filas de consumo, conforme os tipos de recurso retorno.
     * 
     * @param sequenceConsent 
     * @param brandId 
     * @param resources 
     */
    publish(consentData:Consent)
    {
        try
        {
            this.brokerManagerService.queues.forEach(queue => {
                this.brokerManagerService.publish(queue, consentData);
            })
            
        }
        catch(e)
        {
            this.logger.error(`[publish] - Error na publicação `, e);
        }
    }
    
  
}

