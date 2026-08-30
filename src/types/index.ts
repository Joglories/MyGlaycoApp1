export type GlucoseContext = 'before_meal' | 'after_meal' | 'fasting' | 'other';

export interface GlucoseReading {
  id: string;
  value: number;
  unit: string;
  context: GlucoseContext;
  measured_at: string;
  created_at: string;
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';
export type MealSource = 'scan' | 'manual';

export interface FoodItem {
  name: string;
  carbs: number;
}

export interface Meal {
  id: string;
  name: string;
  meal_type: MealType;
  carbs_grams: number | null;
  source: MealSource;
  food_items: FoodItem[];
  logged_at: string;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  log_date: string;
  steps: number;
  created_at: string;
}

export type MedicationStatus = 'on_track' | 'missed' | 'due';

export interface Medication {
  id: string;
  name: string;
  dosage: string | null;
  schedule: string | null;
  status: MedicationStatus;
  created_at: string;
}

export interface AppSettings {
  id: string;
  sehhaty_connected: boolean;
  onboarding_completed: boolean;
  health_data_sharing: boolean;
  ai_insights_enabled: boolean;
  meal_analysis_enabled: boolean;
  updated_at: string;
}

export type GlucoseStatus = 'low' | 'in_range' | 'high';

export function getGlucoseStatus(value: number): GlucoseStatus {
  if (value < 80) return 'low';
  if (value > 140) return 'high';
  return 'in_range';
}

export const GLUCOSE_STATUS_META: Record<GlucoseStatus, { label: string; tone: 'success' | 'danger'; color: string }> = {
  low: { label: 'Low', tone: 'danger', color: '#E6715C' },
  in_range: { label: 'In Range', tone: 'success', color: '#55B77A' },
  high: { label: 'High', tone: 'danger', color: '#E6715C' },
};
