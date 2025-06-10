import { getUserFavorites } from '@/data/favorites';
import { getPropertiesById } from '@/data/properties';

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
  console.log({ paginatedFavorites, properties });

  return (
    <div>MyFavoritesPage</div>
  );
};

export default MyFavoritesPage;