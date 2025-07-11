import { getPropertyById } from '@/data/properties';
import { Breadcrumbs } from '@/components/ui/breadcrumb';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import EditPropertyForm from './edit-property-form';
import DeletePropertyButton from './delete-property-button';

const EditPropertyPage = async ({
  params
}: {
  params: Promise<any>
}) => {
  const paramsValue = await params;

  const property = await getPropertyById(paramsValue.propertyId);

  return (
    <div>
      <Breadcrumbs items={[{
        href: '/admin-dashboard',
        label: 'Dashboard'
      }, {
        label: 'Edit Property'
      }]} />

      <Card className='mt-5'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold flex justify-between'>
            <span>Edit Property</span>
            <DeletePropertyButton
              propertyId={property.id}
              images={property.images || []}
            />
          </CardTitle>
        </CardHeader>

        <CardContent>
          <EditPropertyForm
            id={property.id}
            address1={property.address1}
            address2={property.address2}
            city={property.city}
            postcode={property.postcode}
            bathrooms={property.bathrooms}
            bedrooms={property.bedrooms}
            price={property.price}
            description={property.description}
            status={property.status}
            images={property.images || []}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default EditPropertyPage;