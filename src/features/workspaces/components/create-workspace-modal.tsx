import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { WorkspaceFormData, workspaceSchema } from '@/lib/validators';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Error } from '@/components/core/error';
import { InputError } from '@/components/core/input-error';
import { useCreateWorkspace } from '@/features/workspaces/api/use-create-workspace';
import { useCreateWorkspaceModal } from '@/features/workspaces/store/use-create-workspace-modal';

export const CreateWorkspaceModal = () => {
  const router = useRouter();

  const [open, setOpen] = useCreateWorkspaceModal();
  const { mutate: createWorkspace, isPending } = useCreateWorkspace();

  const [error, setError] = useState<string | null>(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<WorkspaceFormData>({
    resolver: zodResolver(workspaceSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = (data: WorkspaceFormData) => {
    setError(null);
    createWorkspace(
      { name: data.name },
      {
        onSuccess: (workspaceId) => {
          // Log workspace ID to verify it's being received
          console.log('✅ Workspace created successfully with ID:', workspaceId);

          // Show success toast
          toast.success('Workspace created successfully!');

          // Invalidate and refetch workspaces to update the list
          // queryClient.invalidateQueries({ queryKey: ['convexQuery', api.workspaces.get, {}] });

          // Close modal and reset form
          setOpen(false);
          reset();

          // Redirect to the newly created workspace
          console.log('🚀 Redirecting to workspace:', `/workspace/${workspaceId}`);
          router.push(`/workspace/${workspaceId}`);
        },
        onError: (error) => {
          setError(error?.message || 'Failed to create workspace');
        },
      }
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent aria-describedby="Create a new workspace">
        <DialogHeader>
          <DialogTitle>Add a workspace</DialogTitle>
          <DialogDescription>Create a new workspace for your projects.</DialogDescription>
        </DialogHeader>

        {error && <Error error={error} />}

        <form onSubmit={handleSubmit(onSubmit)} className={cn('space-y-5')}>
          <div>
            <Label className={cn('mb-2')} htmlFor="name">
              Workspace Name
            </Label>
            <Input
              type="text"
              {...register('name')}
              name="name"
              id="name"
              placeholder="E.g. Work, Personal, Home"
              disabled={isPending}
              className={cn(errors.name && 'border-destructive focus:visible:ring-destructive/20')}
            />
            <InputError error={errors.name?.message} />
          </div>

          <div className={cn('flex justify-end')}>
            <Button type="submit" disabled={isPending}>
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
