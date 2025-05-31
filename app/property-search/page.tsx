import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import FiltersForm from './filters-form';

const PropertySearchPage = () => {
  return (
    <div className='max-w-screen-lg mx-auto'>
      <h2 className='text-4xl font-bold p-5'>Property Search</h2>
      <Card>
        <CardHeader>
          <CardTitle>
            Filters
          </CardTitle>
        </CardHeader>

        <CardContent>
          <FiltersForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertySearchPage;