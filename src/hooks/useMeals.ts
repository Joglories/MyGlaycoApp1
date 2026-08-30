import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { FoodItem, Meal, MealSource, MealType } from '@/types';

export function useMeals() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMeals = useCallback(async () => {
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from('meals')
      .select('*')
      .order('logged_at', { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setError(null);
      setMeals(data ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  const addMeal = useCallback(
    async (meal: {
      name: string;
      meal_type: MealType;
      carbs_grams: number;
      source: MealSource;
      food_items: FoodItem[];
    }) => {
      const { data, error: insertError } = await supabase
        .from('meals')
        .insert({ ...meal, logged_at: new Date().toISOString() })
        .select()
        .maybeSingle();

      if (insertError) {
        return { error: insertError.message };
      }

      if (data) {
        setMeals((prev) => [data as Meal, ...prev]);
      }
      return { error: null };
    },
    [],
  );

  return { meals, loading, error, addMeal, refetch: fetchMeals };
}
