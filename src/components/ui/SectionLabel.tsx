interface Props {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}

export default function SectionLabel({ children, light = false, className = "" }: Props) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="w-6 h-px bg-champagne-gold flex-shrink-0" />
      <span
        className={`font-body text-[9px] tracking-[0.3em] uppercase ${
          light ? "text-champagne-gold" : "text-[#1C1C1C]"
        }`}
      >
        {children}
      </span>
    </div>
  );
}
