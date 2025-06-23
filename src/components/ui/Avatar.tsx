import React from 'react';
import { cn } from '../../utils/cn';
import { User } from 'lucide-react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  fallback?: React.ReactNode;
}

const Avatar = ({
  src,
  alt = 'Avatar',
  size = 'md',
  className,
  fallback,
}: AvatarProps) => {
  const [imgError, setImgError] = React.useState(false);
  
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  };
  
  const handleError = () => {
    setImgError(true);
  };

  return (
    <div
      className={cn(
        'relative rounded-full overflow-hidden flex items-center justify-center bg-gray-200 text-gray-600',
        sizeClasses[size],
        className
      )}
    >
      {!imgError && src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={handleError}
        />
      ) : fallback ? (
        fallback
      ) : (
        <User
          className={cn(
            'w-1/2 h-1/2',
          )}
        />
      )}
    </div>
  );
};

export default Avatar;