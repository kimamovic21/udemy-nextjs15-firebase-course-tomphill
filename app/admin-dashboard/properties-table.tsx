import { getProperties } from '@/data/properties';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const PropertiesTable = async ({
  page = 1
}: {
  page?: number
}) => {
  const { data, totalPages } = await getProperties({
    pagination: {
      page,
      pageSize: 2,
    },
  });
  console.log({ data, totalPages });

  return (
    <>
      {!data && (
        <h2 className='text-center text-zinc-400 py-20 font-bold text-3xl'>
          You have no properties.
        </h2>
      )}

      {!!data && (
        <Table className='mt-5'>
          <TableHeader>
            <TableRow>
              <TableHead>Address </TableHead>
              <TableHead>Listing Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Update</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.map((property) => {
              const address = [
                property.address1,
                property.address2,
                property.city,
                property.postcode,
              ]
                .filter((addressLine) => !!addressLine)
                .join(', ');

              return (
                <TableRow key={property.id}>
                  <TableCell>{address}</TableCell>
                  <TableCell>{property.price}</TableCell>
                  <TableCell>{property.status}</TableCell>
                  <TableCell>view / edit</TableCell>
                </TableRow>
              );
            })}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={4} className='text-center'>
                {Array.from({ length: totalPages })?.map((_, i) => (
                  <Button
                    key={i}
                    asChild
                    variant='outline'
                    className='mx-1'
                  >
                    <Link href={`/admin-dashboard?page=${i + 1}`}>
                      {i + 1}
                    </Link>
                  </Button>
                ))}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </>
  );
};

export default PropertiesTable;