// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://udxtbfjsmfhazkjplrur.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkeHRiZmpzbWZoYXpranBscnVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2Mzg2NjYsImV4cCI6MjA1NDIxNDY2Nn0.gj9AFJo3BHSo5wwYp6XaU8j9-vWIUeZN4x-e5yjiQSU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);