import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Medication } from '@/types';

export function useMedications() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('medications')
        .select('*')
        .order('created_at', { ascending: true });

      if (fetchError) {
        setError(fetchError.message);
      } else {
        setError(null);
        setMedications(data ?? []);
      }
      setLoading(false);
    })();
  }, []);

  return { medications, loading, error };
}
