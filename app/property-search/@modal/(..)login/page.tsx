'use client';

import { useRouter } from 'next/navigation';
import { loginSuccess } from './actions';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import Link from 'next/link';
import CommonLoginForm from '@/components/common-login-form';

const LoginModal = () => {
  const router = useRouter();

  return (
    <Dialog
      open
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Login
          </DialogTitle>
          <DialogDescription>
            You must be logged in to favorite a property
          </DialogDescription>
        </DialogHeader>

        <div>
          <CommonLoginForm onSuccess={async () => {
            await loginSuccess();
            router.back();
          }} />
        </div>

        <DialogFooter className='block'>
          <span>Don&apos;t have an account?</span>
          <Link
            className='underline pl-2'
            href='/register'
          >
            Register here
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;