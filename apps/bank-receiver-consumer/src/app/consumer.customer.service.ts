import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { IConsumer } from './consumer.interface';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs';

@Injectable()
export class ConsumerCustomerService implements IConsumer {

    urlApiCreditAccount = "";
    private logger = new Logger(ConsumerCustomerService.name);

    constructor(private http: HttpService, 
      private config: ConfigService){

        this.urlApiCreditAccount = this.config.get('URL_API_ACCOUNT', 'http://localhost:3335/bank-transmitter/customers/v2/personal/identifications');

      }

    consume(consentId:string)
    {
       this.logger.log(`[consume] - INICIANDO CONSUMO DE Customer - consentId ${consentId}`);

       this.http.get(this.urlApiCreditAccount)
           .pipe(map(response => response.data))
           .subscribe(response => {

            this.logger.log(`##################### DADOS DE CADASTRO CONDUMIDOS ########################
                              ${response}
                            ###############################################################\n\n
              `)
           })
    }
}
