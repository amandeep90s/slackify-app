import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { WorkspaceFormData, workspaceSchema } from '@/lib/validators';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Error } from '@/components/core/error';
import { InputError } from '@/components/core/input-error';
import { useCreateWorkspace } from '@/features/workspaces/api/use-create-workspace';
import { useCreateWorkspaceModal } from '@/features/workspaces/store/use-create-workspace-modal';

export const CreateWorkspaceModal = () => {
  const [open, setOpen] = useCreateWorkspaceModal();
  const { mutate: createWorkspace, isPending, error: workspaceError } = useCreateWorkspace();

  const [error, setError] = useState<string | null>(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<WorkspaceFormData>({
    resolver: zodResolver(workspaceSchema),
    mode: 'onBlur',
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
        onSuccess: () => {
          setOpen(false);
          reset();
        },
        onError: () => {
          setError(workspaceError?.message || 'Failed to create workspace');
        },
      }
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a workspace</DialogTitle>
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
              autoFocus
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
