import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { SupabaseModule } from 'src/supabase/supabase.module';
@Module({
  imports: [SupabaseModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
