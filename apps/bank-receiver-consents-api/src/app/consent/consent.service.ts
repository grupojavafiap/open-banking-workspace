import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { RequestCreateConsent, ResponseCreateConsent } from '@open-banking-workspace/schema/api/consents';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, map } from 'rxjs';
import { ConsentDataService } from 'libs/db/consents-db/src/lib/consent-data.service';
import  *  as JWTWeb from 'jsonwebtoken';

@Injectable()
export class ConsentService { 

    constructor(
        private http:HttpService,
        private config:ConfigService,
        private consentDataService: ConsentDataService){}


    async create(request:RequestCreateConsent)
    {
        const urlBase = this.getURLBankTransmitter();

        return firstValueFrom(this.http.post(`${urlBase}/consents/v2/consents`, request)
                 .pipe(map(response => this.saveConsent(request, response.data))));
    }

    private async saveConsent(request:RequestCreateConsent, response: ResponseCreateConsent)
    {
        await this.consentDataService.saveByResponseAndRequest(response, request);

        const keyJWT = this.config.get('KEY_JWT');
        
        const url = this.getURLBankTransmitterApp();

        const jwt =  JWTWeb.sign({consentId: response.data.consentId}, keyJWT);
        
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
