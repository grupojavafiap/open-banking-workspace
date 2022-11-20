import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Consent } from "libs/db/consents-db/src/lib/consent.entity";

const expire = new Date();
expire.setMonth(expire.getMonth() + 12);

@Injectable()
export class ShareRequestService {

    constructor(private http:HttpClient){}

    private baseURL = "http://localhost:3334/bank-receiver";

    public createShareRequest(cpf: string, name:string)
    {
        const request = this.buildPayloadRequest(cpf, name);

        return this.http.post<{urlRedirect:string}>(`${this.baseURL}/consents/v1/create`, request);
    }

    public authorizeShared(jws:string)
    {
      return this.http.put<Consent>(`${this.baseURL}/consents/v1/callback-authorize`, {jws});
    }


    private buildPayloadRequest(cpf: string, name:string)
    {
        return {
            "data": {
                "loggedUser": {
                  "document": {
                    "identification": cpf,
                    "name": name,
                    "rel": "CPF"
                  }
                },
                "businessEntity": {
                  "document": {
                    "identification": "70142728000133",
                    "rel": "CNPJ"
                  }
                },
                "permissions": [
                    "ACCOUNTS_READ",
                    "ACCOUNTS_BALANCES_READ",
                    "ACCOUNTS_TRANSACTIONS_READ",
                    "ACCOUNTS_OVERDRAFT_LIMITS_READ",
                    "CREDIT_CARDS_ACCOUNTS_READ",
                    "CREDIT_CARDS_ACCOUNTS_BILLS_READ",
                    "CREDIT_CARDS_ACCOUNTS_BILLS_TRANSACTIONS_READ",
                    "CREDIT_CARDS_ACCOUNTS_LIMITS_READ",
                    "CREDIT_CARDS_ACCOUNTS_TRANSACTIONS_READ",
                    "CUSTOMERS_PERSONAL_IDENTIFICATIONS_READ",
                    "CUSTOMERS_PERSONAL_ADITTIONALINFO_READ",
                    "CUSTOMERS_BUSINESS_IDENTIFICATIONS_READ",
                    "CUSTOMERS_BUSINESS_ADITTIONALINFO_READ",
                    "FINANCINGS_READ",
                    "FINANCINGS_SCHEDULED_INSTALMENTS_READ",
                    "FINANCINGS_PAYMENTS_READ",
                    "FINANCINGS_WARRANTIES_READ",
                    "INVOICE_FINANCINGS_READ",
                    "INVOICE_FINANCINGS_SCHEDULED_INSTALMENTS_READ",
                    "INVOICE_FINANCINGS_PAYMENTS_READ",
                    "INVOICE_FINANCINGS_WARRANTIES_READ",
                    "LOANS_READ",
                    "LOANS_SCHEDULED_INSTALMENTS_READ",
                    "LOANS_PAYMENTS_READ",
                    "LOANS_WARRANTIES_READ",
                    "UNARRANGED_ACCOUNTS_OVERDRAFT_READ",
                    "UNARRANGED_ACCOUNTS_OVERDRAFT_SCHEDULED_INSTALMENTS_READ",
                    "UNARRANGED_ACCOUNTS_OVERDRAFT_PAYMENTS_READ",
                    "UNARRANGED_ACCOUNTS_OVERDRAFT_WARRANTIES_READ",
                    "RESOURCES_READ"
                ],
                "expirationDateTime": expire.toISOString()
              }
        }
    }

}

