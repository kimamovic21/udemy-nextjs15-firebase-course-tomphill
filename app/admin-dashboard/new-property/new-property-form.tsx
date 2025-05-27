'use client';

import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { PlusCircleIcon } from 'lucide-react';
import { toast } from 'sonner';
import { propertyDataSchema } from '@/validation/propertySchema';
import { useAuth } from '@/context/auth';
import { createProperty } from './actions';
import PropertyForm from '@/components/property-form';

const NewPropertyForm = () => {
  const auth = useAuth();

  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof propertyDataSchema>) => {
    const token = await auth?.currentUser?.getIdToken();

    if (!token) return;

    const response = await createProperty(data, token);

    if (!!response.error) {
      toast.error('Error!', {
        description: response.error,
      });
      return;
    };

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