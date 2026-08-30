/*
# MyGluco demo schema

## Summary
Creates the tables that back the MyGluco prototype: glucose readings, meals,
daily activity, medications, and a single row of app-wide settings (Sehhaty
connection status, onboarding progress, and privacy toggles). This is a
single-tenant demo app with no sign-in screen, so every table is readable and
writable by the app's anonymous key and the data is seeded with fictional
demo data for one persona ("Amjad").

## New Tables
- `glucose_readings` — one row per glucose measurement.
  - `value` (integer, mg/dL), `unit`, `context` (before_meal/after_meal/fasting/other),
    `measured_at`, `created_at`.
- `meals` — one row per logged meal.
  - `name`, `meal_type` (breakfast/lunch/dinner/snack), `carbs_grams`,
    `source` (scan/manual), `food_items` (jsonb breakdown), `logged_at`, `created_at`.
- `activity_logs` — one row per day of step activity.
  - `log_date` (unique), `steps`, `created_at`.
- `medications` — medications the user is tracking.
  - `name`, `dosage`, `schedule`, `status` (on_track/missed/due), `created_at`.
- `app_settings` — single settings row for the whole app.
  - `sehhaty_connected`, `onboarding_completed`, `health_data_sharing`,
    `ai_insights_enabled`, `meal_analysis_enabled`, `updated_at`.

## Security
Row level security is enabled on every table. Because this prototype has no
login, all four CRUD policies on every table are scoped to `anon, authenticated`
with permissive predicates — the data is intentionally shared/demo data, not
per-user private data.

## Notes
Demo data is fictional and seeded for illustrative purposes only.
*/

CREATE TABLE IF NOT EXISTS glucose_readings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  value integer NOT NULL,
  unit text NOT NULL DEFAULT 'mg/dL',
  context text NOT NULL DEFAULT 'other' CHECK (context IN ('before_meal', 'after_meal', 'fasting', 'other')),
  measured_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS meals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  meal_type text NOT NULL DEFAULT 'snack' CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
  carbs_grams numeric,
  source text NOT NULL DEFAULT 'manual' CHECK (source IN ('scan', 'manual')),
  food_items jsonb NOT NULL DEFAULT '[]'::jsonb,
  logged_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  log_date date NOT NULL DEFAULT current_date UNIQUE,
  steps integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS medications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  dosage text,
  schedule text,
  status text NOT NULL DEFAULT 'on_track' CHECK (status IN ('on_track', 'missed', 'due')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS app_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sehhaty_connected boolean NOT NULL DEFAULT false,
  onboarding_completed boolean NOT NULL DEFAULT false,
  health_data_sharing boolean NOT NULL DEFAULT true,
  ai_insights_enabled boolean NOT NULL DEFAULT true,
  meal_analysis_enabled boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE glucose_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_glucose_readings" ON glucose_readings;
CREATE POLICY "anon_select_glucose_readings" ON glucose_readings FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_glucose_readings" ON glucose_readings;
CREATE POLICY "anon_insert_glucose_readings" ON glucose_readings FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_glucose_readings" ON glucose_readings;
CREATE POLICY "anon_update_glucose_readings" ON glucose_readings FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_glucose_readings" ON glucose_readings;
CREATE POLICY "anon_delete_glucose_readings" ON glucose_readings FOR DELETE TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_select_meals" ON meals;
CREATE POLICY "anon_select_meals" ON meals FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_meals" ON meals;
CREATE POLICY "anon_insert_meals" ON meals FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_meals" ON meals;
CREATE POLICY "anon_update_meals" ON meals FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_meals" ON meals;
CREATE POLICY "anon_delete_meals" ON meals FOR DELETE TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_select_activity_logs" ON activity_logs;
CREATE POLICY "anon_select_activity_logs" ON activity_logs FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_activity_logs" ON activity_logs;
CREATE POLICY "anon_insert_activity_logs" ON activity_logs FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_activity_logs" ON activity_logs;
CREATE POLICY "anon_update_activity_logs" ON activity_logs FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_activity_logs" ON activity_logs;
CREATE POLICY "anon_delete_activity_logs" ON activity_logs FOR DELETE TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_select_medications" ON medications;
CREATE POLICY "anon_select_medications" ON medications FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_medications" ON medications;
CREATE POLICY "anon_insert_medications" ON medications FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_medications" ON medications;
CREATE POLICY "anon_update_medications" ON medications FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_medications" ON medications;
CREATE POLICY "anon_delete_medications" ON medications FOR DELETE TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_select_app_settings" ON app_settings;
CREATE POLICY "anon_select_app_settings" ON app_settings FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_app_settings" ON app_settings;
CREATE POLICY "anon_insert_app_settings" ON app_settings FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_app_settings" ON app_settings;
CREATE POLICY "anon_update_app_settings" ON app_settings FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_app_settings" ON app_settings;
CREATE POLICY "anon_delete_app_settings" ON app_settings FOR DELETE TO anon, authenticated USING (true);

INSERT INTO app_settings (sehhaty_connected, onboarding_completed)
SELECT false, false
WHERE NOT EXISTS (SELECT 1 FROM app_settings);

INSERT INTO medications (name, dosage, schedule, status)
SELECT 'Metformin', '500mg', 'Twice daily', 'on_track'
WHERE NOT EXISTS (SELECT 1 FROM medications);

INSERT INTO activity_logs (log_date, steps)
SELECT current_date, 4820
WHERE NOT EXISTS (SELECT 1 FROM activity_logs WHERE log_date = current_date);

INSERT INTO glucose_readings (value, context, measured_at)
SELECT * FROM (VALUES
  (108, 'fasting', current_date + time '07:15'),
  (114, 'before_meal', current_date + time '09:30'),
  (126, 'before_meal', current_date + time '11:45'),
  (142, 'after_meal', current_date + time '12:30'),
  (154, 'after_meal', current_date + time '13:15'),
  (132, 'other', current_date + time '16:00'),
  (118, 'other', current_date + time '20:00')
) AS seed(value, context, measured_at)
WHERE NOT EXISTS (SELECT 1 FROM glucose_readings);

INSERT INTO meals (name, meal_type, carbs_grams, source, food_items, logged_at)
SELECT * FROM (VALUES
  ('Breakfast', 'breakfast', 30, 'manual', '[{"name":"Oatmeal","carbs":22},{"name":"Banana","carbs":8}]'::jsonb, current_date + time '07:00'),
  ('Lunch', 'lunch', 62, 'scan', '[{"name":"Rice","carbs":45},{"name":"Chicken","carbs":0},{"name":"Salad","carbs":8},{"name":"Sauce","carbs":9}]'::jsonb, current_date + time '12:00'),
  ('Dinner', 'dinner', 38, 'manual', '[{"name":"Grilled fish","carbs":2},{"name":"Vegetables","carbs":12},{"name":"Bread","carbs":24}]'::jsonb, current_date + time '19:00')
) AS seed(name, meal_type, carbs_grams, source, food_items, logged_at)
WHERE NOT EXISTS (SELECT 1 FROM meals);
