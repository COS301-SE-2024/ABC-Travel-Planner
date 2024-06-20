import { SearchService } from './search.service';
import { SupabaseService } from '../supabase/supabase.service';
export declare class SearchController {
    private readonly searchService;
    private readonly supabaseService;
    constructor(searchService: SearchService, supabaseService: SupabaseService);
    getCustomData(): Promise<import("@supabase/auth-js").User | null>;
}
