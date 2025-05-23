'use client';

import { z } from 'zod';
import { propertyDataSchema } from '@/validation/propertySchema';
import PropertyForm from '@/components/property-form';

const NewPropertyForm = () => {
  const handleSubmit = async (data: z.infer<typeof propertyDataSchema>) => {
    console.log(data);
  };

  return (
    <div>
      <PropertyForm handleSubmit={handleSubmit}/>
    </div>
  );
};

export default NewPropertyForm;