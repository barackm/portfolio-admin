import React, { useEffect } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import * as Yup from 'yup';
import LockIcon from '@mui/icons-material/Lock';
import Button from '../../components/common/Button';
import TextInput from '../../components/common/Input/TextInput';
import Form from '../../components/form/Form';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import routes from '../../utlis/routes';
import { registerUser } from '../../services/authService';
import AuthStyleWrapper from '../../components/auth/AuthStyleWrapper';
import InputStylesWrapper from '../../components/auth/InputStylesWrapper';

const Register = () => {
  const { loading, currentUser } = useAppSelector((state: any) => state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentUser) {
      router.push(routes.home);
    }
  }, [currentUser, router]);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, 'Too short, at least 3 chars')
      .required('Required'),
    lastName: Yup.string()
      .min(3, 'Too short, at least 3 chars')
      .required('Required'),
    email: Yup.string().email('Invalid Email Address').required('Required'),
    password: Yup.string()
      .min(6, 'Too short, at least 6 chars')
      .required('Required'),
  });

  const handleSubmit = (values: any) => {
    dispatch(
      registerUser(
        {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        },
        router,
      ),
    );
  };

  return (
    <AuthStyleWrapper title='Login'>
      <Form
        onSubmit={handleSubmit}
        initialValues={{
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          rememberMe: false,
        }}
        validationSchema={validationSchema}
        enableReinitialize={false}
      >
        <div className='flex flex-col justify-center align-middle w-full'>
          <InputStylesWrapper>
            <TextInput
              placeholder='First Name'
              name='firstName'
              id='firstName'
              usesFormik
            />
          </InputStylesWrapper>
          <InputStylesWrapper>
            <TextInput
              placeholder='Last Name'
              name='lastName'
              id='lastName'
              usesFormik
            />
          </InputStylesWrapper>
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
            <Button
              className='bg-primaryColor'
              type='submit'
              usesFormik
              loading={loading}
            >
              Register
            </Button>
          </InputStylesWrapper>
          <InputStylesWrapper>
            <p className='text-center text-sm mb-0'>
              Already have an account?{' '}
            </p>
          </InputStylesWrapper>
          <InputStylesWrapper>
            <Button
              color='secondary'
              onClick={() => router.push('/auth/login')}
            >
              Login
            </Button>
          </InputStylesWrapper>
        </div>
      </Form>
    </AuthStyleWrapper>
  );
};

export default Register;
