
export class ResponseCreateConsent {

    constructor(consent?:any){

        if(consent)
        {
            const permissions = consent.permissions as Array<any>;
            
            this.data = {
                consentId: consent.consentId,
                creationDateTime: consent.created.toISOString(),
                expirationDateTime: consent.expire.toISOString(),
                permissions: permissions.map(permission => ({
                    type: permission.type.id,
                    description: permission.type.description
                })),
                status: consent.status,
                statusUpdateDateTime: consent.created.toISOString()
            }

            this.links = {
                self: `${process.env['URL_APP']}/bank-transmitter/consents/v2/consents/${consent.consentId}`,
            }

            this.meta = {
                requestDateTime: new Date().toISOString(),
                totalPages: 1,
                totalRecords: 1
            }
        }
    }

    data!:  ResponseCreateConsentData;
    links!: Links;
    meta!:  Meta;
}

export interface ResponseCreateConsentData {
    consentId:            string;
    creationDateTime:     string;
    status:               string;
    statusUpdateDateTime: string;
    permissions:          Permission[];
    expirationDateTime:   string;
}

export interface Permission {
    type:  string,
    description:string
}

export interface Links {
    self:  string;
}

export interface Meta {
    totalRecords:    number;
    totalPages:      number;
    requestDateTime: string;
}