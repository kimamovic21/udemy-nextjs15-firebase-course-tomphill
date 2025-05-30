'use client';

import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { SaveIcon } from 'lucide-react';
import { toast } from 'sonner';
import { type Property } from '@/types/property';
import { propertyDataSchema } from '@/validation/propertySchema';
import { auth } from '@/firebase/client';
import { updateProperty } from './actions';
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

  const handleSubmit = async (data: z.infer<typeof propertyDataSchema>) => {
    const token = await auth?.currentUser?.getIdToken();

    if (!token) return;

    await updateProperty({ ...data, id }, token);

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