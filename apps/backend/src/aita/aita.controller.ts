import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { AitaService } from './aita.service';

@Controller('aita')
export class AitaController {
    constructor(
        private aitaService: AitaService
    ) {}

    // TODO Figure out where to search for airports? OR
    // TODO Just give them a list of options and let them search (Search everything and populate combobox)
    // TODO Remember to look at /reference-data/locations{locationId} for more airport info? -- Search page...
    
  @Get('getCodes')
  async getAITAcodes(@Query('searchTerm') searchTerm: string) {
    return this.aitaService.getAITAcodes(searchTerm, 'ZA');   // Fix this, it needs to be based on user's location
                                                                                // Maybe get it from the items page/localstorage?
  }
}
