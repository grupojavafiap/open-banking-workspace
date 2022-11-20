import { Injectable } from '@nestjs/common';
import { RequestCreateConsent, ResponseCreateConsent } from '@open-banking-workspace/schema/api/consents';
import { ConsentDataService } from 'libs/db/consents-db/src/lib/consent-data.service';


@Injectable()
export class ConsentService { 

    constructor(private consentDataService: ConsentDataService){}


    async create(request:RequestCreateConsent)
    {
        const newConsent = await  this.consentDataService.saveByRequest(request);

        return new ResponseCreateConsent((newConsent));
    }


    async findByConsentId(consentId:string) : Promise<ResponseCreateConsent>
    {
        return new ResponseCreateConsent(await this.consentDataService.findOneByConsentId(consentId));
    }


    async authorizeByConsentId(consentId:string)
    {
        return new ResponseCreateConsent(await this.consentDataService.authorizeByConsentId(consentId));
    }
    

    async revokeByConsentId(consentId:string)
    {
        return new ResponseCreateConsent(await this.consentDataService.revokeByConsentId(consentId));
    }

    
}
