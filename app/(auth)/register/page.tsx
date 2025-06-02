import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
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
    </Card>
  );
};

export default RegisterPage;