import { useEffect, useState } from 'react';
import { BookOpen, Plus, Trash2, X } from 'lucide-react';
// 1. IMPORT the broomstick image
import seraphinaBroom from '../../assets/1761166661438(1) copy copy.png';
import { JournalEntry } from '../../lib/supabase';
import {
  getJournalEntries,
  saveJournalEntry,
  deleteJournalEntry,
} from '../../lib/storage';

export default function JournalView() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    title: '',
    mood: 'Calm',
    note: '',
  });

  const moods = [
    'Grateful',
    'Calm',
    'Joyful',
    'Inspired',
    'Reflective',
    'Contemplative',
    'Energized',
    'Peaceful',
  ];

  useEffect(() => {
    loadEntries();
  }, []);

  function loadEntries() {
    const allEntries = getJournalEntries();
    setEntries(allEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.title.trim() || !formData.note.trim()) {
      alert('Please fill in all fields');
      return;
    }

    const entry: JournalEntry = {
      id: editingId || Date.now().toString(),
      date: formData.date,
      title: formData.title,
      mood: formData.mood,
      note: formData.note,
    };

    saveJournalEntry(entry);
    loadEntries();
    resetForm();
  }

  function resetForm() {
    setFormData({
      date: new Date().toISOString().split('T')[0],
      title: '',
      mood: 'Calm',
      note: '',
    });
    setShowForm(false);
    setEditingId(null);
  }

  function handleEdit(entry: JournalEntry) {
    setFormData({
      date: entry.date,
      title: entry.title,
      mood: entry.mood,
      note: entry.note,
    });
    setEditingId(entry.id);
    setShowForm(true);
  }

  function handleDelete(id: string) {
    if (confirm('Delete this journal entry?')) {
      deleteJournalEntry(id);
      loadEntries();
    }
  }

  return (
    <div className="space-y-6 pb-24">
      <div className="glass-card p-6 relative overflow-hidden">
        {/* 2. USE the imported variable here */}
        <img
          src={seraphinaBroom}
          alt="Seraphina on Broomstick"
          className="absolute top-2 right-2 w-32 h-40 object-contain z-0 opacity-90"
          style={{ filter: 'drop-shadow(0 0 15px rgba(59, 130, 246, 0.4))' }}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        
        <div className="relative z-10 flex items-center justify-between mb-2 pr-32">
          <h1 className="text-3xl font-serif text-yellow-400 flex items-center gap-2">
            <BookOpen size={32} />
            The Grimoire Journal
          </h1>
          <button
            onClick={() => setShowForm(true)}
            className="p-2 bg-gradient-to-r from-purple-600/50 to-pink-600/50 border border-purple-400 rounded-lg hover:border-purple-300 transition-all shadow-lg"
          >
            <Plus size={24} className="text-yellow-400" />
          </button>
        </div>
        <p className="relative z-10 text-gray-300 pr-32 italic">
          Record your rituals, intentions, and spiritual insights. Your thoughts are sacred—preserve them here.
        </p>
      </div>

      {showForm && (
        <div className="glass-card p-6 border-2 border-purple-500/50">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-serif text-yellow-400">
                {editingId ? 'Edit Entry' : 'New Entry'}
              </h2>
              <button
                type="button"
                onClick={resetForm}
                className="p-1 hover:bg-gray-700/50 rounded"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-sm font-serif mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-gray-200 focus:outline-none focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-serif mb-2">Mood</label>
                <select
                  value={formData.mood}
                  onChange={(e) => setFormData({ ...formData, mood: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-gray-200 focus:outline-none focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20"
                >
                  {moods.map((mood) => (
                    <option key={mood} value={mood} className="bg-gray-900">{mood}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-sm font-serif mb-2">Title</label>
              <input
                type="text"
                placeholder="Title of your entry..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm font-serif mb-2">Note</label>
              <textarea
                placeholder="Write your thoughts, rituals, or intentions..."
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                rows={6}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20 resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 py-2 bg-gradient-to-r from-purple-600/50 to-pink-600/50 border border-purple-400 rounded-lg text-yellow-400 font-serif hover:border-purple-300 transition-all"
              >
                {editingId ? 'Update' : 'Save'} Entry
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-gray-400 font-serif hover:text-gray-200 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4 px-1">
        {entries.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <BookOpen size={32} className="text-gray-500 mx-auto mb-2" />
            <p className="text-gray-400">No entries yet. Begin your spiritual journey by writing your first entry.</p>
          </div>
        ) : (
          entries.map((entry) => (
            <div
              key={entry.id}
              className="glass-card p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-2xl font-serif text-yellow-400">{entry.title}</h3>
                    <span className="px-2 py-1 bg-purple-900/30 border border-purple-600/30 rounded text-xs text-purple-300 font-serif">
                      {entry.mood}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {new Date(entry.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(entry)}
                    className="p-2 hover:bg-gray-700/50 rounded transition-all text-gray-400 hover:text-yellow-400"
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="p-2 hover:bg-red-900/30 rounded transition-all text-gray-400 hover:text-red-400"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {entry.note}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}