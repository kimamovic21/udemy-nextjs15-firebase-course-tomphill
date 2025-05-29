'use client';

import { useRef } from 'react';
import { type ImageUpload } from '@/types/imageUpload';
import { Button } from './ui/button';

type MultiImageUploaderProps = {
  images?: ImageUpload[],
  onImagesChange: (images: ImageUpload[]) => void;
};

const MultiImageUploader = ({
  images = [],
  onImagesChange
}: MultiImageUploaderProps) => {
  const uploadImageRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const newImages = files?.map((file, index) => {
      return {
        id: `${Date.now()}-${index}-${file.name}`,
        url: URL.createObjectURL(file),
        file: file,
      };
    });

    onImagesChange([...images, ...newImages]);
  };

  return (
    <div className='w-full max-w-3xl mx-auto p-4'>
      <input
        ref={uploadImageRef}
        type='file'
        multiple
        accept='image/*'
        className='hidden'
        onChange={handleInputChange}
      />
      <Button
        type='button'
        onClick={() => uploadImageRef?.current?.click()}
      >
        Upload images
      </Button>
    </div>
  );
};

export default MultiImageUploader;