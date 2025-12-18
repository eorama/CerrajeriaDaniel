import type { HTMLAttributes } from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'action' | 'outline' | 'sticky';
  href?: string;
  as?: 'button' | 'a';
}

export default function Button({
  variant = 'action',
  className = '',
  children,
  href,
  as = 'button',
  ...props
}: Props) {
  const baseStyles = "inline-flex items-center justify-center font-bold transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-primary text-white hover:bg-opacity-90 focus:ring-primary px-6 py-3 rounded-md shadow-md",
    action: "bg-action text-title-text hover:bg-yellow-400 focus:ring-action px-6 py-3 rounded-md shadow-lg transform hover:-translate-y-0.5 text-lg",
    outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white px-5 py-2 rounded-md",
    sticky: "fixed bottom-4 right-4 z-50 rounded-full w-14 h-14 bg-action text-title-text shadow-2xl flex items-center justify-center animate-bounce-slow md:hidden"
  };

  const Component = href ? 'a' : as;
  const linkProps = href ? { href } : {};

  return (
    <Component
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...linkProps}
      {...(props as any)}
    >
      {children}
    </Component>
  );
}
