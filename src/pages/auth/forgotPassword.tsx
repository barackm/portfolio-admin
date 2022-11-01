import Image from 'next/image';
import { useRouter } from 'next/router';
import PersonIcon from '@mui/icons-material/Person';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import Button from '../../components/common/Button';
import TextInput from '../../components/common/Input/TextInput';
import Form from '../../components/form/Form';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import routes from '../../utlis/routes';
import AuthStyleWrapper from '../../components/auth/AuthStyleWrapper';
import InputStylesWrapper from '../../components/auth/InputStylesWrapper';
import { forgotPassword } from '../../services/authService';

const ForgotPassword = () => {
  const { loading, currentUser } = useAppSelector((state: any) => state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentUser) {
      router.push(routes.home);
    }
  }, [currentUser, router]);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email Address').required('Required'),
  });

  const handleSubmit = (values: any) => {
    dispatch(forgotPassword(values, router));
  };

  return (
    <AuthStyleWrapper title='Reset your password'>
      <Form
        onSubmit={handleSubmit}
        initialValues={{
          email: '',
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
            <Button
              className='bg-primaryColor'
              type='submit'
              usesFormik
              loading={loading}
            >
              Send Reset Link
            </Button>
          </InputStylesWrapper>
          <InputStylesWrapper>
            <p className='text-center text-sm mb-0'>
              <span>Remember your password?</span>
            </p>
          </InputStylesWrapper>
          <InputStylesWrapper>
            <Button color='secondary' onClick={() => router.push(routes.login)}>
              Login
            </Button>
          </InputStylesWrapper>
        </div>
      </Form>
    </AuthStyleWrapper>
  );
};

export default ForgotPassword;
