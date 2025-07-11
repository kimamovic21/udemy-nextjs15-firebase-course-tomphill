import { Button } from '@/components/ui/button';
import { SearchIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const HomePage = () => {
  return (
    <main className='relative min-h-screen -mt-24 p-24 flex items-center justify-center'>
      <Image
        src='/hero.jpeg'
        alt='Hero Image'
        fill
        className='object-cover'
      />

      <div className='absolute top-0 left-0 size-full bg-black/50 backdrop-blur-xs' />

      <div className='flex flex-col gap-10 text-white relative z-10'>
        <h2 className='uppercase tracking-widest font-semibold text-5xl max-w-screen-md text-center'>
          Find your new home with Fire Homes
        </h2>

        <Button asChild className='mx-auto p-8 text-lg gap-5'>
          <Link href='/property-search'>
            <SearchIcon />
            <span>Search Properties</span>
          </Link>
        </Button>
      </div>
    </main>
  );
};

export default HomePage;