import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { type DecodedIdToken } from 'firebase-admin/auth';
import { auth } from '@/firebase/server';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import UpdatePasswordForm from './update-password-form';
import DeleteAccountButton from './delete-account-button';

const AccountPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('firebaseAuthToken')?.value;

  if (!token) redirect('/');

  let decodedToken: DecodedIdToken;

  try {
    decodedToken = await auth.verifyIdToken(token);
  } catch (e) {
    redirect('/');
  };

  const user = await auth.getUser(decodedToken.uid);
  const isPasswordProvider = !!user.providerData.find(
    (provider) => provider.providerId === 'password'
  );

  return (
    <div className='max-w-screen-sm mx-auto'>
      <Card className='mt-10'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold'>
            My Account
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Label>
            Email
          </Label>

          <div>
            {decodedToken.email}
          </div>

          {!!isPasswordProvider && (
            <UpdatePasswordForm />
          )}
        </CardContent>

        {!decodedToken.admin && (
          <CardFooter className='flex flex-col items-center'>
            <h3 className='text-red-500 text-xl font-bold mb-2'>
              Danger Zone
            </h3>

            <DeleteAccountButton />
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default AccountPage;