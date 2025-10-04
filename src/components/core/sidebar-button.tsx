import { LucideIcon } from 'lucide-react';
import { IconType } from 'react-icons/lib';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarButtonProps {
  icon: LucideIcon | IconType;
  label: string;
  isActive?: boolean;
}

export const SidebarButton = ({ icon: Icon, label, isActive }: SidebarButtonProps) => {
  return (
    <div className={cn('group flex cursor-pointer flex-col items-center justify-center gap-y-0.5')}>
      <Button
        variant={'transparent'}
        size={'icon'}
        className={cn('group-hover:bg-accent/20 p-2', isActive && 'bg-accent/20')}
      >
        <Icon className={cn('size-5 text-white transition-all group-hover:scale-110')} />
      </Button>
      <span className={cn('group-hover:text-accent text-xs text-white')}>{label}</span>
    </div>
  );
};
