import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Consent } from "libs/db/consents-db/src/lib/consent.entity";
import { throwError } from "rxjs";

const expire = new Date();
expire.setMonth(expire.getMonth() + 12);

@Injectable()
export class ShareRequestService {

    constructor(private http:HttpClient){}

    private baseURL = "http://localhost:3333/bank-transmitter";

    public findDataShareRequest(jwt: string)
    {   
        if(jwt)
        {   
            return this.http.get<Consent>(`${this.baseURL}/consents/v2/request?jws=${jwt}`);
        }
        return throwError(() => 'JWT não informado.');
    }


    authorizeShare(consentId:string)
    {
        return this.http.put<{urlRedirect:string}>(`${this.baseURL}/consents/v2/consents/authorize/${consentId}`, {});
    }


}

