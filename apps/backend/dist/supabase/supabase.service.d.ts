import { SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
export declare class SupabaseService {
    private configService;
    private readonly supabase;
    constructor(configService: ConfigService);
    getClient(): SupabaseClient;
}
