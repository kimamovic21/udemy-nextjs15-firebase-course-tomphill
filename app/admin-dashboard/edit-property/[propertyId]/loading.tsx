import { HomeIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <>
      <div className='max-w-screen-lg mx-auto'>
        <h2 className='text-4xl font-bold p-5'>
          Property Search
        </h2>
      </div>
      <Skeleton className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 rounded-full bg-sky-950 text-white flex justify-center items-center'>
        <HomeIcon />
      </Skeleton>
    </>
  );
};

export default Loading;