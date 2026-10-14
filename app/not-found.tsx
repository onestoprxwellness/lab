import GoBackBtn from '@/components/btn/go-back-btn';
import { Button } from '@/components/button';
import { routes } from '@/lib/routes';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 w-full aspect-square  max-w-a-500 -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-secondary/10 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-xl text-center">
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-app-border bg-primary/10">
          <span className="text-4xl font-bold text-primary">404</span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-main-title md:text-5xl">
          Page not found
        </h1>

        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-sub-title">
          The page you&apos;re looking for doesn&apos;t exist, may have been
          moved, or the URL might be incorrect.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href={routes.home()}>
            <Button>Back to Home</Button>
          </Link>

          <GoBackBtn className="btn-outline">Go Back</GoBackBtn>
        </div>

        <div className="my-12 h-px w-full bg-fade-stroke" />

        <div className="rounded-xl border border-app-border bg-foreground/40 p-5 backdrop-blur-sm">
          <p className="text-sm text-sub-title">
            If you believe this is an error, please contact support or return to
            the dashboard to continue using the application.
          </p>
        </div>
      </div>
    </main>
  );
}
