import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col items-center justify-center p-6 text-center">
      <h2 className="font-serif text-4xl mb-4 italic">Sayfa Bulunamadı</h2>
      <p className="text-ink-dim mb-8 max-w-md">
        Aradığınız sayfa mevcut değil veya taşınmış olabilir.
      </p>
      <Link
        href="/"
        className="border border-line-strong px-6 py-3 text-sm hover:border-accent hover:text-accent transition-colors"
      >
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}
