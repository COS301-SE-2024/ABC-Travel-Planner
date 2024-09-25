import { Controller, Post, Body, Get } from '@nestjs/common';
import { AitaService } from './aita.service';

@Controller('aita')
export class AitaController {
    constructor(
        private aitaService: AitaService
    ) {}

  @Get('getCodes')
  async getAITAcodes(@Body() body : {searchTerm: string}) {
    return this.aitaService.getAITAcodes(body.searchTerm, 'ZA');   // Fix this, it needs to be based on user's location
                                                                                // Maybe get it from the items page/localstorage?
  }
}
