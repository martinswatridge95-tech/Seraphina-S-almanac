/*
  # Seraphina's Almanac Database Schema

  1. New Tables
    - `crystals`
      - `id` (uuid, primary key)
      - `name` (text) - Crystal name (e.g., "Black Obsidian")
      - `intention` (text) - Purpose (e.g., "Protection", "Love", "Luck")
      - `lore` (text) - Background story and spiritual meaning
      - `tip` (text) - How to use or cleanse the crystal
      - `image_url` (text) - Optional image reference
      - `created_at` (timestamptz)
    
    - `remedies`
      - `id` (uuid, primary key)
      - `ailment` (text) - Condition name (e.g., "Cough", "Stress")
      - `remedy` (text) - Natural solution
      - `ingredients` (text array) - List of herbs/items needed
      - `preparation` (text) - How to prepare
      - `created_at` (timestamptz)
    
    - `herbs`
      - `id` (uuid, primary key)
      - `name` (text) - Herb name (e.g., "Rosemary")
      - `position` (text) - Where to place (e.g., "By the door")
      - `purpose` (text) - Spiritual benefit
      - `care_instructions` (text) - How to maintain
      - `created_at` (timestamptz)
    
    - `sabbats`
      - `id` (uuid, primary key)
      - `name` (text) - Sabbat name (e.g., "Samhain", "Yule")
      - `date` (date) - Annual date
      - `description` (text) - Meaning and traditions
      - `created_at` (timestamptz)
    
    - `moon_phases`
      - `id` (uuid, primary key)
      - `phase_name` (text) - Phase name (e.g., "Full Moon", "New Moon")
      - `interpretation` (text) - Spiritual meaning
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (this is reference data)
*/

CREATE TABLE IF NOT EXISTS crystals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  intention text NOT NULL,
  lore text NOT NULL,
  tip text NOT NULL,
  image_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS remedies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ailment text NOT NULL,
  remedy text NOT NULL,
  ingredients text[] DEFAULT '{}',
  preparation text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS herbs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  position text NOT NULL,
  purpose text NOT NULL,
  care_instructions text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sabbats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  date date NOT NULL,
  description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS moon_phases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phase_name text NOT NULL,
  interpretation text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE crystals ENABLE ROW LEVEL SECURITY;
ALTER TABLE remedies ENABLE ROW LEVEL SECURITY;
ALTER TABLE herbs ENABLE ROW LEVEL SECURITY;
ALTER TABLE sabbats ENABLE ROW LEVEL SECURITY;
ALTER TABLE moon_phases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read crystals"
  ON crystals FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can read remedies"
  ON remedies FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can read herbs"
  ON herbs FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can read sabbats"
  ON sabbats FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can read moon phases"
  ON moon_phases FOR SELECT
  TO anon
  USING (true);