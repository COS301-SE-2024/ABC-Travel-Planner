import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AitaService {
  constructor() {
    
  }

  async renewAccessToken(): Promise<string> {
    return 'newAccessToken';
  }

  async getAITAcodes(searchTerm: string): Promise<string> {
    return 'DUR'
  }
}
