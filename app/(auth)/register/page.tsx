import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import Link from 'next/link';
import RegisterForm from './register-form';

const RegisterPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-3xl font-bold'>
          Register
        </CardTitle>
      </CardHeader>

      <CardContent>
        <RegisterForm />
      </CardContent>

      <CardFooter>
        <span>Already have an account ?</span>
        <Link
          href='/login'
          className='pl-2 underline'
        >
          Log in here
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RegisterPage;