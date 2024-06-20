import { Inject, Injectable, Scope } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { ExtractJwt } from 'passport-jwt';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class SupabaseService {
    private supabase: SupabaseClient;

  constructor(private configService: ConfigService, @Inject(REQUEST) private readonly request: Request,) {

  }

  getClient(): SupabaseClient {
    if (this.supabase) {
      return this.supabase;
    }

    const SUPABASE_URL = this.configService.get<string>('NEST_PUBLIC_SUPABASE_URL')!;
    const SUPABASE_KEY = this.configService.get<string>('NEST_PUBLIC_SUPABASE_ANON_KEY')!;
    this.supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: {
        autoRefreshToken: true,
        detectSessionInUrl: false,
        persistSession: true,
      }
    });

    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(this.request);
    if (token) {
      this.supabase.auth.session = { access_token: token } as any;
      this.supabase.auth.setAuth(token);
      this.supabase.auth.setSession()
    }
    // this.supabase.auth.setAuth(
    //   ExtractJwt.fromAuthHeaderAsBearerToken()(this.request),
    // );
    return this.supabase;
  }
}
