import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { GlucoseContext, GlucoseReading } from '@/types';

export function useGlucoseReadings() {
  const [readings, setReadings] = useState<GlucoseReading[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReadings = useCallback(async () => {
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from('glucose_readings')
      .select('*')
      .order('measured_at', { ascending: true });

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setError(null);
      setReadings(data ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchReadings();
  }, [fetchReadings]);

  const addReading = useCallback(
    async (value: number, context: GlucoseContext, measuredAt?: Date) => {
      const { data, error: insertError } = await supabase
        .from('glucose_readings')
        .insert({
          value,
          context,
          measured_at: (measuredAt ?? new Date()).toISOString(),
        })
        .select()
        .maybeSingle();

      if (insertError) {
        return { error: insertError.message };
      }

      if (data) {
        setReadings((prev) =>
          [...prev, data as GlucoseReading].sort(
            (a, b) => new Date(a.measured_at).getTime() - new Date(b.measured_at).getTime(),
          ),
        );
      }
      return { error: null };
    },
    [],
  );

  return { readings, loading, error, addReading, refetch: fetchReadings };
}
