import { NgModule } from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule} from '@angular/platform-browser';

import { AppComponent } from './share-request/app.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { HttpClientModule } from '@angular/common/http';
import { ShareRequestService } from './share-request/share-request.service';
import { CustomerService } from './customer/customer.service';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { RouterModule } from '@angular/router';
import { NzResultModule } from 'ng-zorro-antd/result';
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  declarations: [AppComponent],
  imports: [
    NoopAnimationsModule,
    BrowserModule, 
    RouterModule.forRoot([]),
    NzLayoutModule,
    NzIconModule.forRoot(icons),
    NzGridModule ,
    NzCardModule,
    HttpClientModule,
    NzDividerModule,
    NzButtonModule,
    NzModalModule,
    NzResultModule
    
  ],
  providers: [
    ShareRequestService,
    CustomerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
