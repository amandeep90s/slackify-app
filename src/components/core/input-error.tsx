import { cn } from '@/lib/utils';

interface InputErrorProps {
  error?: string;
  className?: string;
}

export const InputError = ({ error, className }: InputErrorProps) => {
  if (!error) return null;

  return (
    <p className={cn('text-destructive mt-1 text-xs', className)} role="alert">
      {error}
    </p>
  );
};
