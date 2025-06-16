'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { TrashIcon } from 'lucide-react';
import { deleteObject, ref } from 'firebase/storage';
import { storage } from '@/firebase/client';
import { useAuth } from '@/context/auth';
import { deleteProperty } from './actions';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';

const DeletePropertyButton = ({
  propertyId,
  images = []
}: {
  propertyId: string;
  images: string[];
}) => {
  const router = useRouter();

  const auth = useAuth();

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteProperty = async () => {
    const token = await auth?.currentUser?.getIdToken();
    if (!token) return;

    setIsDeleting(true);

    try {
      const storageTasks: Promise<void>[] = [];

      images.forEach((image) => {
        storageTasks.push(deleteObject(ref(storage, image)));
      });

      await Promise.all(storageTasks);

      await deleteProperty(propertyId, token);

      setIsDeleting(false);

      toast.success('Success', {
        description: 'Property deleted successfully',
      });

      router.push('/admin-dashboard');
    } catch (e) {
      console.error(e);
      toast.error('Error', {
        description: 'Something went wrong while deleting the property',
      });
    };
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant='destructive'
          size='icon'
          className='cursor-pointer'
        >
          <TrashIcon />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this property?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this property.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className='cursor-pointer'>
            Cancel
          </AlertDialogCancel>

          <Button
            onClick={handleDeleteProperty}
            disabled={isDeleting}
            className='cursor-pointer'
          >
            {isDeleting ? 'Deleting...' : 'Delete Property'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePropertyButton;