import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { RequestCreateConsent, ResponseCreateConsent } from '@open-banking-workspace/schema/api/consents';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, map } from 'rxjs';
import { BrokerProducerService } from 'libs/broker-client/src';
import { ConsentDataService } from 'libs/db/consents-db/src/lib/consent-data.service';
import  *  as JWTWeb from 'jsonwebtoken';

@Injectable()
export class ConsentService { 

    private keyJWT = null;

    constructor(
        private http:HttpService,
        private config:ConfigService,
        private consentDataService: ConsentDataService,
        private brokerProducerService: BrokerProducerService){

        this.keyJWT = this.config.get('KEY_JWS');
    }


    async create(request:RequestCreateConsent)
    {
        const urlBase = this.getURLBankTransmitter();

        return firstValueFrom(this.http.post(`${urlBase}/consents/v2/consents`, request)
                 .pipe(map(response => this.saveConsent(request, response.data))));
    }

    async handlerCallbackAuthorize(jws:string)
    {
        const dataIWT = JWTWeb.verify(jws, this.keyJWT);

        const consent = await this.consentDataService.authorizeByConsentId(dataIWT['consentId']);

        this.brokerProducerService.publish(consent);


        return consent;
    }

    private async saveConsent(request:RequestCreateConsent, response: ResponseCreateConsent)
    {
        await this.consentDataService.saveByResponseAndRequest(response, request);

        const url = this.getURLBankTransmitterApp();

        const jwt =  JWTWeb.sign({consentId: response.data.consentId}, this.keyJWT);
        
        return `${url}?request=${jwt}`;
    }


    private getURLBankTransmitter()
    {
        return this.config.get('URL_BANK_TRANSMITTER', 'http://localhost:3333/bank-transmitter');
    }

    private getURLBankTransmitterApp()
    {
        return this.config.get('URL_BANK_TRANSMITTER_APP', 'http://localhost:4201');
    }
    
}
