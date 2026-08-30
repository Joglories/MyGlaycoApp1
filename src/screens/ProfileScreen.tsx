import {
  ShieldCheck,
  Watch,
  Pill,
  Lock,
  Bell,
  Settings as SettingsIcon,
  ChevronRight,
  Plug,
} from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface ProfileScreenProps {
  sehhatyConnected: boolean;
  onPrivacy: () => void;
  onDisconnectSehhaty: () => void;
  onRestartOnboarding: () => void;
}

interface RowProps {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  label: string;
  value?: string;
  onClick?: () => void;
}

function Row({ icon, iconBg, iconColor, label, value, onClick }: RowProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-neutral-50"
    >
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}>
        {icon}
      </span>
      <div className="flex-1">
        <p className="text-[15px] font-semibold text-neutral-900">{label}</p>
        {value && <p className="text-[13px] text-neutral-400">{value}</p>}
      </div>
      <ChevronRight size={18} className="text-neutral-300" />
    </button>
  );
}

export default function ProfileScreen({
  sehhatyConnected,
  onPrivacy,
  onDisconnectSehhaty,
  onRestartOnboarding,
}: ProfileScreenProps) {
  return (
    <div className="px-5 pb-24 pt-6 lg:pb-10 lg:pt-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-[24px] font-extrabold tracking-tight text-neutral-900">My Profile</h1>

        {/* User card */}
        <Card padding="lg" className="mt-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-secondary-200 via-primary-200 to-ai-200 text-[24px] font-extrabold text-primary-700">
              A
            </div>
            <div>
              <p className="text-[20px] font-bold text-neutral-900">Amjad</p>
              <p className="text-[14px] text-neutral-400">MyGluco member</p>
            </div>
          </div>
        </Card>

        {/* Health Connections */}
        <div className="mt-6">
          <p className="mb-2 px-1 text-[13px] font-bold uppercase tracking-wide text-neutral-400">Health Connections</p>
          <Card padding="none">
            <div className="flex items-center gap-3 px-5 py-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary-50 text-secondary-600">
                <ShieldCheck size={20} />
              </span>
              <div className="flex-1">
                <p className="text-[15px] font-semibold text-neutral-900">Sehhaty</p>
                <p className="text-[13px] text-neutral-400">Future integration concept</p>
              </div>
              {sehhatyConnected ? (
                <span className="flex items-center gap-1.5 rounded-full bg-success-50 px-3 py-1 text-[13px] font-semibold text-success-700">
                  <span className="h-2 w-2 rounded-full bg-success-500" /> Connected
                </span>
              ) : (
                <span className="rounded-full bg-neutral-100 px-3 py-1 text-[13px] font-semibold text-neutral-500">
                  Not connected
                </span>
              )}
            </div>
          </Card>
        </div>

        {/* Settings sections */}
        <div className="mt-6">
          <p className="mb-2 px-1 text-[13px] font-bold uppercase tracking-wide text-neutral-400">Devices & Data</p>
          <Card padding="none">
            <div className="divide-y divide-neutral-100">
              <Row icon={<Watch size={20} />} iconBg="bg-primary-50" iconColor="text-primary-600" label="Glucose Devices" value="Connect device" />
              <Row icon={<Pill size={20} />} iconBg="bg-accent-50" iconColor="text-accent-600" label="Medications" value="Manage medications" />
              <Row icon={<Lock size={20} />} iconBg="bg-ai-50" iconColor="text-ai-600" label="Privacy & Permissions" value="Manage data permissions" onClick={onPrivacy} />
            </div>
          </Card>
        </div>

        <div className="mt-6">
          <p className="mb-2 px-1 text-[13px] font-bold uppercase tracking-wide text-neutral-400">Preferences</p>
          <Card padding="none">
            <div className="divide-y divide-neutral-100">
              <Row icon={<Bell size={20} />} iconBg="bg-secondary-50" iconColor="text-secondary-600" label="Notifications" value="Notification settings" />
              <Row icon={<SettingsIcon size={20} />} iconBg="bg-neutral-100" iconColor="text-neutral-600" label="Settings" value="App preferences" />
            </div>
          </Card>
        </div>

        {/* Disconnect / restart */}
        <div className="mt-6 space-y-3">
          {sehhatyConnected && (
            <Button variant="danger" size="md" fullWidth icon={<Plug size={18} />} onClick={onDisconnectSehhaty}>
              Disconnect Sehhaty
            </Button>
          )}
          <button
            onClick={onRestartOnboarding}
            className="w-full text-center text-[13px] font-semibold text-neutral-400 transition-colors hover:text-neutral-600"
          >
            Replay onboarding
          </button>
        </div>

        <p className="mt-8 text-center text-[12px] text-neutral-300">
          MyGluco · Demo prototype · v1.0
        </p>
      </div>
    </div>
  );
}
