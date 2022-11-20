import { Body, Controller, Post, Res, } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestCreateConsent } from '@open-banking-workspace/schema/api/consents';
import { ConsentService } from './consent.service';
import { Response } from 'express';

@ApiTags("Consents")
@Controller("consents")
export class ConsentController {

    constructor(private consentService:ConsentService){}

    @Post("v1/create")
    @ApiOperation({ summary: 'Cria um consentimento na IF escolhida e retorna o link de redirecionamento.' })
    @ApiResponse({ status: 302, description: 'Link de redirecionamento'})
    async create(@Res() response:Response, @Body() payload: RequestCreateConsent)   
    {
      const urlRedirect = await this.consentService.create(payload);

      response.redirect(urlRedirect);
    }
      
 }
