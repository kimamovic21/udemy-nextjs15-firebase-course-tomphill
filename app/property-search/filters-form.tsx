'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form';

const formSchema = z.object({
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  minBedrooms: z.string().optional(),
});

const FiltersForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      maxPrice: searchParams.get('maxPrice') ?? '',
      minPrice: searchParams.get('minPrice') ?? '',
      minBedrooms: searchParams.get('minBedrooms') ?? '',
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const newSearchParams = new URLSearchParams();

    if (data.minPrice) {
      newSearchParams.set('minPrice', data.minPrice);
    };

    if (data.maxPrice) {
      newSearchParams.set('maxPrice', data.maxPrice);
    };

    if (data.minBedrooms) {
      newSearchParams.set('minBedrooms', data.minBedrooms);
    };

    newSearchParams.set('page', '1');
    router.push(`/property-search?${newSearchParams.toString()}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='grid grid-cols-4 gap-2'
      >
        <FormField
          control={form.control}
          name='minPrice'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Min Price
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Min price'
                  type='number'
                  min={0}
                  max={1000000000}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='maxPrice'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Max Price
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Max price'
                  type='number'
                  min={0}
                  max={1000000000}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='minBedrooms'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Min Bedrooms
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Min bedrooms'
                  type='number'
                  min={0}
                  max={10}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type='submit'
          className='mt-auto cursor-pointer'
        >
          Search
        </Button>
      </form>
    </Form>
  );
};

export default FiltersForm;