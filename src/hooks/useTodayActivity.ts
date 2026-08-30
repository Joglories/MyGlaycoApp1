import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { ActivityLog } from '@/types';

export function useTodayActivity() {
  const [activity, setActivity] = useState<ActivityLog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivity = useCallback(async () => {
    setLoading(true);
    const today = new Date().toISOString().slice(0, 10);
    const { data, error: fetchError } = await supabase
      .from('activity_logs')
      .select('*')
      .eq('log_date', today)
      .maybeSingle();

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setError(null);
      setActivity(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchActivity();
  }, [fetchActivity]);

  return { activity, loading, error };
}
