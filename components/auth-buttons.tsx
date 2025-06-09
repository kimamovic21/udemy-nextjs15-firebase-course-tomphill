'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';
import Link from 'next/link';
import Image from 'next/image';

const AuthButtons = () => {
  const router = useRouter();

  const auth = useAuth();

  return (
    <div>
      {!!auth?.currentUser && (
        <DropdownMenu>
          <DropdownMenuTrigger className='cursor-pointer'>
            <Avatar>
              {!!auth?.currentUser.photoURL && (
                <Image
                  src={auth?.currentUser?.photoURL}
                  alt={`${auth?.currentUser?.displayName} avatar`}
                  width={70}
                  height={70}
                />
              )}
              <AvatarFallback className='text-sky-950'>
                {(auth?.currentUser?.displayName || auth?.currentUser?.email)?.[0]}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>
              <div>
                {auth?.currentUser?.displayName}
              </div>
              <div className='font-normal text-xs'>
                {auth?.currentUser?.email}
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild className='cursor-pointer'>
              <Link href='/account'>My account</Link>
            </DropdownMenuItem>

            {!!auth?.customClaims?.admin && (
              <DropdownMenuItem asChild className='cursor-pointer'>
                <Link href='/admin-dashboard'>
                  Admin Dashboard
                </Link>
              </DropdownMenuItem>
            )}

            {!auth?.customClaims?.admin && (
              <DropdownMenuItem asChild className='cursor-pointer'>
                <Link href='/account/my-favorites'>
                  My favorites
                </Link>
              </DropdownMenuItem>
            )}

            <DropdownMenuItem
              onClick={async () => {
                try {
                  await auth.logout();
                  router.refresh();
                  toast.success('Success', {
                    description: 'You have successfully logged out'
                  });
                } catch (e) {
                  console.error(e);
                  toast.error('Error', {
                    description: 'Something went wrong'
                  });
                };
              }}
              className='cursor-pointer'
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {!auth?.currentUser && (
        <div className='flex gap-2 items-center'>
          <Link
            href='/login'
            className='uppercase tracking-widest hover:underline'
          >
            Login
          </Link>

          <div className='h-8 w-[1px] bg-white/50' />

          <Link
            href='/register'
            className='uppercase tracking-widest hover:underline'
          >
            Sign up
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthButtons;