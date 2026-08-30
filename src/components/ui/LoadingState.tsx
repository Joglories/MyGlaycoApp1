interface LoadingStateProps {
  label?: string;
  fullScreen?: boolean;
}

export default function LoadingState({ label = 'Loading…', fullScreen = false }: LoadingStateProps) {
  return (
    <div
      className={[
        'flex flex-col items-center justify-center gap-3 text-neutral-400',
        fullScreen ? 'h-screen w-full' : 'py-16',
      ].join(' ')}
    >
      <div className="relative h-10 w-10">
        <span className="absolute inset-0 rounded-full border-2 border-primary-100" />
        <span className="absolute inset-0 rounded-full border-2 border-primary-500 border-t-transparent animate-spin" />
      </div>
      <p className="text-[13px] font-medium">{label}</p>
    </div>
  );
}
