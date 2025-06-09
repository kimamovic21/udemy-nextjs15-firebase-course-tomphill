import { Suspense } from 'react';
import { BathIcon, BedIcon, HomeIcon } from 'lucide-react';
import { getProperties } from '@/data/properties';
import { imageUrlFormatter } from '@/lib/imageUrlFormatter';
import { getUserFavorites } from '@/data/favorites';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import numeral from 'numeral';
import Image from 'next/image';
import Link from 'next/link';
import FiltersForm from './filters-form';
import ToggleFavoriteButton from './toggle-favorite-button';

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

  const { data, totalPages } = properties;

  const userFavorites = await getUserFavorites() || {};

  return (
    <div className='max-w-screen-lg mx-auto'>
      <h2 className='text-4xl font-bold p-5'>
        Property Search
      </h2>

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

      <div className='grid md:grid-cols-3 mt-5 gap-5'>
        {data?.map((property) => {
          const addressLines = [
            property.address1,
            property.address2,
            property.city,
            property.postcode
          ].filter(addressLine => !!addressLine).join(', ');

          return (
            <Card key={property.id} className='overflow-hidden'>
              <CardContent className='px-0 -mt-6'>
                <div className='h-40 relative bg-sky-50 text-zinc-400 flex-col'>
                  <ToggleFavoriteButton
                    propertyId={property.id}
                    isFavorite={userFavorites[property.id]}
                  />

                  {!!property?.images?.[0] && (
                    <Image
                      src={imageUrlFormatter(property.images[0])}
                      alt='Rental image'
                      className='object-cover'
                      fill
                    />
                  )}

                  {!property?.images?.[0] && (
                    <div className='flex flex-col items-center justify-center h-full gap-1'>
                      <HomeIcon className='w-6 h-6' />
                      <small>No Image</small>
                    </div>
                  )}
                </div>

                <div className='flex flex-col gap-5 p-5'>
                  <p>{addressLines}</p>

                  <div className='flex gap-5'>
                    <div className='flex gap-2'>
                      <BedIcon />
                      <span>{property.bedrooms}</span>
                    </div>

                    <div className='flex gap-2'>
                      <BathIcon />
                      <span>{property.bathrooms}</span>
                    </div>
                  </div>

                  <p className='text-2xl'>
                    £{numeral(property.price).format('0,0')}
                  </p>

                  <Button asChild>
                    <Link href={`/property/${property.id}`}>
                      View Property
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className='flex gap-2 items-center justify-center py-10'>
        {Array?.from({ length: totalPages })?.map((_, i) => {
          const newSearchParams = new URLSearchParams();

          if (searchParamsValues?.minPrice) {
            newSearchParams.set('minPrice', searchParamsValues.minPrice);
          };

          if (searchParamsValues?.maxPrice) {
            newSearchParams.set('maxPrice', searchParamsValues.maxPrice);
          };

          if (searchParamsValues?.minBedrooms) {
            newSearchParams.set('minBedrooms', searchParamsValues.minBedrooms);
          };

          newSearchParams.set('page', `${i + 1}`);

          return (
            <Button
              key={i}
              asChild={page !== i + 1}
              disabled={page === i + 1}
              variant='outline'
            >
              <Link href={`/property-search?${newSearchParams.toString()}`}>
                {i + 1}
              </Link>
            </Button>
          )
        })}
      </div>
    </div>
  );
};

export default PropertySearchPage;