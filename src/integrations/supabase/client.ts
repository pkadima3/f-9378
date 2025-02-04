import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://daxtzlsrbugbjpzxwjtc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRheHR6bHNyYnVnYmpwend3anRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2NjQ1NzAsImV4cCI6MjAyNTI0MDU3MH0.mWzK9qrOJ3LAVyaKD6TKWqMj0kBQZdg-jiw3NhGxvYE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);