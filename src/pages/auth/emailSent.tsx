import Image from 'next/image';
import React, { useEffect } from 'react';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import storage from '../../services/storageService';
import { USER_EMAIL } from '../../utlis/constants/constants';
import { useRouter } from 'next/router';
import routes from '../../utlis/routes';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { resendVerificationEmail } from '../../services/authService';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import Button from '../../components/common/Button';
import Link from 'next/link';

const EmailSent = () => {
  const userEmail = storage.get(USER_EMAIL);
  const token = storage.getAuthToken();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token || !userEmail) {
      router.push(routes.home);
      return;
    }
  }, [router, userEmail, token]);

  const handleResend = () => {
    dispatch(resendVerificationEmail({ email: userEmail }, router));
  };

  return (
    <div className='flex justify-center items-center'>
      <div className='bg-white mt-30 w-[90%] sm:w-[400px] md:w-[600px] p-4 pt-10 rounded-xl shadow-soft-3xl  flex justify-center items-center flex-col'>
        <div className='mb-5'>
          <Image
            src='/images/logo-dark.png'
            alt='logo'
            width={70}
            height={70}
          />
          <span className='translate-x-5 inline-block'>
            <MarkEmailReadIcon
              className='text-inherit text-green-600'
              fontSize='large'
            />
          </span>
        </div>
        <div className=''>
          <div className='flex flex-col items-center'>
            <p className='font-medim text-[1rem]  text-slate-700'>
              Thank your for signing up. Please check your email to verify your
              account.
            </p>
          </div>
          <p className='w-full flex justify-center'>
            Email:
            <a className='text-center ml-2 text-green-600 font-bold'>
              {userEmail}
            </a>
          </p>
        </div>
        <div className='mt-5'>
          <span className=' text-slate-700'>
            Didn&apos;t receive the email?{' '}
          </span>
          {loading ? (
            <LoadingIndicator />
          ) : (
            <button
              type='button'
              className='p-1 text-secondaryColor font-bold'
              onClick={handleResend}
            >
              Resend
            </button>
          )}
        </div>
        <Link href={routes.login}>
          <a className='text-slate-700 font-bold mt-5 p-2 px-3 hover:bg-primaryColor rounded-2 hover:text-slate-200 hover:font-medium'>
            Back to login
          </a>
        </Link>
      </div>
    </div>
  );
};

export default EmailSent;
