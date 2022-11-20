import {  IsNotEmpty,  IsArray, ValidateNested, IsString, IsObject, IsRFC3339  } from 'class-validator';
import {  ApiProperty } from '@nestjs/swagger';

export class Document {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  identification: string | undefined;

  name?:string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  rel: string | undefined;
}

export class BusinessEntity {

  @ApiProperty()
  @ValidateNested()
  @IsNotEmpty()
  document: Document | undefined;
}

export class RequestCreateConsentData {

  @ApiProperty()
  @ValidateNested()
  @IsNotEmpty()
  loggedUser: BusinessEntity | undefined;

  @ApiProperty()
  @ValidateNested()
  @IsNotEmpty()
  businessEntity:BusinessEntity | undefined;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  permissions: string[] | undefined;

  @ApiProperty()
  @IsRFC3339()
  expirationDateTime: string | undefined;


}

export class RequestCreateConsent {

  @ApiProperty()
  @ValidateNested()
  @IsNotEmpty()
  @IsObject()
  data: RequestCreateConsentData | undefined;


}