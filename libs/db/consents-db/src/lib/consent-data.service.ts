import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestCreateConsent } from '@open-banking-workspace/schema/api/consents';
import { Repository } from 'typeorm';
import { Consent } from './consent.entity';
import { randomUUID } from 'crypto';
import { ConsentStatus } from './consent-status.enum';

@Injectable()
export class ConsentDataService { 

    constructor(
        @InjectRepository(Consent)
        private consentEntity: Repository<Consent>,
      ) {}

    

    save(requestApi: RequestCreateConsent)
    {
        if(requestApi)
        {
            const now = new Date();
            
            const newEntity = new Consent();
            newEntity.businessId = requestApi.data.businessEntity.document.identification;
            newEntity.clientId = requestApi.data.loggedUser.document.identification;
            newEntity.created = now;
            newEntity.consentId = randomUUID();
            newEntity.expire = new Date(requestApi.data.expirationDateTime);
            newEntity.status = ConsentStatus.AWAITING_AUTHORISATION;
            const permissions: any =  requestApi.data.permissions.map(p => ({
                type: {id: p},
            }));
            newEntity.update = now;
            newEntity.permissions = permissions;
            return this.consentEntity.save(newEntity);
        }
    }


    findOneByConsentId(consentId:string)
    {
        return this.consentEntity.findOne({where: {consentId}, relations: ['permissions']})
    }



    async revokeByConsentId(consentId:string)
    {
        await this.consentEntity.update({ consentId }, { status: ConsentStatus.REJECTED, update: new Date() });
        return this.consentEntity.findOne({where: {consentId}, relations: ['permissions']});
    }


    async authorizeByConsentId(consentId:string)
    {
        await this.consentEntity.update({ consentId }, { status: ConsentStatus.AUTHORISED, update: new Date() });
        return this.consentEntity.findOne({where: {consentId}, relations: ['permissions']});
    }

}
