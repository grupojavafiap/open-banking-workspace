
const expire = new Date();
expire.setMonth(expire.getMonth() + 12);

export const RequestCreateConsentDoc = {
      "data": {
          "loggedUser": {
            "document": {
              "identification": "37290680081",
              "name": "João da Silva",
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
            "ACCOUNTS_OVERDRAFT_LIMITS_READ",
            "RESOURCES_READ"
          ],
          "expirationDateTime": expire.toISOString()
        }
      
}