import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  /** Size of the spinner. Default is 'md' (32px) */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Custom className to override default styles */
  className?: string;
  /** Container className for the wrapper div */
  containerClassName?: string;
  /** Color variant of the spinner */
  variant?: 'primary' | 'white' | 'gray';
}

const sizeMap = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
} as const;

const variantMap = {
  primary: 'border-primary border-t-transparent',
  white: 'border-white border-t-transparent',
  gray: 'border-gray-400 border-t-transparent',
} as const;

export const LoadingSpinner = ({
  size = 'md',
  className,
  containerClassName,
  variant = 'white',
}: LoadingSpinnerProps) => {
  return (
    <div className={cn('flex items-center justify-center p-8', containerClassName)}>
      <div
        className={cn(
          'animate-spin rounded-full border-2',
          sizeMap[size],
          variantMap[variant],
          className
        )}
        aria-label="Loading..."
        role="status"
      />
    </div>
  );
};
