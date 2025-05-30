'use client';

import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { SaveIcon } from 'lucide-react';
import { toast } from 'sonner';
import {
  type UploadTask,
  deleteObject,
  ref,
  uploadBytesResumable
} from 'firebase/storage';
import { type Property } from '@/types/property';
import { propertySchema } from '@/validation/propertySchema';
import { auth, storage } from '@/firebase/client';
import { updateProperty } from './actions';
import { savePropertyImages } from '../../actions';
import PropertyForm from '@/components/property-form';

type EditPropertyFormProps = Property;

const EditPropertyForm = ({
  id,
  address1,
  address2,
  city,
  postcode,
  bathrooms,
  bedrooms,
  description,
  price,
  status,
  images = []
}: EditPropertyFormProps) => {
  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof propertySchema>) => {
    const token = await auth?.currentUser?.getIdToken();

    if (!token) return;

    const { images: newImages, ...rest } = data;

    const response = await updateProperty({ ...rest, id }, token);

    if (!!response?.error) {
      toast.error('Error!', {
        description: response?.message,
      });
    };

    const storageTasks: (UploadTask | Promise<void>)[] = [];

    const imagesToDelete = images
      .filter((image) => !newImages.find((newImage) => image === newImage.url))

    imagesToDelete.forEach((image) => {
      storageTasks.push(deleteObject(ref(storage, image)));
    });

    const paths: string[] = [];

    newImages.forEach((image, index) => {
      if (image.file) {
        const path = `properties/${id}/${Date.now()}-${index}-${image.file.name}`;

        paths.push(path);

        const storageRef = ref(storage, path);

        storageTasks.push(uploadBytesResumable(storageRef, image.file));
      } else {
        paths.push(image.url);
      };
    });

    await Promise.all(storageTasks);
    await savePropertyImages({
      propertyId: id,
      images: paths,
    }, token);

    toast.success('Success!', {
      description: 'Property updated',
    });

    router.push('/admin-dashboard');
  };

  return (
    <div>
      <PropertyForm
        handleSubmit={handleSubmit}
        submitButtonLabel={
          <>
            <SaveIcon />
            <span>Save Property</span>
          </>
        }
        defaultValues={{
          address1,
          address2,
          city,
          postcode,
          bathrooms,
          bedrooms,
          description,
          price,
          status,
          images: images?.map((image) => ({
            id: image,
            url: image,
          })),
        }}
      />
    </div>
  );
};

export default EditPropertyForm;