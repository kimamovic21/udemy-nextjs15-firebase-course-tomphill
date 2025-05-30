'use client';

import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { PlusCircleIcon } from 'lucide-react';
import { toast } from 'sonner';
import {
  type UploadTask,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { propertySchema } from '@/validation/propertySchema';
import { useAuth } from '@/context/auth';
import { storage } from '@/firebase/client';
import { createProperty } from './actions';
import { savePropertyImages } from '../actions';
import PropertyForm from '@/components/property-form';

const NewPropertyForm = () => {
  const auth = useAuth();

  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof propertySchema>) => {
    const token = await auth?.currentUser?.getIdToken();

    if (!token) return;

    const { images, ...rest } = data;

    const response = await createProperty(rest, token);

    if (!!response.error || !response.propertyId) {
      toast.error('Error!', {
        description: response.error,
      });
      return;
    };

    const uploadTasks: UploadTask[] = [];
    const paths: string[] = [];

    images.forEach((image, index) => {
      if (image.file) {
        const path = `properties/${response.propertyId}/${Date.now()}-${index}-${image.file.name}`;

        paths.push(path);

        const storageRef = ref(storage, path);

        uploadTasks.push(uploadBytesResumable(storageRef, image.file));
      };
    });

    await Promise.all(uploadTasks);

    await savePropertyImages({
      propertyId: response.propertyId,
      images: paths
    }, token);

    toast.success('Success!', {
      description: 'Property created',
    });

    router.push('/admin-dashboard');
  };

  return (
    <div>
      <PropertyForm
        handleSubmit={handleSubmit}
        submitButtonLabel={
          <>
            <PlusCircleIcon />
            <span>Create Property</span>
          </>
        }
      />
    </div>
  );
};

export default NewPropertyForm;