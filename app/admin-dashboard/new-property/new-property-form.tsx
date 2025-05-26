'use client';

import { z } from 'zod';
import { PlusCircleIcon } from 'lucide-react';
import { propertyDataSchema } from '@/validation/propertySchema';
import { useAuth } from '@/context/auth';
import { saveNewProperty } from './actions';
import PropertyForm from '@/components/property-form';

const NewPropertyForm = () => {
  const auth = useAuth();

  const handleSubmit = async (data: z.infer<typeof propertyDataSchema>) => {
    const token = await auth?.currentUser?.getIdToken();

    if (!token) return;

    const response = await saveNewProperty({ ...data, token });
    console.log(response);
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