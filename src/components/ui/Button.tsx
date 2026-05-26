import Link from "next/link";
import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "outline-gold" | "outline-dark";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-champagne-gold text-luxury-black hover:bg-[#c9a45e] transition-colors",
  "outline-gold":
    "bg-transparent border border-[0.5px] border-champagne-gold text-champagne-gold hover:bg-champagne-gold hover:text-luxury-black transition-colors",
  "outline-dark":
    "bg-transparent border border-[0.5px] border-anthracite text-anthracite hover:bg-anthracite hover:text-warm-white transition-colors",
};

const baseClasses =
  "inline-flex items-center justify-center px-6 py-3 font-body text-[10px] tracking-[0.2em] uppercase cursor-pointer select-none";

type LinkButtonProps = {
  href: string;
  external?: boolean;
  target?: string;
  rel?: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: never;
  external?: never;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

type Props = LinkButtonProps | NativeButtonProps;

export default function Button(props: Props) {
  const { variant = "primary", className = "", children } = props;
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if ("href" in props && props.href !== undefined) {
    const { href, external, target, rel } = props as LinkButtonProps;
    if (external) {
      return (
        <a
          href={href}
          target={target ?? "_blank"}
          rel={rel ?? "noopener noreferrer"}
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { href: _h, external: _e, variant: _v, className: _c, children: _ch, ...rest } =
    props as NativeButtonProps;

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
