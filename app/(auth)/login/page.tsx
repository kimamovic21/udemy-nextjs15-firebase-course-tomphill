import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import Link from 'next/link';
import LoginForm from './login-form';

const LoginPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-3xl font-bold'>
          Login
        </CardTitle>
      </CardHeader>

      <CardContent>
        <LoginForm />
      </CardContent>

      <CardFooter>
        <span>Don&apos;t have an account ?</span>
        <Link
          href='/register'
          className='underline pl-2'
        >
          Register here
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LoginPage;