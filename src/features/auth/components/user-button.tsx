import { useRouter } from 'next/navigation';
import { useAuthActions } from '@convex-dev/auth/react';
import { LogOut } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LoadingSpinner } from '@/components/core/loading-spinner';
import { useCurrentUser } from '@/features/auth/api/use-current-user';

export const UserButton = () => {
  const { signOut } = useAuthActions();
  const router = useRouter();
  const { data, isLoading } = useCurrentUser();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!data) {
    return null;
  }

  const { name, image } = data;

  const avatarFallback = name!.charAt(0).toUpperCase();

  const handleSignOut = () => {
    signOut();
    router.push('/auth');
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className={cn('relative outline-none')}>
        <Avatar className={cn('size-10 transition hover:opacity-75')}>
          <AvatarImage alt={name} src={image} />
          <AvatarFallback className={cn('bg-sky-500 text-white')}>{avatarFallback}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="center" side="right" className={cn('w-60')}>
        <DropdownMenuItem onClick={handleSignOut} className={cn('cursor-pointer')}>
          <LogOut className={cn('mr-2 size-4')} />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
