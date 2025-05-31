'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      variant='link'
      className='cursor-pointer'
      onClick={() => router.back()}
    >
      <ArrowLeftIcon />
      <span>Back</span>
    </Button>
  );
};

export default BackButton;