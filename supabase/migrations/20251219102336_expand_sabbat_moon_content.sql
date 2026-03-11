/*
  # Expand Sabbat and Moon Phase Content

  1. Modified Tables
    - `sabbats` - Add detailed ritual content columns
    - `moon_phases` - Add ritual guide content
    - `crystals` and `herbs` - Add image_url if not present
  
  2. New Content Columns
    - Sabbats: light_fire, decorations, reflection, ancestors
    - Moon Phases: ritual_elements, ritual_flow
*/

ALTER TABLE sabbats
ADD COLUMN IF NOT EXISTS light_fire text DEFAULT '',
ADD COLUMN IF NOT EXISTS decorations text DEFAULT '',
ADD COLUMN IF NOT EXISTS reflection text DEFAULT '',
ADD COLUMN IF NOT EXISTS ancestors text DEFAULT '';

ALTER TABLE moon_phases
ADD COLUMN IF NOT EXISTS ritual_elements text DEFAULT '',
ADD COLUMN IF NOT EXISTS ritual_flow text DEFAULT '';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'crystals' AND column_name = 'image_url'
  ) THEN
    ALTER TABLE crystals ADD COLUMN image_url text DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'herbs' AND column_name = 'image_url'
  ) THEN
    ALTER TABLE herbs ADD COLUMN image_url text DEFAULT '';
  END IF;
END $$;
