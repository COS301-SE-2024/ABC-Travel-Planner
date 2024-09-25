import { Controller, Post, Body } from '@nestjs/common';
import { AitaService } from './aita.service';

@Controller('aita')
export class AitaController {
  constructor(private aitaService: AitaService) {}

  @Post('auth')
  async renewAccessToken(@Body() body: {}) {
    return this.aitaService.renewAccessToken();
  }

  @Post('getCodes')
  async getAITAcodes(@Body() body : {searchTerm: string}) {
    return this.aitaService.getAITAcodes(body.searchTerm);
  }

  
}
