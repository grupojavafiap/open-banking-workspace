import { Module } from '@nestjs/common';
import { BrokerClientModule } from 'libs/broker-client/src';
import { ConsumerService } from './consumer.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ConsumerCreditAccountService } from './consumer.credit-account.service';
import { ConsumerAccountService } from './consumer.account.service';
import { ConsumerCustomerService } from './consumer.customer.service';

@Module({
  imports: [ConfigModule,BrokerClientModule, HttpModule],
  providers: [ConsumerService, ConsumerCreditAccountService, ConsumerAccountService, ConsumerCustomerService],
})
export class AppModule { }
