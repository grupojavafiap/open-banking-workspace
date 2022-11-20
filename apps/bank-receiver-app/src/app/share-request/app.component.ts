import { Component } from '@angular/core';
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

  constructor(private customerService: CustomerService,
   private shareRequestService: ShareRequestService,
   private modal: NzModalService)
  {
    this.customer = this.customerService.getCustomer();
  }



  confirm()
  {
      this.shareRequestService
          .createShareRequest(this.customer.cpf, this.customer.nome)
          .subscribe(response => {
            this.showConfirm();
      })
  }

  showConfirm() {
    this.modal.confirm({
      nzIconType: 'interaction',
      nzTitle: 'Redirecionamento',
      nzContent: 'Você será redirecionado para o Bank Transmitter, para autorizar o compartilhamento',
      nzOkText: 'Continuar',
      nzCancelText: 'Fechar',
      nzOnOk: () =>
        {

        }

    });
  }



}



