import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import * as Yup from 'yup';
import LockIcon from '@mui/icons-material/Lock';
import Button from '../../components/common/Button';
import Switch from '../../components/common/Input/Switch';
import TextInput from '../../components/common/Input/TextInput';
import Form from '../../components/form/Form';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Register = () => {
  const router = useRouter();
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

  return (
    <div className='flex justify-center align-middle w-screen h-screen  '>
      <div className='flex justify-center align-middle w-[100%] sm:w-[90%] md:w-[60%] h-full lg:w-[500px] xl:w-w-[400px] 2xl:w-[500px] overflow-y-auto'>
        <div className='flex flex-col justify-center align-middle w-[90%] max-h-[90%] max-w-[90%] '>
          <div className='flex justify-center align-middle w-full bg-white rounded-xl shadow-soft-3xl flex-col  py-16 px-6'>
            <div className='flex justify-center align-middle w-full h-20 bg-primary rounded-t-xl mb-5'>
              <div className='flex justify-center flex-col align-middle w-full text-center'>
                <div className='flex justify-center align-middle w-full'>
                  <Image
                    src='/images/logo-dark.png'
                    alt='logo'
                    width={70}
                    height={70}
                  />
                </div>
                <p className='font-light text-xl'>Create an account</p>
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
                  firstName: '',
                  lastName: '',
                  rememberMe: false,
                }}
                validationSchema={validationSchema}
              >
                <div className='flex flex-col justify-center align-middle w-full'>
                  <div className='flex flex-col justify-center align-middle w-full mb-5'>
                    <TextInput
                      placeholder='First Name'
                      name='firstName'
                      id='firstName'
                      usesFormik
                    />
                  </div>
                  <div className='flex flex-col justify-center align-middle w-full mb-5'>
                    <TextInput
                      placeholder='Last Name'
                      name='lastName'
                      id='lastName'
                      usesFormik
                    />
                  </div>
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

                  <div className='flex flex-col justify-center align-middle w-full mb-2'>
                    <Button
                      className='bg-primaryColor'
                      type='submit'
                      usesFormik
                    >
                      Register
                    </Button>
                  </div>
                  <div className='flex flex-col justify-center align-middle w-full mb-2'>
                    <p className='text-center text-sm mb-0'>
                      Already have an account?{' '}
                    </p>
                  </div>
                  <div className='flex flex-col justify-center align-middle w-full mb-2'>
                    <Button
                      className='bg-secondaryColor'
                      onClick={() => router.push('/auth/login')}
                    >
                      Login
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

export default Register;