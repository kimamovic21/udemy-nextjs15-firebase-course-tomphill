'use client';

import { useRouter } from 'next/navigation';
import CommonLoginForm from '@/components/common-login-form';

const LoginForm = () => {
  const router = useRouter();

  return (
    <CommonLoginForm onSuccess={() => {
      router.refresh();
    }} />
  );
};

export default LoginForm;