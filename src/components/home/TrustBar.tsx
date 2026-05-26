export default function TrustBar() {
  return (
    <div className="bg-[#131313] py-3 px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="font-body text-[10px] font-medium text-[#C0C0C0]">
          Verificato su AutoScout24
        </span>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="#D4AF72"
                aria-hidden="true"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <span className="font-display text-champagne-gold text-[14px]">4.9 / 5.0</span>
        </div>
        <a
          href="https://www.autoscout24.it/concessionari/bernabei-automobili-di-brando-bernabei"
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-[9px] text-[#9A9A9A] hover:text-champagne-gold transition-colors"
        >
          Autoscout24.it →
        </a>
      </div>
    </div>
  );
}
