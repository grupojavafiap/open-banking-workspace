import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { RequestCreateConsent, ResponseCreateConsent } from '@open-banking-workspace/schema/api/consents';
import { Consent } from 'libs/db/consents-db/src/lib/consent.entity';
import { RequestCreateConsentDoc } from 'libs/schema/api/consents/src/lib/request-create-consent.doc';
import { ConsentService } from './consent.service';
import { Response } from 'express';

@ApiTags("Consents")
@Controller("consents")
export class ConsentController {

    private logger = new Logger(ConsentController.name);
    constructor(private consentService:ConsentService){}

    @Post("v2/consents")
    @ApiOperation({ summary: 'Criar novo pedido de consentimento.' })
    @ApiResponse({ status: 201, description: 'Consentimento criado.'})
    @ApiBody({
      schema: {
        example: RequestCreateConsentDoc
      }
    })
    create(@Body() payload: RequestCreateConsent)   
    {
      return this.consentService.create(payload);
    }
      

    @Get("v2/consents/:consentId")
    @ApiOperation({ summary: 'Obter detalhes do consentimento identificado por consentId.' })
    @ApiResponse({ status: 200, description: 'Retorna informações do consentimento' })
    findByConsentId(@Param('consentId') consentId: string): Promise<ResponseCreateConsent>
    {
      return this.consentService.findByConsentId(consentId);
    }


    @Delete("v2/consents/:consentId")
    @ApiOperation({ summary: 'Deletar / Revogar o consentimento identificado por consentId.' })
    @ApiResponse({ status: 204, description: 'Consentimento revogado' })
    deleteByConsentId(@Param('consentId') consentId: string): Promise<ResponseCreateConsent>
    {
      return this.consentService.revokeByConsentId(consentId);
    }


    @Put("v2/consents/authorize/:consentId")
    @ApiOperation({ summary: 'Autorizar o consentimento pendente.' })
    @ApiResponse({ status: 200, description: 'Consentimento autorizado' })
    async authorizeByConsentId( @Param('consentId') consentId: string) : Promise<any>
    {
      const urlRedirect = await this.consentService.authorizeByConsentId(consentId);

      return {urlRedirect}
    }



    @Get("v2/request")
    @ApiOperation({ summary: 'Obtem os dados do consentimento através do JWT.' }) 
    @ApiResponse({ status: 200, description: 'Retorna informações do consentimento' })
    findDataShareRequest(@Query('jws') jws: string): Promise<Consent>
    {
      this.logger.log(`[findDataShareRequest] - Consultando dados através do JWT`)
      return this.consentService.findByJWS(jws);
    }
 }
