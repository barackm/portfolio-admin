import LockIcon from '@mui/icons-material/Lock';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import Button from '../../components/common/Button';
import TextInput from '../../components/common/Input/TextInput';
import Form from '../../components/form/Form';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import routes from '../../utlis/routes';
import AuthStyleWrapper from '../../components/auth/AuthStyleWrapper';
import InputStylesWrapper from '../../components/auth/InputStylesWrapper';
import Link from 'next/link';
import { resetPassword } from '../../services/authService';

const ResetPassword = () => {
  const { loading, currentUser } = useAppSelector((state: any) => state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { token } = router.query;

  useEffect(() => {
    if (currentUser || !token) {
      router.push(routes.home);
      return;
    }
  }, [currentUser, router, token]);

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(5, 'Too short, at least 5 chars')
      .required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
  });

  const handleSubmit = (values: any) => {
    dispatch(
      resetPassword(
        {
          password: values.password,
          resetPasswordToken: token,
        },
        router,
      ),
    );
  };

  return (
    <AuthStyleWrapper title='Create new password'>
      <Form
        onSubmit={handleSubmit}
        initialValues={{
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
      >
        <InputStylesWrapper>
          <TextInput
            placeholder='New Password'
            type='password'
            name='password'
            id='password'
            usesFormik
            startIcon={<LockIcon />}
          />
        </InputStylesWrapper>

        <InputStylesWrapper>
          <TextInput
            placeholder='Confirm Password'
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            usesFormik
            startIcon={<LockIcon />}
          />
        </InputStylesWrapper>

        <InputStylesWrapper className='mt-5'>
          <Button className='bg-primaryColor' usesFormik loading={loading}>
            Reset Password
          </Button>
        </InputStylesWrapper>
        <InputStylesWrapper>
          <p className='block text-center'>
            Or{' '}
            <Link href={routes.login}>
              <a
                href='#'
                className='font-medium text-slate-900 hover:underline'
              >
                Login
              </a>
            </Link>
          </p>
        </InputStylesWrapper>
      </Form>
    </AuthStyleWrapper>
  );
};

export default ResetPassword;
