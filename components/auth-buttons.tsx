'use client';

import { useAuth } from '@/context/auth';
import Link from 'next/link';

const AuthButtons = () => {
  const auth = useAuth();

  return (
    <div>
      {!!auth?.currentUser && (
        <>
          <div>
            {auth.currentUser.email}
          </div>
          <div>
            Logout
          </div>
        </>
      )}
      {!auth?.currentUser && (
        <>
          <Link href='/login' className='mr-2'>
            Login
          </Link>
          <Link href='/register'>
            Sign up
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthButtons;