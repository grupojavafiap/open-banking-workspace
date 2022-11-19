import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsentDataService } from './consent-data.service';
import { Consent } from './consent.entity';
import { PermissionType } from './permission-type.entity';
import { Permission } from './permission.entity';


@Module({
})
export class ConsentsDbModule {

  static forRoot(options:IOptionDB): DynamicModule {
    return {
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: options.host,
          port: options.port,
          username: options.username,
          password: options.password,
          database: options.database,
          entities: [Consent, Permission, PermissionType],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Consent, Permission, PermissionType])
      ],
      module: ConsentsDbModule,
      providers: [ConsentDataService],
      exports: [ConsentDataService]
    };
  }
}


export interface IOptionDB
{
    host:string,
    port:number,
    username:string,
    password:string,
    database:string
}