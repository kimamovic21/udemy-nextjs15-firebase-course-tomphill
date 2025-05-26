import { PlusCircleIcon } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PropertiesTable from './properties-table';

const AdminDashboardPage = async () => {
  return (
    <div>
      <Breadcrumbs items={[{ label: 'Dashboard' }]} />

      <h2 className='text-4xl font-bold mt-6'>
        Admin Dashboard
      </h2>

      <Button asChild className='inline-flex pl-2 gap-2 mt-4'>
        <Link
          href='/admin-dashboard/new-property'
          className='flex items-center'
        >
          <PlusCircleIcon />
          <span>New Property</span>
        </Link>
      </Button>

      <PropertiesTable />
    </div>
  );
};

export default AdminDashboardPage;