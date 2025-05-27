'use client';

import { z } from 'zod';
import { SaveIcon } from 'lucide-react';
import { type Property } from '@/types/property';
import { propertyDataSchema } from '@/validation/propertySchema';
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
  status
}: EditPropertyFormProps) => {
  const handleSubmit = async (data: z.infer<typeof propertyDataSchema>) => {

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
          status
        }}
      />
    </div>
  );
};

export default EditPropertyForm;