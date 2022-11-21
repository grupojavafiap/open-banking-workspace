import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { IConsumer } from './consumer.interface';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs';

@Injectable()
export class ConsumerCreditAccountService implements IConsumer {

    urlApiCreditAccount = "";

    private logger = new Logger(ConsumerCreditAccountService.name);

    constructor(private http: HttpService, 
      private config: ConfigService){

        this.urlApiCreditAccount = this.config.get('URL_API_CREDIT_ACCOUNT', 'http://localhost:3335/bank-transmitter/credit-cards-accounts/v2/accounts');

      }

    consume(consentId:string)
    {
       this.logger.log(`[consume] - INICIANDO CONSUMO DE CreditAccount - consentId ${consentId}`);

       this.http.get(this.urlApiCreditAccount)
           .pipe(map(response => response.data))
           .subscribe(response => {
            this.logger.log(`\n##################### DADOS DE CARTAO DE CRÉDITO CONDUMIDOS ########################\n${JSON.stringify(response)}\n###############################################################\n\n`)})
    }
}
