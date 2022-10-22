import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import * as Yup from 'yup';
import LockIcon from '@mui/icons-material/Lock';
import Button from '../../components/common/Button';
import Switch from '../../components/common/Input/Switch';
import TextInput from '../../components/common/Input/TextInput';
import Form from '../../components/form/Form';

const Login = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  return (
    <div className='flex justify-center align-middle w-screen h-screen  '>
      <div className='flex justify-center align-middle w-[100%] sm:w-[90%] md:w-[60%] h-full lg:w-[500px] xl:w-w-[400px] 2xl:w-[500px] overflow-y-auto'>
        <div className='flex flex-col justify-center align-middle w-[90%] max-h-[90%] max-w-[90%] '>
          <div className='flex justify-center align-middle w-full bg-white rounded-xl shadow-soft-3xl flex-col  py-16 px-6'>
            <div className='flex justify-center align-middle w-full h-20 bg-primary rounded-t-xl mb-5'>
              <div className='flex justify-center flex-col align-middle w-full text-center'>
                <h1 className='text-3xl font-light'>Login</h1>
                <p className='font-light text-xl'>Sign in to your account</p>
              </div>
            </div>
            <div className='flex flex-col justify-center align-middle w-full'>
              <Form
                onSubmit={(values) => {
                  console.log(values);
                }}
                initialValues={{
                  email: '',
                  password: '',
                  rememberMe: false,
                }}
                validationSchema={validationSchema}
              >
                <div className='flex flex-col justify-center align-middle w-full'>
                  <div className='flex flex-col justify-center align-middle w-full mb-5'>
                    <TextInput
                      placeholder='Email'
                      type='email'
                      name='email'
                      id='email'
                      usesFormik
                      startIcon={<PersonIcon />}
                    />
                  </div>
                  <div className='flex flex-col justify-center align-middle w-full mb-5'>
                    <TextInput
                      placeholder='Password'
                      type='password'
                      name='password'
                      id='password'
                      usesFormik
                      startIcon={<LockIcon />}
                    />
                  </div>
                  <div className='flex flex-col justify-center align-middle w-full mb-5'>
                    <Switch usesFormik label='Remember me' name='rememberMe' />
                  </div>
                  <div className='flex flex-col justify-center align-middle w-full mb-2'>
                    <Button
                      className='bg-primaryColor'
                      type='submit'
                      usesFormik
                    >
                      Login
                    </Button>
                  </div>
                  <div className='flex flex-col justify-center align-middle w-full mb-2'>
                    <p className='text-center text-sm mb-0'>
                      Don&apos;t have an account?{' '}
                    </p>
                  </div>
                  <div className='flex flex-col justify-center align-middle w-full mb-2'>
                    <Button className='bg-secondaryColor' onClick={() => {}}>
                      Register
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
