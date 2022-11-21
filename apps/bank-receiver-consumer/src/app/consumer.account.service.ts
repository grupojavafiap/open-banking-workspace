import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { IConsumer } from './consumer.interface';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs';

@Injectable()
export class ConsumerAccountService implements IConsumer {

    urlApiCreditAccount = "";

    private logger = new Logger(ConsumerAccountService.name);

    constructor(private http: HttpService, 
      private config: ConfigService){

        this.urlApiCreditAccount = this.config.get('URL_API_ACCOUNT', 'http://localhost:3335/bank-transmitter/accounts/v2/accounts');

      }

    consume(consentId:string)
    {
       this.logger.log(`[consume] - INICIANDO CONSUMO DE Account - consentId ${consentId}`);

       this.http.get(this.urlApiCreditAccount)
           .pipe(map(response => response.data))
           .subscribe(response => {
            this.logger.log(`\n##################### DADOS DE CONTA CONDUMIDOS ########################\n${JSON.stringify(response)}\n###############################################################\n\n`)})
    }
}
