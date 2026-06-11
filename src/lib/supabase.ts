import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Crystal {
  id: string;
  name: string;
  intention: string;
  lore: string;
  tip: string;
  image_url: string;
  healing_properties: string;
  magical_uses: string;
  created_at: string;
}

export interface Remedy {
  id: string;
  ailment: string;
  remedy: string;
  ingredients: string[];
  preparation: string;
  created_at: string;
}

export interface Herb {
  id: string;
  name: string;
  position: string;
  purpose: string;
  care_instructions: string;
  healing_properties: string;
  magical_uses: string;
  image_url: string;
  created_at: string;
}

export interface Sabbat {
  id: string;
  name: string;
  date: string;
  description: string;
  classification: string;
  light_fire: string;
  decorations: string;
  reflection: string;
  ancestors: string;
  created_at: string;
}

export interface MoonPhase {
  id: string;
  phase_name: string;
  interpretation: string;
  ritual_elements: string;
  ritual_flow: string;
  created_at: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  mood: string;
  note: string;
}
