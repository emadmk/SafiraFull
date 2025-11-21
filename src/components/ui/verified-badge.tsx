interface VerifiedBadgeProps {
  text?: string;
  variant?: 'default' | 'small';
}

export function VerifiedBadge({ 
  text = "Verified Purchase", 
  variant = 'default' 
}: VerifiedBadgeProps) {
  const sizeClasses = variant === 'small' 
    ? 'px-2 py-1 text-xs' 
    : 'px-3 py-1.5 text-sm';

  return (
    <div className={`inline-flex items-center gap-1 ${sizeClasses} rounded-full bg-carpet-antique-gold/10 border border-carpet-antique-gold/20`}>
      <div className="w-2 h-2 bg-carpet-antique-gold rounded-full" />
      <span className="text-carpet-antique-gold font-medium">{text}</span>
    </div>
  );
}