import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchModule } from './search/search.module';
import { SupabaseModule } from './supabase/supabase.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [SearchModule, SupabaseModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ['.env.local', '.env'], 
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
