import Link from "next/link";

const baseStyles =
  "motion-control tap-transparent inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md font-sans font-medium transition-[transform,box-shadow,background-color,color,border-color] duration-160 hover:-translate-y-px active:translate-y-0 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#93a1ff] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:transform-none";

const variantStyles = {
  primary:
    "border border-transparent bg-royal-blue text-white shadow-[0_1px_1px_rgba(3,4,12,0.05),inset_0_32px_24px_rgba(255,255,255,0.05),inset_0_2px_1px_rgba(255,255,255,0.25),inset_0_-2px_1px_rgba(0,0,0,0.2)] hover:bg-[#354bdb]",
  secondary:
    "border border-transparent bg-black/5 text-ink shadow-[0_1px_2px_rgba(3,4,12,0.05),inset_0_-2px_1px_rgba(3,4,12,0.05)] hover:bg-black/10",
  outline:
    "border border-black/15 bg-white text-ink shadow-[0_1px_2px_rgba(3,4,12,0.05),inset_0_-2px_1px_rgba(3,4,12,0.05)] hover:bg-surface",
  text: "border border-transparent bg-transparent text-ink shadow-none hover:bg-black/5"
};

const sizeStyles = {
  small: "min-h-10 px-5 py-2 leading-6",
  medium: "min-h-11 px-6 py-2.5 leading-6",
  large: "min-h-12 px-7 py-3 text-lg leading-6",
  icon: "size-12 p-0"
};

export default function Button({
  children,
  className = "",
  href,
  size = "medium",
  variant = "primary",
  disabled = false,
  ...props
}) {
  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
    disabled ? "pointer-events-none cursor-not-allowed opacity-50 transform-none" : ""
  } ${className}`;

  if (href) {
    return (
      <Link
        className={classes}
        href={href}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled} type="button" {...props}>
      {children}
    </button>
  );
}
