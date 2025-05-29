'use client';

import { useRef } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable
} from '@hello-pangea/dnd';
import { MoveIcon, XIcon } from 'lucide-react';
import { type ImageUpload } from '@/types/imageUpload';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import Image from 'next/image';

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
        className='w-full'
        variant='outline'
      >
        Upload images
      </Button>

      <DragDropContext onDragEnd={() => { }}>
        <Droppable
          droppableId='property-images'
          direction='vertical'
        >
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {images?.map((image, index) => (
                <Draggable
                  key={image.id}
                  draggableId={image.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className='relative p-2'
                    >
                      <div className='bg-gray-100 rounded-lg flex items-center gap-2 overflow-hidden'>
                        <div className='size-16 relative'>
                          <Image
                            src={image.url}
                            alt='Rental Image'
                            fill
                            className='object-cover'
                          />
                        </div>

                        <div className='flex-grow'>
                          <p className='text-sm font-medium'>
                            Image {index + 1}
                          </p>
                          {index === 0 && (
                            <Badge variant='success'>
                              Featured Image
                            </Badge>
                          )}
                        </div>

                        <div className='flex items-center'>
                          <button className='text-red-500 p-2'>
                            <XIcon />
                          </button>
                          <div className='text-gray-500'>
                            <MoveIcon />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default MultiImageUploader;