import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
}

export function StarRating({ rating, maxRating = 5, size = 'md' }: StarRatingProps) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4', 
    lg: 'w-5 h-5'
  };

  return (
    <div className="flex gap-1">
      {Array.from({ length: maxRating }, (_, i) => (
        <Star
          key={i}
          className={`${sizeClasses[size]} ${
            i < rating
              ? 'fill-carpet-antique-gold text-carpet-antique-gold'
              : 'text-carpet-antique-gold/30'
          }`}
        />
      ))}
    </div>
  );
}