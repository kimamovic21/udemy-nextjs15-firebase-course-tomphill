import { Breadcrumbs } from '@/components/ui/breadcrumb';

const NewPropertyPage = () => {
  return (
    <div>
      <Breadcrumbs items={[{
        href: '/admin-dashboard',
        label: 'Dashboard',
      }, {
        label: 'New Property',
      }]} />
    </div>
  );
};

export default NewPropertyPage;