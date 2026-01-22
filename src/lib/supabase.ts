
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://grdczaplbpbbhpioiaxo.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyZGN6YXBsYnBiYmhwaW9pYXhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyMTUxMzAsImV4cCI6MjA4Mzc5MTEzMH0.r242tuXdAZpXs-tJuBAaBy41NbCZ7SS_qmNcNpml4SQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
