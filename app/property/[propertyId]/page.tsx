import { getPropertyById } from '@/data/properties';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown'
import Link from 'next/link';

const PropertyPage = async ({
  params
}: {
  params: Promise<any>
}) => {
  const paramsValue = await params;

  const property = await getPropertyById(paramsValue.propertyId);

  return (
    <div className='grid grid-cols-[1fr_400px]'>
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
      <div className='bg-sky-200 h-screen sticky'>

      </div>
    </div>
  );
};

export default PropertyPage;