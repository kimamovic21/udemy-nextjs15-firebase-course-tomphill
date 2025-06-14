'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential
} from 'firebase/auth';
import { useAuth } from '@/context/auth';
import { removeToken } from '@/context/actions';
import { deleteUserFavorites } from './actions';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';

const DeleteAccountButton = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [password, setPassword] = useState('');

  const auth = useAuth();

  const handleDeleteAccount = async () => {
    if (auth?.currentUser?.email) {
      setIsDeleting(true);
      try {
        await reauthenticateWithCredential(
          auth.currentUser,
          EmailAuthProvider.credential(auth.currentUser.email, password)
        );

        await deleteUserFavorites();

        await deleteUser(auth.currentUser);

        await removeToken();

        toast.success('Success', {
          description: 'Account deleted successfully',
        });
      } catch (e: any) {
        console.error(e);
        toast.error('Error', {
          description:
            e.code === 'auth/invalid-credentials'
              ? 'Your current password is incorrect'
              : 'An error occurred',
        });
      };
      setIsDeleting(false);
    };
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant='destructive'
          className='w-full cursor-pointer'
        >
          Delete Account
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete your account?
          </AlertDialogTitle>

          <AlertDialogDescription asChild>
            <div>
              <p>
                This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
              </p>
              <Label className='mt-2'>
                Enter your password to confirm deletion
              </Label>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                className='mt-2'
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className='cursor-pointer'>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDeleteAccount}
            disabled={isDeleting}
            className='cursor-pointer'
          >
            {isDeleting ? 'Deleting...' : 'Delete Account'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAccountButton;