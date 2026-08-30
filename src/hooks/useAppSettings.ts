import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { AppSettings } from '@/types';

export function useAppSettings() {
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from('app_settings')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setError(null);
      setSettings(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const updateSettings = useCallback(
    async (patch: Partial<Omit<AppSettings, 'id' | 'updated_at'>>) => {
      if (!settings) return { error: 'Settings not loaded yet' };

      const { data, error: updateError } = await supabase
        .from('app_settings')
        .update({ ...patch, updated_at: new Date().toISOString() })
        .eq('id', settings.id)
        .select()
        .maybeSingle();

      if (updateError) {
        return { error: updateError.message };
      }

      if (data) {
        setSettings(data);
      }
      return { error: null };
    },
    [settings],
  );

  return { settings, loading, error, updateSettings, refetch: fetchSettings };
}
