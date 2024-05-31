import { createClient } from "@supabase/supabase-js";

// 1) project url
const SUPABASE_PROJECT_URL = "https://ookczceidorqoevzkbmi.supabase.co";

// 2) anon key
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9va2N6Y2VpZG9ycW9ldnprYm1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcxMjY5NTcsImV4cCI6MjAzMjcwMjk1N30.vtpGOROePIck4bU9ynSR7Pz7lgXadgBKFRGfnR43RRI";

const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY);

export default supabase;