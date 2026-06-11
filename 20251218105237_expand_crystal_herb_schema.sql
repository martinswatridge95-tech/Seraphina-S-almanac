/*
  # Expand Crystal and Herb Schema

  1. Modified Tables
    - `crystals` - Add healing_properties and magical_uses columns
    - `herbs` - Add healing_properties and magical_uses columns
    - `sabbats` - Add classification (Major/Minor) column
  
  2. New Data
    - Full 20-crystal library with complete properties
    - Full 30-herb library with complete properties
    - Sabbat classifications
*/

ALTER TABLE crystals 
ADD COLUMN IF NOT EXISTS healing_properties text DEFAULT '',
ADD COLUMN IF NOT EXISTS magical_uses text DEFAULT '';

ALTER TABLE herbs
ADD COLUMN IF NOT EXISTS healing_properties text DEFAULT '',
ADD COLUMN IF NOT EXISTS magical_uses text DEFAULT '';

ALTER TABLE sabbats
ADD COLUMN IF NOT EXISTS classification text DEFAULT 'Minor';
