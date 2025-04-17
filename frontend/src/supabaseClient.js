// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";
// import config from "../config"

const supabaseUrl ='https://itiinaafcjtilcnatqri.supabase.co';
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0aWluYWFmY2p0aWxjbmF0cXJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0OTY3ODksImV4cCI6MjA2MDA3Mjc4OX0.uVL0WOu6VlnJsDIG9fvJw5dhWK6HV9_ooVc6s9TV7G8"; // from your Supabase project settings → API

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
