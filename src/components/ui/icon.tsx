import * as Icons from 'lucide-react';

interface IconProps {
  name: keyof typeof Icons;
  size?: number;
  className?: string;
  fallback?: keyof typeof Icons;
}

export default function Icon({ name, size = 24, className = '', fallback = 'CircleAlert' }: IconProps) {
  const LucideIcon = Icons[name] || Icons[fallback];
  return <LucideIcon size={size} className={className} />;
}
