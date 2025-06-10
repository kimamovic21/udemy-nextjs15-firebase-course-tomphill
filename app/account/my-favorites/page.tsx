import { getUserFavorites } from '@/data/favorites';
import { getPropertiesById } from '@/data/properties';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import PropertyStatusBadge from '@/components/property-status-badge';
import { EyeIcon, Trash2Icon } from 'lucide-react';
import Link from 'next/link';

const MyFavoritesPage = async ({
  searchParams
}: {
  searchParams: Promise<any>
}) => {
  const searchParamsValues = await searchParams;
  const page = searchParamsValues?.page ? parseInt(searchParamsValues.page) : 1;
  const pageSize = 2;
  const favorites = await getUserFavorites() || {};
  const allFavorites = Object.keys(favorites);
  const totalPages = Math.ceil(allFavorites.length / pageSize);

  const paginatedFavorites = allFavorites.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const properties = await getPropertiesById(paginatedFavorites);

  return (
    <div className='max-w-screen-lg mx-auto'>
      <h2 className='text-4xl font-bold py-4 mt-5'>
        My favorites
      </h2>

      {!paginatedFavorites.length && (
        <h3 className='text-center text-zinc-400 text-3xl font-bold py-10'>
          You have no favorite properties
        </h3>
      )}

      {!!paginatedFavorites.length && (
        <Table className='mt-4'>
          <TableHeader>
            <TableRow>
              <TableHead>
                Property
              </TableHead>
              <TableHead>
                Status
              </TableHead>
              <TableHead className='text-right'>
                View/Delete
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedFavorites?.map((favorite) => {
              const property = properties?.find((property) => property.id === favorite);
              const address = [
                property?.address1,
                property?.address2,
                property?.city,
                property?.postcode,
              ].filter((addressLine) => !!addressLine).join(', ');

              return (
                <TableRow key={favorite}>
                  <TableCell>
                    {address}
                  </TableCell>

                  <TableCell>
                    {!!property && (
                      <PropertyStatusBadge status={property?.status} />
                    )}
                  </TableCell>

                  <TableCell className='flex justify-end gap-1'>
                    {!!property && (
                      <>
                        <Button asChild variant='outline'>
                          <Link href={`/property/${property?.id}`}>
                            <EyeIcon />
                          </Link>
                        </Button>

                        <Button variant='outline'>
                          <Trash2Icon />
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default MyFavoritesPage;