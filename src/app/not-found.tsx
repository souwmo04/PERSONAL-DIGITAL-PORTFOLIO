import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[90svh] flex-col items-center justify-center overflow-hidden px-6 pt-24 text-center">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-deep/25 blur-[140px]" />
      <p className="pill">Error 404</p>
      <h1 className="heading-xl mt-8 text-[clamp(5rem,20vw,14rem)] text-gradient">404</h1>
      <p className="mt-4 max-w-md text-[1.0625rem] leading-relaxed text-dim">
        This page drifted out of the latent space. It may have moved, or it never existed.
      </p>
      <Link
        href="/"
        className="mt-10 rounded-full bg-gradient-to-r from-violet-deep via-violet to-iris px-6 py-3 text-sm font-medium text-void shadow-[0_0_40px_-8px_rgba(167,139,250,0.8)]"
      >
        Back to home
      </Link>
    </section>
  );
}
