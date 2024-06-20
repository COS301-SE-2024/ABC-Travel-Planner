import { Controller, Get } from '@nestjs/common';
import { SearchService } from './search.service';
import { SupabaseService } from '../supabase/supabase.service';
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService, 
    private readonly supabaseService: SupabaseService
  ) {}

  @Get('custom-query')
  async getCustomData() {
    const supabase = this.supabaseService.getClient();
  const { data: { user } } = await supabase.auth.getUser();
  let { data: Users, error } = await supabase
  .from('Users')
  .select('surname')

    if (error) {
      throw new Error(error.message);
    }
    return user;
  }
}
