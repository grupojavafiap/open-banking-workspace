export class Document {

    identification: string | undefined;

    rel: string | undefined;
  }
  
  export class BusinessEntity {
  
    document: Document | undefined;
  }
  
  export class RequestCreateConsentData {
  
    loggedUser: BusinessEntity | undefined;
  
    businessEntity:BusinessEntity | undefined;
  
    permissions: string[] | undefined;
  
    expirationDateTime: string | undefined;
  }
  
  export class RequestCreateConsent {
    data: RequestCreateConsentData | undefined;  
  }