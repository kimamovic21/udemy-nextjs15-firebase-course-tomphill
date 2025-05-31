'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem
} from '@/components/ui/form';

const formSchema = z.object({
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  minBedrooms: z.string().optional(),
});

const FiltersForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      maxPrice: '',
      minPrice: '',
      minBedrooms: '',
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log({ data });
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
              <FormControl>
                <Input
                  {...field}
                  placeholder='Min price'
                  type='number'
                  min={0}
                  max={100000000}
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
              <FormControl>
                <Input
                  {...field}
                  placeholder='Max price'
                  type='number'
                  min={0}
                  max={100000000}
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

        <Button type='submit'>
          Search
        </Button>
      </form>
    </Form>
  );
};

export default FiltersForm;