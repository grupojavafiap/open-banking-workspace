import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { CreditCardController } from './credit-card.controller';
import { CustomerController } from './customer.controller';

@Module({
  imports: [],
  controllers: [AccountController, CustomerController, CreditCardController],
  providers: [],
})
export class AppModule {}
