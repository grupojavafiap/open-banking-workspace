import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Consent } from '@open-banking-workspace/db/consents-db';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ShareRequestService } from './share-request.service';

@Component({
  selector: 'open-banking-workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {


  consentsData = {} as Consent;

  permissions = new Array<string>();

  constructor(
   private shareRequestService: ShareRequestService,
   private modal: NzModalService,
   private route: ActivatedRoute)
  {}


  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {

        if(params['request'])
        {
          this.shareRequestService.findDataShareRequest(params['request'])
              .subscribe(response => this.handlerFindDataShareRequest(response))
        }
      }
    );
  }


  handlerFindDataShareRequest(response:Consent)
  {
    if(response)
    {
       this.consentsData = response;
        const permissions = response.permissions.map(p => p.type.description);
        this.permissions =  [...new Set(permissions)];
    }

  }


  confirm()
  {
    this.shareRequestService
        .authorizeShare(this.consentsData.consentId)
        .subscribe(response =>
          {
            this.modal.confirm({
              nzIconType: 'interaction',
              nzTitle: 'Redirecionamento',
              nzContent: 'Compartilhamento autorizado com sucesso. Você será redirecionado para o Banco Receptor',
              nzOkText: 'Continuar',
              nzCancelText: 'Fechar',
              nzOnOk: () =>
                {
                   window.location.href = response.urlRedirect;
                }
        
            });
          })
  }



}



