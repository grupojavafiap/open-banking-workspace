import { Body, Controller, Post, Put} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestCreateConsent } from '@open-banking-workspace/schema/api/consents';
import { ConsentService } from './consent.service';

@ApiTags("Consents")
@Controller("consents")
export class ConsentController {

    constructor(private consentService:ConsentService){}

    @Post("v1/create")
    @ApiOperation({ summary: 'Cria um consentimento na IF escolhida e retorna o link de redirecionamento.' })
    @ApiResponse({ status: 200, description: 'Link de redirecionamento'})
    async create(@Body() payload: RequestCreateConsent)   
    {
      const urlRedirect = await this.consentService.create(payload);

      return {urlRedirect}
    }


    @Put("v1/callback-authorize")
    @ApiOperation({ summary: 'Recebe o JWS na volta da confirmação do consentimento.' })
    @ApiResponse({ status: 200, description: 'Link de redirecionamento'})
    async callback(@Body() payload: any) : Promise<any>
    {
      return  this.consentService.handlerCallbackAuthorize(payload.jws);
    }
      
      
 }
