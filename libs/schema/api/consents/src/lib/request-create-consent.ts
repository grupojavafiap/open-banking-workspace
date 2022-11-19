import {  IsNotEmpty,  IsDateString, IsArray, ValidateNested, IsString, IsObject, IsISO8601, IsDate, Matches, IsRFC3339  } from 'class-validator';
import {  ApiProperty } from '@nestjs/swagger';
import { RequestCreateConsentDoc } from './request-create-consent.doc';

export class Document {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  identification: string | undefined;

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