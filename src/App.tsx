import { useState } from 'react';
import BottomNav, { type Tab } from '@/components/ui/BottomNav';
import Sidebar from '@/components/ui/Sidebar';
import LoadingState from '@/components/ui/LoadingState';
import Logo from '@/components/ui/Logo';

import SplashScreen from '@/screens/onboarding/SplashScreen';
import WelcomeScreen from '@/screens/onboarding/WelcomeScreen';
import ConnectHealthDataScreen from '@/screens/onboarding/ConnectHealthDataScreen';
import SehhatyAuthScreen from '@/screens/onboarding/SehhatyAuthScreen';
import ConnectionSuccessScreen from '@/screens/onboarding/ConnectionSuccessScreen';
import WelcomeBackScreen from '@/screens/onboarding/WelcomeBackScreen';

import HomeScreen from '@/screens/HomeScreen';
import GlucoseScreen from '@/screens/GlucoseScreen';
import InsightsScreen from '@/screens/InsightsScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import PrivacyScreen from '@/screens/PrivacyScreen';
import MealTrackingScreen from '@/screens/MealTrackingScreen';
import MealAnalysisScreen from '@/screens/MealAnalysisScreen';
import RootCauseScreen from '@/screens/RootCauseScreen';

import { useAppSettings } from '@/hooks/useAppSettings';
import { useGlucoseReadings } from '@/hooks/useGlucoseReadings';
import { useMeals } from '@/hooks/useMeals';
import { useMedications } from '@/hooks/useMedications';
import { useTodayActivity } from '@/hooks/useTodayActivity';

type OnboardingStep =
  | 'splash'
  | 'welcome'
  | 'connect'
  | 'sehhaty-auth'
  | 'connection-success'
  | 'welcome-back';

type FullScreen =
  | { kind: 'onboarding'; step: OnboardingStep }
  | { kind: 'meal-tracking' }
  | { kind: 'meal-analysis' }
  | { kind: 'root-cause' }
  | { kind: 'privacy' };

export default function App() {
  const { settings, loading: settingsLoading, updateSettings } = useAppSettings();
  const { readings, addReading } = useGlucoseReadings();
  const { meals, addMeal } = useMeals();
  const { medications } = useMedications();
  const { activity } = useTodayActivity();

  const [showSplash, setShowSplash] = useState(true);
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>('welcome');
  const [overlay, setOverlay] = useState<FullScreen | null>(null);
  const [tab, setTab] = useState<Tab>('home');

  const completeOnboarding = async () => {
    await updateSettings({ sehhaty_connected: true, onboarding_completed: true });
  };

  const handleDisconnectSehhaty = async () => {
    await updateSettings({ sehhaty_connected: false });
    setTab('profile');
  };

  const handleRestartOnboarding = async () => {
    await updateSettings({ sehhaty_connected: false, onboarding_completed: false });
    setOverlay(null);
    setOnboardingStep('welcome');
  };

  // --- Splash screen (always plays first) ---
  if (showSplash) {
    return (
      <SplashScreen onDone={() => setShowSplash(false)} />
    );
  }

  // --- Onboarding flow ---
  if (!settingsLoading && settings && !settings.onboarding_completed) {
    const step = onboardingStep;

    if (step === 'welcome') {
      return (
        <WelcomeScreen
          onContinueWithSehhaty={() => setOnboardingStep('connect')}
          onCreateAccount={() => setOnboardingStep('connect')}
        />
      );
    }
    if (step === 'connect') {
      return (
        <ConnectHealthDataScreen
          onContinue={() => setOnboardingStep('sehhaty-auth')}
          onSkip={() => setOnboardingStep('welcome-back')}
        />
      );
    }
    if (step === 'sehhaty-auth') {
      return (
        <SehhatyAuthScreen
          onAllow={() => setOnboardingStep('connection-success')}
          onCancel={() => setOnboardingStep('connect')}
        />
      );
    }
    if (step === 'connection-success') {
      return <ConnectionSuccessScreen onContinue={() => setOnboardingStep('welcome-back')} />;
    }
    if (step === 'welcome-back') {
      return <WelcomeBackScreen onGetStarted={completeOnboarding} />;
    }
  }

  // --- Loading ---
  if (settingsLoading || !settings) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg">
        <Logo size="md" showText={false} />
        <LoadingState label="Loading your companion…" />
      </div>
    );
  }

  // --- Full-screen overlays (no bottom nav) ---
  if (overlay) {
    if (overlay.kind === 'meal-tracking') {
      return (
        <MealTrackingScreen
          onScan={() => setOverlay({ kind: 'meal-analysis' })}
          onManual={() => setOverlay({ kind: 'meal-analysis' })}
          onBack={() => setOverlay(null)}
        />
      );
    }
    if (overlay.kind === 'meal-analysis') {
      return (
        <MealAnalysisScreen
          onAddToLog={async () => {
            await addMeal({
              name: 'Lunch',
              meal_type: 'lunch',
              carbs_grams: 62,
              source: 'scan',
              food_items: [
                { name: 'Rice', carbs: 45 },
                { name: 'Chicken', carbs: 0 },
                { name: 'Salad', carbs: 8 },
                { name: 'Sauce', carbs: 9 },
              ],
            });
            setOverlay(null);
            setTab('home');
          }}
          onBack={() => setOverlay({ kind: 'meal-tracking' })}
        />
      );
    }
    if (overlay.kind === 'root-cause') {
      return <RootCauseScreen onBack={() => setOverlay(null)} />;
    }
    if (overlay.kind === 'privacy') {
      return (
        <PrivacyScreen
          healthDataSharing={settings.health_data_sharing}
          aiInsightsEnabled={settings.ai_insights_enabled}
          mealAnalysisEnabled={settings.meal_analysis_enabled}
          onToggle={(key, value) => updateSettings({ [key]: value })}
          onDisconnectHealthData={handleDisconnectSehhaty}
          onBack={() => setOverlay(null)}
        />
      );
    }
  }

  // --- Main app with navigation ---
  const medicationStatus = medications.length > 0 ? medications[0].status : 'on_track';
  const steps = activity?.steps ?? 4820;

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar active={tab} onNavigate={setTab} />

      <div className="flex-1">
        {/* Mobile header with logo */}
        <div className="flex items-center justify-between bg-white/80 px-5 py-3 backdrop-blur-lg lg:hidden">
          <Logo size="sm" />
          <span className="flex items-center gap-1.5 rounded-full bg-success-50 px-3 py-1 text-[12px] font-semibold text-success-700">
            <span className="h-2 w-2 rounded-full bg-success-500" />
            {settings.sehhaty_connected ? 'Sehhaty Connected' : 'Demo Mode'}
          </span>
        </div>

        <main>
          {tab === 'home' && (
            <HomeScreen
              readings={readings}
              meals={meals}
              steps={steps}
              medicationStatus={medicationStatus}
              onLogGlucose={() => setTab('glucose')}
              onLogMeal={() => setOverlay({ kind: 'meal-tracking' })}
              onSeeWhy={() => setOverlay({ kind: 'root-cause' })}
              onNavigateGlucose={() => setTab('glucose')}
            />
          )}
          {tab === 'glucose' && (
            <GlucoseScreen readings={readings} onAddReading={addReading} />
          )}
          {tab === 'insights' && (
            <InsightsScreen
              onRootCause={() => setOverlay({ kind: 'root-cause' })}
              onViewDetails={() => setOverlay({ kind: 'root-cause' })}
            />
          )}
          {tab === 'profile' && (
            <ProfileScreen
              sehhatyConnected={settings.sehhaty_connected}
              onPrivacy={() => setOverlay({ kind: 'privacy' })}
              onDisconnectSehhaty={handleDisconnectSehhaty}
              onRestartOnboarding={handleRestartOnboarding}
            />
          )}
        </main>
      </div>

      <BottomNav active={tab} onNavigate={setTab} />
    </div>
  );
}
