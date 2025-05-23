import { z } from 'zod';

export const propertyDataSchema = z.object({
  address1: z
    .string()
    .min(1, 'Address line 1 must contain a value')
    .max(30, 'Address line 1 must contain less than 30 characters'),

  address2: z
    .string()
    .max(30, 'Address line 2 must contain less than 30 characters')
    .optional(),

  city: z
    .string()
    .min(3, 'City must contain at least 3 characters')
    .max(30, 'City must contain less than 30 characters'),

  postcode: z
    .string()
    .refine((postcode) => {
      const postcodeRegex = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?\s?[0-9][A-Z]{2}$/i;
      return postcodeRegex.test(postcode);
    }, 'Invalid UK postcode'),

  price: z
    .coerce
    .number()
    .positive('Price must be greater than zero')
    .min(100, 'Price must be at least £100')
    .max(1_000_000_000, 'Price must be less than £1,000,000,000'),

  description: z
    .string()
    .min(10, 'Description must contain at least 10 characters')
    .max(200, 'Description must contain less than 200 characters'),

  bedrooms: z
    .coerce
    .number()
    .min(1, 'Bedrooms must be at least 1')
    .max(10, 'Bedrooms must be less than 10'),

  bathrooms: z
    .coerce
    .number()
    .min(1, 'Bathrooms must be at least 1')
    .max(10, 'Bathrooms must be less than 10'),

  status: z
    .enum(['draft', 'for-sale', 'withdrawn', 'sold']),
});