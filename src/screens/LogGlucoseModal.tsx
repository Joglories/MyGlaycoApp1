import { useState } from 'react';
import { Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import type { GlucoseContext } from '@/types';

interface LogGlucoseModalProps {
  onSave: (value: number, context: GlucoseContext) => Promise<{ error: string | null }>;
}

const contexts: { id: GlucoseContext; label: string }[] = [
  { id: 'before_meal', label: 'Before meal' },
  { id: 'after_meal', label: 'After meal' },
  { id: 'fasting', label: 'Fasting' },
  { id: 'other', label: 'Other' },
];

export default function LogGlucoseModal({ onSave }: LogGlucoseModalProps) {
  const [value, setValue] = useState('');
  const [context, setContext] = useState<GlucoseContext>('before_meal');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const numValue = parseInt(value, 10);

  const handleSave = async () => {
    if (!numValue || numValue < 20 || numValue > 600) {
      setError('Please enter a value between 20 and 600 mg/dL.');
      return;
    }
    setSaving(true);
    setError(null);
    const result = await onSave(numValue, context);
    setSaving(false);
    if (result.error) {
      setError(result.error);
    }
  };

  return (
    <div>
      <p className="mb-2 text-[14px] font-semibold text-neutral-500">Your reading</p>
      <div className="flex items-end gap-2 rounded-2xl bg-neutral-50 px-5 py-4">
        <input
          type="number"
          inputMode="numeric"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="108"
          autoFocus
          className="w-full bg-transparent text-[40px] font-extrabold leading-none text-neutral-900 placeholder:text-neutral-300 focus:outline-none"
        />
        <span className="mb-1 text-[16px] font-semibold text-neutral-400">mg/dL</span>
      </div>
      {error && <p className="mt-2 text-[13px] font-medium text-accent-600">{error}</p>}

      <p className="mb-3 mt-6 text-[14px] font-semibold text-neutral-500">When did you measure it?</p>
      <div className="grid grid-cols-2 gap-2.5">
        {contexts.map((c) => (
          <button
            key={c.id}
            onClick={() => setContext(c.id)}
            className={[
              'flex items-center justify-between rounded-2xl border px-4 py-3 text-[14px] font-semibold transition-all duration-200',
              context === c.id
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300',
            ].join(' ')}
          >
            {c.label}
            {context === c.id && <Check size={16} className="text-primary-600" />}
          </button>
        ))}
      </div>

      <Button
        variant="primary"
        size="lg"
        fullWidth
        className="mt-6"
        onClick={handleSave}
        disabled={saving || !numValue}
      >
        {saving ? 'Saving…' : 'Save reading'}
      </Button>
    </div>
  );
}
