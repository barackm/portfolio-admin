import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { EUserRole, EUserStatus } from '../types/common';
import routes from '../utlis/routes';

const useAuth = () => {
  const { currentUser } = useSelector((state: any) => state.auth);
  const [route, setRoute] = useState('');

  useEffect(() => {
    if (currentUser) {
      const isOnlyRegularUser =
        currentUser.roles.length === 1 &&
        currentUser.roleObjects[0].name === EUserRole.regular;
      if (isOnlyRegularUser && currentUser.status === EUserStatus.active) {
        toast.info('Your account is pending, waiting for admin approval');
        setRoute(routes.profile);
      }
      if (currentUser.status === EUserStatus.inactive) {
        toast.info('Your account is inactive');
        setRoute(routes.profile);
      }
      if (currentUser.status === EUserStatus.pending) {
        toast.info('Your account is pending');
        setRoute(routes.profile);
      }
    }
  }, [currentUser]);

  console.log('route', route);
  return route;
};

export default useAuth;
