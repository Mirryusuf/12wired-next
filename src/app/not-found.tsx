import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] flex-col items-center justify-center gap-6 px-5 text-center">
      <h1 className="display-xl animate-fade-up">404</h1>
      <p className="label animate-fade-up text-cream/60 [animation-delay:180ms]">
        This page is off the setlist
      </p>
      <Link
        href="/"
        className="label animate-fade-up border border-cream px-7 py-3 transition-colors duration-300 [animation-delay:320ms] hover:border-flame hover:bg-flame"
      >
        Back home
      </Link>
    </section>
  );
}
