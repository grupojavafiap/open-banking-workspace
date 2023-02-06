import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RequestCreateConsent, ResponseCreateConsent } from '@open-banking-workspace/schema/api/consents';
import  *  as JWTWeb from 'jsonwebtoken';
import { Consent, ConsentDataService } from '@open-banking-workspace/db/consents-db';

@Injectable()
export class ConsentService { 

    constructor(private consentDataService: ConsentDataService,
        private config:ConfigService){}


    async create(request:RequestCreateConsent)
    {
        const newConsent = await  this.consentDataService.saveByRequest(request);

        return new ResponseCreateConsent((newConsent));
    }


    async findByConsentId(consentId:string) : Promise<ResponseCreateConsent>
    {
        return new ResponseCreateConsent(await this.consentDataService.findOneByConsentId(consentId));
    }


    async findByJWS(jws:string) : Promise<Consent>
    {
        const keyJWT  = this.config.get('KEY_JWS');
        const dataJWT = JWTWeb.verify(jws, keyJWT);
        
        return await this.consentDataService.findOneByConsentId(dataJWT['consentId']);
    }

    async authorizeByConsentId(consentId:string)
    {
        const consent = await this.consentDataService.authorizeByConsentId(consentId);

        const keyJWT  = this.config.get('KEY_JWS');

        const dataJWT = JWTWeb.sign({consentId: consent.consentId, status: consent.status }, keyJWT);

        const urlApp = this.getURLBankReceiverApp();

        return `${urlApp}?authorize=${dataJWT}`;
    }
    
    private getURLBankReceiver()
    {
        return this.config.get('URL_BANK_RECEIVER', 'http://localhost:3333/bank-transmitter');
    }

    private getURLBankReceiverApp()
    {
        return this.config.get('URL_BANK_RECEIVER_APP', 'http://localhost:4200');
    }

    async revokeByConsentId(consentId:string)
    {
        return new ResponseCreateConsent(await this.consentDataService.revokeByConsentId(consentId));
    }

    
}
