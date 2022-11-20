import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Consent } from 'libs/db/consents-db/src/lib/consent.entity';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CustomerService } from '../customer/customer.service';
import { ShareRequestService } from './share-request.service';

@Component({
  selector: 'open-banking-workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  customer = {} as any;

  consentData = {} as Consent;
  typeFlow :'authorize' | 'shared' = 'shared';

  constructor(private customerService: CustomerService,
   private shareRequestService: ShareRequestService,
   private modal: NzModalService,
   private route: ActivatedRoute)
  {
  
    this.route.queryParams
    .subscribe(params => {

      if(params['authorize'])
      {
        this.shareRequestService.authorizeShared(params['authorize'])
            .subscribe(response => this.handlerAuthorize(response))
      }
      else
      {
        this.typeFlow = 'shared';
        this.customer = this.customerService.getCustomer();
      }
    }
  );
  }

  handlerAuthorize(consentData:Consent)
  {
    this.typeFlow = 'authorize';
    console.log("consentData ", consentData);
    this.consentData = consentData;
  }



  confirm()
  {
    this.modal.confirm({
      nzIconType: 'interaction',
      nzTitle: 'Redirecionamento',
      nzContent: 'Você será redirecionado para o Bank Transmitter, para autorizar o compartilhamento',
      nzOkText: 'Continuar',
      nzCancelText: 'Fechar',
      nzOnOk: () =>
        {
           this.shareRequestService
               .createShareRequest(this.customer.cpf, this.customer.nome)
               .subscribe(response => {
                   window.location.href = response.urlRedirect;
                })
        }

    });
  }

}



