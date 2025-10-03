'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { UserButton } from '@/features/auth/components/user-button';
import { useGetWorkspaces } from '@/features/workspaces/api/use-get-workspaces';
import { useCreateWorkspaceModal } from '@/features/workspaces/store/use-create-workspace-modal';

export default function Home() {
  const router = useRouter();
  const [open, setOpen] = useCreateWorkspaceModal();

  const { data, isLoading } = useGetWorkspaces();

  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
      console.log('🏠 Home: Redirecting to existing workspace:', workspaceId);
      router.replace(`/workspace/${workspaceId}`);
    } else if (!open) {
      console.log('🏠 Home: No workspaces found, opening create modal');
      setOpen(true);
    }
  }, [isLoading, open, router, setOpen, workspaceId]);

  return (
    <div>
      Logged In
      <UserButton />
    </div>
  );
}
