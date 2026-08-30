import { useState } from 'react';
import { ArrowLeft, ShieldCheck, Lock, Sparkles, Camera, Plug } from 'lucide-react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

interface PrivacyScreenProps {
  healthDataSharing: boolean;
  aiInsightsEnabled: boolean;
  mealAnalysisEnabled: boolean;
  onToggle: (key: 'health_data_sharing' | 'ai_insights_enabled' | 'meal_analysis_enabled', value: boolean) => void;
  onDisconnectHealthData: () => void;
  onBack: () => void;
}

interface ToggleProps {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  label: string;
  description: string;
  value: boolean;
  onToggle: () => void;
}

function Toggle({ icon, iconBg, iconColor, label, description, value, onToggle }: ToggleProps) {
  return (
    <div className="flex items-center gap-3 px-5 py-4">
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}>
        {icon}
      </span>
      <div className="flex-1">
        <p className="text-[15px] font-semibold text-neutral-900">{label}</p>
        <p className="text-[13px] text-neutral-400">{description}</p>
      </div>
      <button
        onClick={onToggle}
        className={[
          'relative h-7 w-12 rounded-full transition-colors duration-200',
          value ? 'bg-primary-500' : 'bg-neutral-200',
        ].join(' ')}
        aria-label={value ? 'On' : 'Off'}
      >
        <span
          className={[
            'absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-200',
            value ? 'left-6' : 'left-1',
          ].join(' ')}
        />
      </button>
    </div>
  );
}

export default function PrivacyScreen({
  healthDataSharing,
  aiInsightsEnabled,
  mealAnalysisEnabled,
  onToggle,
  onDisconnectHealthData,
  onBack,
}: PrivacyScreenProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg">
      <div className="px-5 py-6">
        <button
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-500 shadow-card transition-colors hover:text-neutral-700"
        >
          <ArrowLeft size={18} />
        </button>
      </div>

      <div className="px-5 pb-10">
        <div className="mx-auto max-w-md">
          <div className="animate-fade-up">
            <h1 className="text-[24px] font-extrabold tracking-tight text-neutral-900">Privacy & Permissions</h1>
            <div className="mt-4 flex items-start gap-3 rounded-2xl bg-gradient-to-br from-primary-50 to-secondary-50 px-5 py-4">
              <ShieldCheck size={22} className="mt-0.5 shrink-0 text-primary-600" />
              <p className="text-[15px] font-semibold leading-relaxed text-neutral-800">
                You control your health data.
              </p>
            </div>
          </div>

          {/* Settings */}
          <div className="mt-6 animate-fade-up [animation-delay:100ms]">
            <p className="mb-2 px-1 text-[13px] font-bold uppercase tracking-wide text-neutral-400">Data Settings</p>
            <div className="divide-y divide-neutral-100 rounded-xl2 border border-neutral-100 bg-white shadow-card">
              <Toggle
                icon={<Lock size={20} />}
                iconBg="bg-primary-50"
                iconColor="text-primary-600"
                label="Health data sharing"
                description="Share data with MyGluco"
                value={healthDataSharing}
                onToggle={() => onToggle('health_data_sharing', !healthDataSharing)}
              />
              <Toggle
                icon={<Sparkles size={20} />}
                iconBg="bg-ai-50"
                iconColor="text-ai-600"
                label="AI insights"
                description="Generate glucose pattern insights"
                value={aiInsightsEnabled}
                onToggle={() => onToggle('ai_insights_enabled', !aiInsightsEnabled)}
              />
              <Toggle
                icon={<Camera size={20} />}
                iconBg="bg-accent-50"
                iconColor="text-accent-600"
                label="Meal analysis"
                description="AI carbohydrate estimation"
                value={mealAnalysisEnabled}
                onToggle={() => onToggle('meal_analysis_enabled', !mealAnalysisEnabled)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 space-y-3 animate-fade-up [animation-delay:200ms]">
            <Button variant="secondary" size="lg" fullWidth icon={<ShieldCheck size={18} />}>
              Manage permissions
            </Button>
            <Button variant="danger" size="lg" fullWidth icon={<Plug size={18} />} onClick={() => setConfirmOpen(true)}>
              Disconnect health data
            </Button>
          </div>

          <p className="mt-6 text-center text-[12px] leading-relaxed text-neutral-400">
            MyGluco does not claim any certifications or legal approvals. This is a prototype demonstrating privacy controls.
          </p>
        </div>
      </div>

      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title="Disconnect health data?">
        <p className="text-[15px] leading-relaxed text-neutral-600">
          This will remove the connection to Sehhaty. You can reconnect at any time. Your logged data in MyGluco will remain.
        </p>
        <div className="mt-6 flex gap-3">
          <Button variant="secondary" size="md" fullWidth onClick={() => setConfirmOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            size="md"
            fullWidth
            onClick={() => {
              setConfirmOpen(false);
              onDisconnectHealthData();
            }}
          >
            Disconnect
          </Button>
        </div>
      </Modal>
    </div>
  );
}
