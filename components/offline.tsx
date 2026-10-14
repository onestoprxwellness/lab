'use client';

import { useEffect, useState } from 'react';
import SvgIcon from './svg-icon';

const OfflineScreen = () => {
  const [isOffline, setIsOffline] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOffline(!navigator.onLine);

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  if (!isOffline) return null;

  const handleRetry = () => {
    setIsChecking(true);

    setTimeout(() => {
      setIsChecking(false);

      if (navigator.onLine) {
        setIsOffline(false);
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-9999 grid min-h-screen place-items-center overflow-hidden bg-background px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-1/2 size-a-500 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

        <div className="absolute -left-24 -top-24 size-64 rounded-full border border-primary/10" />

        <div className="absolute -bottom-32 -right-24 size-80 rounded-full border border-primary/10" />
      </div>

      <main className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 scale-125 rounded-full bg-primary/10 blur-xl" />

          <div className="relative grid size-24 place-items-center rounded-full border border-primary/10 bg-primary/5 shadow-sm">
            <div className="grid size-16 place-items-center rounded-full bg-primary/10">
              <SvgIcon name="plus" className="size-8 text-primary" />
            </div>
          </div>

          <span className="absolute bottom-1 right-1 flex size-6 items-center justify-center rounded-full border-4 border-background bg-red-500">
            <span className="size-1.5 rounded-full bg-white" />
          </span>
        </div>

        <div className="space-y-3">
          <p className="text-a-12 font-medium uppercase tracking-[0.2em] text-primary">
            Connection lost
          </p>

          <h1 className="text-a-28 font-semibold tracking-tight text-foreground sm:text-a-32">
            You’re offline
          </h1>

          <p className="mx-auto max-w-sm text-a-14 leading-6 text-muted-foreground sm:text-a-16">
            It looks like your internet connection has been interrupted. Check
            your connection and try again.
          </p>
        </div>

        <div className="mt-8 flex w-full flex-col items-center gap-3 sm:w-auto">
          <button
            type="button"
            onClick={handleRetry}
            disabled={isChecking}
            className="inline-flex h-12 min-w-40 items-center justify-center gap-2 rounded-10 bg-primary px-6 text-a-14 font-medium text-white shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <SvgIcon
              name="refresh"
              className={`size-4 ${isChecking ? 'animate-spin' : ''}`}
            />

            {isChecking ? 'Checking...' : 'Try again'}
          </button>

          <p className="text-a-12 text-muted-foreground">
            We’ll reconnect automatically when you’re back online.
          </p>
        </div>
      </main>
    </div>
  );
};

export default OfflineScreen;
