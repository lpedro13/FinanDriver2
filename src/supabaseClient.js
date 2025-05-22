// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uplyeyupmkxvsniedwta.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwbHlleXVwbWt4dnNuaWVkd3RhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4NzAyOTAsImV4cCI6MjA2MzQ0NjI5MH0.lQrTyOKfdOEj_jq9Fw8Ur-NSV3sSNs_NGGBQaRFqeLQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
