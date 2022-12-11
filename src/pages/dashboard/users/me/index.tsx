import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import Page from '../../../../components/common/Page';
import { useAppDispatch, useAppSelector } from '../../../../hooks/store';
import styles from '../../../../styles/Profile.module.scss';
import Link from 'next/link';
import Button from '../../../../components/common/Button';
import routes from '../../../../utlis/routes';
import { updateUserAvatarAsync } from '../../../../api/users';
import { authRequestSuccess } from '../../../../store/slices/auth';
import storage from '../../../../services/storageService';
import { toast } from 'react-toastify';
import { displayError } from '../../../../utlis/errorHandler';

const Profile: React.FC = () => {
  const { currentUser }: any = useAppSelector((state) => state.auth);
  const { avatarUrl, firstName, lastName, email } = currentUser || {};
  const [avatarImage, setAvatarImage] = React.useState<any>(null);
  const [fetching, setFetching] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleUpdateAvatar = async () => {
    setFetching(true);
    try {
      const formData = new FormData();
      formData.append('avatarUrl', avatarImage);
      const { data } = await updateUserAvatarAsync(currentUser._id, formData);
      const { token } = data;
      dispatch(authRequestSuccess(data));
      storage.setAuthToken(token);
      toast.success('Avatar updated successfully');
      setAvatarImage(null);
    } catch (error) {
      displayError(error);
    } finally {
      setFetching(false);
    }
  };

  return (
    <Page>
      <div className='w-full g-white border-0 shadow-soft-xl rounded-2xl bg-clip-border  overflow-hidden'>
        <div
          className={`w-full bg-slate-800 h-40 px-4 text-slate-100 ${styles.bannerImageWrapper} flex items-end relative bg-white`}
        >
          <div className='absolute top-3 right-3 '>
            <Link href={`${routes.users}/${currentUser?._id}`}>
              <button
                title='Edit Profile'
                type='button'
                className='border-2 border-slate-50 bg-[rgba(0,0,0,0.2)] text-slate-50 rounded-2xl px-2 py-1 flex items-center justify-center hover:bg-slate-50 hover:text-slate-800'
              >
                <ModeEditOutlineOutlinedIcon
                  className='mr-2'
                  fontSize='inherit'
                />
                <span className='text-xs'>Edit Profile</span>
              </button>
            </Link>
          </div>
          <div className='transform translate-y-12 flex'>
            <div className='w-24 h-24 bg-black rounded-[50%] border-4 border-white  relative'>
              <Image
                src={avatarImage ? URL.createObjectURL(avatarImage) : avatarUrl}
                alt='avatar'
                width={100}
                height={100}
                className='object-cover rounded-[50%] '
              />
              <div className='absolute w-8 h-8 bottom-0 transform translate-x-16 bg-slate-200 text-slate-800 text-lg z-10 rounded-[50%] border-2 border-white flex items-center justify-center cursor-pointer'>
                <input
                  type='file'
                  className='absolute opacity-0 w-full h-full cursor-pointer'
                  name='avatarUrl'
                  title='avatar'
                  onChange={(e: any) => {
                    setAvatarImage(e.target.files[0]);
                  }}
                />
                <button
                  className='bg-none border-none w-full h-full outline-none flex justify-center items-center'
                  onClick={() => {
                    if (avatarImage) {
                      setAvatarImage(null);
                    }
                  }}
                  title='Upload new avatar'
                  type='button'
                >
                  {avatarImage ? (
                    <CloseIcon fontSize='inherit' />
                  ) : (
                    <CameraAltOutlinedIcon fontSize='inherit' />
                  )}
                </button>
              </div>
            </div>
            <div className='text-slate-700 pt-4 ml-3'>
              <h4 className='leading-0 text-lg'>
                {firstName} {lastName}
              </h4>
              <p className='leading-6 text-sm'>{email}</p>
            </div>
          </div>
        </div>
        <div className='h-20 flex items-center bg-white'>
          <div className='flex items-center justify-between px-4 pl-40'>
            <ul className='flex gap-2'>
              <li>
                <Link href='' className='cursor-pointer'>
                  <a className='flex flex-col font-bold cursor-pointer justify-center items-center bg-primaryColor-300 text-slate-100 p-3 py-4 rounded-1'>
                    <p className='leading-0 font-bold text-lg'>20</p>
                    <span className='leading-0 text-xs font-medium'>POSTS</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href='' className='cursor-pointer'>
                  <a className='flex flex-col font-bold cursor-pointer justify-center items-center bg-primaryColor-300 text-slate-100 p-3 py-4 rounded-1'>
                    <p className='leading-0 font-bold text-lg'>20</p>
                    <span className='leading-0 text-xs font-medium'>
                      PROJECTS
                    </span>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          {avatarImage && (
            <Button onClick={handleUpdateAvatar} loading={fetching}>
              Upload new avatar
            </Button>
          )}
        </div>
      </div>
    </Page>
  );
};

export default Profile;
