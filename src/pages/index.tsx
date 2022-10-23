import type { NextPage } from 'next';
import SearchIcon from '@mui/icons-material/Search';

import styles from '../styles/Home.module.css';
import Page from '../components/common/Page';
import Table from '../components/Table/Table';
import { useState } from 'react';

const Home: NextPage = () => {
  const [sortColumn, setSortColumn] = useState({
    path: 'firstName',
    order: 'asc',
  });

  const handleSort = (sortColumn: any) => {
    setSortColumn(sortColumn);
  };

  return (
    <Page>
      <div className={``}>
        <Table
          columns={[
            {
              _id: 1,
              path: 'firstName',
              label: 'First Name',
            },
            {
              _id: 2,
              path: 'lastName',
              label: 'Last Name',
            },
            {
              _id: 3,
              path: 'email',
              label: 'Email',
            },
            {
              _id: 4,
              path: 'role',
              label: 'Role',
            },
            {
              _id: 5,
              path: 'status',
              label: 'Status',
            },
            {
              _id: 6,
              path: 'status',
              label: 'Status',
            },
            {
              _id: 7,
              path: 'actions',
              label: 'Actions',
              content: (user: any) => (
                <div>
                  <button className='btn bg-secondaryColor'>Delete</button>
                </div>
              ),
            },
          ]}
          sortColumn={sortColumn}
          onSort={handleSort}
          data={[
            {
              _id: 1,
              firstName:
                'John Get 3% Daily Cash back with Apple Card. And pay for your new Mac over 12 months, interest‑free when you choose to check out with Apple Card Monthly Installments.',
              lastName: 'Doe',
              email: 'johndoe@gmail.com',
              role: 'Admin',
              status: 'Active',
            },
            {
              _id: 2,
              firstName: 'John',
              lastName: 'Doe',
              email: 'johndoe@gmail.com',
              role: 'Admin',
              status: 'Active',
            },
            {
              _id: 3,
              firstName: 'John',
              lastName: 'Doe',
              email: 'johndoe@gmail.com',
              role: 'Admin',
              status: 'Active',
            },
            {
              _id: 4,
              firstName: 'John',
              lastName: 'Doe',
              email: 'johndoe@gmail.com',
              role: 'Admin',
              status: 'Active',
            },
          ]}
          sortTable
        />
      </div>
    </Page>
  );
};

export default Home;
