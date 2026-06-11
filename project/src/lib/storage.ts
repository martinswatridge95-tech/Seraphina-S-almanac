import { JournalEntry } from './supabase';

const FAVORITES_KEY = 'seraphina_favorites';
const JOURNAL_KEY = 'seraphina_journal';

export interface Favorites {
  crystals: string[];
  herbs: string[];
  remedies: string[]; // ADDED THIS
}

export function getFavorites(): Favorites {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    // Added remedies to the default object
    return stored ? JSON.parse(stored) : { crystals: [], herbs: [], remedies: [] };
  } catch {
    return { crystals: [], herbs: [], remedies: [] };
  }
}

export function saveFavorites(favorites: Favorites): void {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (e) {
    console.error('Error saving favorites:', e);
  }
}

// Updated type to include 'remedies'
export function toggleFavorite(type: 'crystals' | 'herbs' | 'remedies', id: string): void {
  const favorites = getFavorites();
  
  // Safety check to ensure the array exists
  if (!favorites[type]) {
    favorites[type] = [];
  }
  
  const list = favorites[type];
  const index = list.indexOf(id);

  if (index > -1) {
    list.splice(index, 1);
  } else {
    list.push(id);
  }

  saveFavorites(favorites);
}

// Updated type to include 'remedies'
export function isFavorited(type: 'crystals' | 'herbs' | 'remedies', id: string): boolean {
  const favorites = getFavorites();
  return (favorites[type] || []).includes(id);
}

// --- REST OF JOURNAL LOGIC (Keep exactly as you have it) ---

export function getJournalEntries(): JournalEntry[] {
  try {
    const stored = localStorage.getItem(JOURNAL_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveJournalEntry(entry: JournalEntry): void {
  try {
    const entries = getJournalEntries();
    const index = entries.findIndex((e) => e.id === entry.id);
    if (index > -1) {
      entries[index] = entry;
    } else {
      entries.push(entry);
    }
    localStorage.setItem(JOURNAL_KEY, JSON.stringify(entries));
  } catch (e) {
    console.error('Error saving journal entry:', e);
  }
}

export function deleteJournalEntry(id: string): void {
  try {
    const entries = getJournalEntries();
    const filtered = entries.filter((e) => e.id !== id);
    localStorage.setItem(JOURNAL_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.error('Error deleting journal entry:', e);
  }
}

/**
 * THE ULTIMATE IMAGE RESOLVER
 */
export function getImageUrl(name: string, visualDesc: string = ''): string {
  const fallback = 'https://images.unsplash.com/photo-1515401974664-28312595006a?auto=format&fit=crop&q=80&w=400';
  if (!name) return fallback;
  
  const cleanName = name.toLowerCase().trim();
  
  const isCrystal = cleanName.includes('ite') || 
                    cleanName.includes('stone') || 
                    cleanName.includes('quartz') || 
                    cleanName.includes('obsidian') ||
                    cleanName.includes('gem');
                    
  const anchor = isCrystal ? 'crystal gemstone mineral' : 'medicinal herb plant botanical';
  
  const fullSearch = `${cleanName} ${visualDesc} ${anchor}`.trim();
  const query = encodeURIComponent(fullSearch);

  return `https://source.unsplash.com/featured/400x400?${query}`;
}