import { Suspense } from 'react';
import { getProperties } from '@/data/properties';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import FiltersForm from './filters-form';

const PropertySearchPage = async ({
  searchParams
}: {
  searchParams: Promise<any>
}) => {
  const searchParamsValues = await searchParams;

  const parsedPage = parseInt(searchParamsValues?.page);
  const parsedMinPrice = parseInt(searchParamsValues?.minPrice);
  const parsedMaxPrice = parseInt(searchParamsValues?.maxPrice);
  const parsedMinBedrooms = parseInt(searchParamsValues?.minBedrooms);

  const page = isNaN(parsedPage) ? 1 : parsedPage;
  const minPrice = isNaN(parsedMinPrice) ? null : parsedMinPrice;
  const maxPrice = isNaN(parsedMaxPrice) ? null : parsedMaxPrice;
  const minBedrooms = isNaN(parsedMinBedrooms) ? null : parsedMinBedrooms;

  const properties = await getProperties({
    pagination: {
      page,
      pageSize: 3
    },
    filters: {
      minPrice,
      maxPrice,
      minBedrooms,
      status: ['for-sale'],
    }
  });

  console.log(properties);

  return (
    <div className='max-w-screen-lg mx-auto'>
      <h2 className='text-4xl font-bold p-5'>Property Search</h2>
      <Card>
        <CardHeader>
          <CardTitle>
            Filters
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Suspense>
            <FiltersForm />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertySearchPage;