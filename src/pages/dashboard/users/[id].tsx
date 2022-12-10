import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import * as Yup from 'yup';
import { updateUserAsync, updateUserBulkInfoAsync } from '../../../api/users';
import Button from '../../../components/common/Button';
import Select from '../../../components/common/Input/Select';
import TextInput from '../../../components/common/Input/TextInput';
import Page from '../../../components/common/Page';
import Form from '../../../components/form/Form';
import { useAppSelector } from '../../../hooks/store';
import { EUserRole, EUserStatus } from '../../../types/common';
import { IRole } from '../../../types/role';
import { displayError } from '../../../utlis/errorHandler';
import routes from '../../../utlis/routes';

const User = () => {
  const router = useRouter();
  const { id }: any = router.query;
  const { data: userData, error } = useSWR(`/users/${id}`);
  const { data: roles, error: rolesError } = useSWR(`/roles`);
  const { currentUser } = useAppSelector<any>((state) => state.auth);
  const [user, setUser] = React.useState<any>({});
  const [fetching, setFetching] = React.useState(false);

  const isCurrentUserAdmin =
    currentUser &&
    currentUser.roleObjects.find(
      (role: IRole) => role.name === EUserRole.admin,
    );
  const isAdminUpdatingUser =
    isCurrentUserAdmin && userData?._id !== currentUser._id;

  useEffect(() => {
    if (userData) {
      const { firstName, lastName, email, roleObjects, status } = userData;
      setUser({
        firstName,
        lastName,
        email,
        roleObjects: roleObjects.map((role: IRole) => ({
          ...role,
          label: role.label,
          value: role._id,
        })),
        status: {
          label: status,
          value: status,
        },
      });
    }
  }, [userData]);

  type TUser = {
    firstName: string;
    lastName: string;
    email: string;
    roleObjects: IRole[];
    status: { label: string; value: string };
  };

  const handleSubmit = async (values: TUser) => {
    setFetching(true);
    try {
      const { firstName, lastName, email, roleObjects, status } = values;
      const body = isAdminUpdatingUser
        ? {
            firstName,
            lastName,
            email,
            roles: roleObjects,
            status: status.value,
          }
        : {
            firstName,
            lastName,
          };
      isAdminUpdatingUser
        ? await updateUserBulkInfoAsync(id, body)
        : await updateUserAsync(id, body);
      toast.success('User updated successfully');
      isAdminUpdatingUser
        ? router.push(routes.users)
        : router.push(routes.profile);
    } catch (error) {
      displayError(error);
    } finally {
      setFetching(false);
    }
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().min(3).max(50).required('First name is required'),
    lastName: Yup.string().min(3).max(50).required('Last name is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    roleObjects: Yup.array().required('Role is required'),
    status: Yup.object().required('Status is required'),
  });
  const statusOptions = [
    {
      label: 'Active',
      value: EUserStatus.active,
    },
    {
      label: 'Inactive',
      value: EUserStatus.inactive,
    },
    {
      label: 'Pending',
      value: EUserStatus.pending,
    },
  ];

  return (
    <Page>
      <div>
        <div className='mt-10 py-10 px-4 pt-6 bg-white rounded-xl shadow-soft-3xl'>
          <div className='mb-6'>
            <h1 className='text-3xl font-normal text-gray-800'>
              {isAdminUpdatingUser
                ? 'Edit User Details'
                : 'Update Your Details'}
            </h1>
          </div>
          <Form
            initialValues={user}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            enableReinitialize={true}
          >
            <TextInput name='firstName' label='First Name' />
            <div className='my-4' />
            <TextInput name='lastName' label='Last Name' />
            <div className='my-4' />
            <TextInput name='email' disabled label='Email' />
            <div className='my-4' />
            {isAdminUpdatingUser && (
              <Select
                name='roleObjects'
                label='Roles'
                options={
                  roles
                    ? roles.map((role: IRole) => ({
                        ...role,
                        label: role.label,
                        value: role._id,
                      }))
                    : []
                }
                isMulti
              />
            )}
            <div className='my-4' />
            {isAdminUpdatingUser && (
              <Select name='status' label='Status' options={statusOptions} />
            )}
            <div className='my-4' />

            <Button usesFormik loading={fetching} type='submit'>
              Update
            </Button>
            <Button
              color='secondary'
              className='ml-2'
              onClick={() =>
                isAdminUpdatingUser
                  ? router.push(routes.users)
                  : router.push(routes.profile)
              }
            >
              Cancel
            </Button>
          </Form>
        </div>
      </div>
    </Page>
  );
};

export default User;
