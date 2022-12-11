import React, { useEffect } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import * as Yup from 'yup';
import LockIcon from '@mui/icons-material/Lock';
import Button from '../../components/common/Button';
import Switch from '../../components/common/Input/Switch';
import TextInput from '../../components/common/Input/TextInput';
import Form from '../../components/form/Form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { loginUser } from '../../services/authService';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import routes from '../../utlis/routes';
import AuthStyleWrapper from '../../components/auth/AuthStyleWrapper';
import InputStylesWrapper from '../../components/auth/InputStylesWrapper';

const Login = () => {
  const { loading, currentUser } = useAppSelector((state: any) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push(routes.home);
    }
  }, [currentUser, router]);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email Address').required('Required'),
    password: Yup.string()
      .min(5, 'Too short, at least 5 chars')
      .required('Required'),
  });

  const dispatch = useAppDispatch();

  const handleSubmit = (values: any) => {
    dispatch(loginUser(values, router));
  };

  return (
    <AuthStyleWrapper title='Login'>
      <Form
        onSubmit={handleSubmit}
        initialValues={{
          email: '',
          password: '',
          rememberMe: false,
        }}
        validationSchema={validationSchema}
      >
        <div className='flex flex-col justify-center align-middle w-full'>
          <InputStylesWrapper>
            <TextInput
              placeholder='Email'
              type='email'
              name='email'
              id='email'
              usesFormik
              startIcon={<PersonIcon />}
            />
          </InputStylesWrapper>
          <InputStylesWrapper>
            <TextInput
              placeholder='Password'
              type='password'
              name='password'
              id='password'
              usesFormik
              startIcon={<LockIcon />}
            />
          </InputStylesWrapper>
          <InputStylesWrapper>
            <Switch usesFormik label='Remember me' name='rememberMe' />
          </InputStylesWrapper>
          <InputStylesWrapper>
            <Button className='bg-primaryColor' usesFormik loading={loading}>
              Login
            </Button>
          </InputStylesWrapper>
          <InputStylesWrapper>
            <p className='text-center text-sm mb-0'>
              Don&apos;t have an account?{' '}
            </p>
          </InputStylesWrapper>
          <InputStylesWrapper>
            <Button
              color='secondary'
              onClick={() => router.push('/auth/register')}
            >
              Register
            </Button>
          </InputStylesWrapper>
          <InputStylesWrapper>
            <p className='block text-center'>
              Password forgotten?{' '}
              <Link href={routes.forgotPassword}>
                <a
                  href='#'
                  className='font-medium text-secondaryColor hover:underline'
                >
                  Reset password
                </a>
              </Link>
            </p>
          </InputStylesWrapper>
        </div>
      </Form>
    </AuthStyleWrapper>
  );
};

export default Login;
