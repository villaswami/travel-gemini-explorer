
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dvbgxsvqtfenjumhxcvq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2Ymd4c3ZxdGZlbmp1bWh4Y3ZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0NjkzNzAsImV4cCI6MjA2MzA0NTM3MH0.KHVaiEUV58IQDFVcAIzuygXg6rwi9Cbc4WVUcZazN4Q';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
