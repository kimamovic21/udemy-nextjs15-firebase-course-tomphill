import { ArrowLeftIcon, BedIcon, BathIcon } from 'lucide-react';
import { getPropertyById } from '@/data/properties';
import { Button } from '@/components/ui/button';
import numeral from 'numeral';
import ReactMarkdown from 'react-markdown'
import Link from 'next/link';
import PropertyStatusBadge from '@/components/property-status-badge';

const PropertyPage = async ({
  params
}: {
  params: Promise<any>
}) => {
  const paramsValue = await params;

  const property = await getPropertyById(paramsValue.propertyId);

  const addressLines = [
    property.address1,
    property.address2,
    property.city,
    property.postcode
  ].filter((addressLine => !!addressLine));

  return (
    <div className='grid grid-cols-[1fr_500px]'>
      <div>
        carosuel
        <div className='property-description max-w-screen-md mx-auto py-10 px-4'>
          <Button asChild>
            <Link href='/' className='flex items-center gap-2'>
              <ArrowLeftIcon />
              <span>Back to properties</span>
            </Link>
          </Button>
          <ReactMarkdown>
            {property.description}
          </ReactMarkdown>
        </div>
      </div>

      <div className='bg-sky-200 h-screen p-10 sticky top-0 grid place-items-center'>
        <div className='flex flex-col gap-10 w-full'>
          <PropertyStatusBadge
            status={property.status}
            className='mr-auto text-base'
          />

          <h2 className='text-4xl font-semibold'>
            {addressLines?.map((addressLine, index) => (
              <div key={index}>
                {addressLine}
                {index < addressLines.length - 1 && ', '}
              </div>
            ))}
          </h2>

          <h3 className='text-3xl font-light'>
            £{numeral(property.price).format('0,0')}
          </h3>

          <div className='flex gap-10'>
            <div className='flex gap-2'>
              <BedIcon />
              <span>{property.bedrooms} Bedrooms</span>
            </div>
            <div className='flex gap-2'>
              <BathIcon />
              <span>{property.bathrooms} Bathrooms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;