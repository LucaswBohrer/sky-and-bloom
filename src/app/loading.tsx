export default function Loading() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-ice" role="status" aria-label="Loading SKY and BLOOM">
      <div className="flex flex-col items-center gap-4">
        <div className="size-12 animate-spin rounded-full border-4 border-sky border-t-bloom" aria-hidden="true" />
        <p className="font-display text-lg font-semibold text-deep">SKY &amp; BLOOM is blooming…</p>
      </div>
    </div>
  );
}
