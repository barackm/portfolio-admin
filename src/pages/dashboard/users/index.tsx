import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DefaultTableHeaderInfo from '../../../components/common/DefaultTableHeaderInfo';
import Page from '../../../components/common/Page';
import TableActionBtn from '../../../components/common/TableActionBtn';
import Tag from '../../../components/common/Tag';
import Tooltip from '../../../components/common/Tooltip';
import Table from '../../../components/Table/Table';
import { IRole } from '../../../types/role';
import { IUser } from '../../../types/user';
import routes from '../../../utlis/routes';
import Modal from '../../../components/common/Modal';
import { EUserRole, EUserStatus } from '../../../types/common';

const Users = () => {
  const { data: users, error } = useSWR('/users');
  const fetching = !users && !error;
  const [activeUserIdToDelete, setActiveUserIdToDelete] = React.useState<
    string | null
  >(null);
  const [sortColumn, setSortColumn] = React.useState({
    path: 'firstName',
    order: 'asc',
  });

  const router = useRouter();

  const columns = [
    {
      id: 1,
      label: 'First Name',
      path: 'firstName',
      colClasses: '',
      content: (user: IUser) => (
        <div className='flex items-center'>
          <span className='block  whitespace-nowrap text-ellipsis overflow-hidden capitalize'>
            {user.firstName}
          </span>
        </div>
      ),
    },
    {
      id: 2,
      label: 'Last Name',
      path: 'lastName',
      colClasses: '',
      content: (user: IUser) => (
        <span className='block whitespace-nowrap text-ellipsis overflow-hidden capitalize'>
          {user.lastName}
        </span>
      ),
    },
    {
      id: 3,
      label: 'Email',
      path: 'email',
      colClasses: '',
      content: (user: IUser) => (
        <span className='block whitespace-nowrap text-ellipsis overflow-hidden'>
          {user.email}
        </span>
      ),
    },
    {
      id: 4,
      label: 'Email Verified',
      path: 'isVerified',
      colClasses: '',
      content: (user: IUser) => (
        <div className='block whitespace-nowrap text-ellipsis overflow-hidden'>
          {user.isVerified ? (
            <Tag className='bg-green-600 text-slate-50'>Yes</Tag>
          ) : (
            <Tag className='bg-red-DEFAULT-600 text-slate-50'>No</Tag>
          )}
        </div>
      ),
    },
    {
      id: 5,
      label: 'Status',
      path: 'status',
      colClasses: '',
      content: (user: IUser) => (
        <div className='block whitespace-nowrap text-ellipsis overflow-hidden'>
          {user.status === EUserStatus.active ? (
            <Tag className='bg-green-600 text-slate-50'>{user.status}</Tag>
          ) : (
            <Tag className='bg-red-DEFAULT-600 text-slate-50'>
              {user.status}
            </Tag>
          )}
        </div>
      ),
    },
    {
      id: 6,
      label: 'Roles',
      path: 'roleObjects',
      colClasses: '',
      content: (user: IUser) => (
        <div className='whitespace-nowrap text-ellipsis overflow-hidden flex flex-col'>
          {user.roleObjects.map((role: IRole) => (
            <span key={role._id} className='font-bold'>
              - {role.label}
            </span>
          ))}
        </div>
      ),
    },
    {
      id: 6,
      label: 'Actions',
      path: '',
      colClasses: 'min-w-[170px]',
      ignoreSort: true,
      content: (user: IUser) => {
        const isAdmin = user.roleObjects.find(
          (role: IRole) => role.name === EUserRole.admin,
        );
        return (
          <div>
            <Tooltip title='Edit user'>
              <TableActionBtn
                onClick={() => router.push(`${routes.users}/${user._id}`)}
              >
                <EditIcon className='text-inherit' />
              </TableActionBtn>
            </Tooltip>
            {!isAdmin && (
              <Tooltip title='Delete user'>
                <TableActionBtn
                  onClick={() => setActiveUserIdToDelete(user._id)}
                >
                  <DeleteIcon className='text-inherit text-red-400 hover:text-red-500' />
                </TableActionBtn>
              </Tooltip>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <Page>
      <Modal
        open={!!activeUserIdToDelete}
        onClose={() => setActiveUserIdToDelete(null)}
        title='Delete User'
      >
        <div className='flex flex-col items-center justify-center'>
          <p className='text-center'>
            Are you sure you want to delete this user?
          </p>
        </div>
      </Modal>
      <Table
        data={users || []}
        columns={columns}
        onSort={(sortColumn) => setSortColumn(sortColumn)}
        sortColumn={sortColumn}
        sortTable
        loading={fetching}
        total={users?.length}
        title='Users'
        pageNumberQueryField='page'
        pageSizeQueryField='limit'
        topHeaderContent={
          <DefaultTableHeaderInfo
            title='Users'
            pageSizeQueryField='limit'
            subTitle='Manage your users here with easy.'
          />
        }
      />
    </Page>
  );
};

export default Users;
