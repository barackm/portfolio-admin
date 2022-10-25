import type { NextPage } from 'next';
import SearchIcon from '@mui/icons-material/Search';

import styles from '../styles/Home.module.css';
import Page from '../components/common/Page';
import Table from '../components/Table/Table';
import { useState } from 'react';
import DefaultTableHeaderInfo from '../components/common/DefaultTableHeaderInfo';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';

const Home: NextPage = () => {
  const [sortColumn, setSortColumn] = useState({
    path: 'firstName',
    order: 'asc',
  });

  const [showModal, setShowModal] = useState(false);

  const handleSort = (sortColumn: any) => {
    setSortColumn(sortColumn);
  };

  return (
    <Page>
      <div className={``}>
        <Button onClick={() => setShowModal(true)}>Open Modal</Button>
        <Table
          topHeaderContent={<DefaultTableHeaderInfo />}
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
              path: 'age',
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
              firstName: 'John',
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
        <Modal
          title='Upload File'
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          There we go Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Omnis consectetur beatae cupiditate, facere cum saepe recusandae nobis
          aliquam officia, perspiciatis sed vitae id eum atque quo repudiandae
          nulla maiores reprehenderit tenetur officiis praesentium illum
          doloribus sequi! Quos molestias quibusdam obcaecati illo quam fugit
          minus quo tempore non culpa itaque praesentium, doloribus placeat
          ullam asperiores! Perferendis id nesciunt aut quas, vitae officiis,
          officia iusto ea obcaecati praesentium optio consectetur nam et. Error
          nihil quidem facere ducimus asperiores rem aut fugit totam sed
          repudiandae sint voluptatibus, dolorem placeat temporibus harum
          exercitationem fugiat architecto fuga dolores magnam, qui quaerat
          pariatur maiores. Atque alias eveniet a doloribus reiciendis
          reprehenderit expedita tempore aliquam libero praesentium magnam
          dignissimos, voluptatum soluta saepe eos distinctio sit laborum magni
          iure molestiae optio nostrum. Soluta quidem iste incidunt cumque
          quisquam vero sunt quia delectus facere? Veniam a unde quam, quaerat
          molestiae suscipit nisi tempora corrupti dicta aliquid maxime magni
          fugiat, ipsam mollitia, explicabo adipisci. Veritatis accusamus
          repellat omnis quae numquam quis enim natus consequuntur, maiores
          voluptatibus ad qui architecto. Maxime tenetur molestiae nam
          consectetur incidunt ab asperiores minima, consequatur amet modi
          sapiente reiciendis possimus eligendi fugit, nulla pariatur officiis
          consequuntur aperiam voluptate natus laudantium, sint omnis iste
          optio. Ducimus quibusdam laboriosam facere cumque voluptatum maxime
          minus? Quo, blanditiis amet veniam cupiditate alias ipsum nihil fugit
          similique velit, eos praesentium molestias sapiente eligendi
          necessitatibus placeat temporibus ducimus incidunt? Fugiat explicabo
          delectus facilis laudantium quaerat sequi laborum sunt aliquid
          sapiente nisi, rerum ipsam et? Ex veritatis at corrupti distinctio
          accusantium harum voluptatum, ipsam ratione, qui, nemo temporibus
          fugiat repudiandae aspernatur? At provident, sunt nulla dolore quia,
          voluptatibus atque cumque excepturi minus, vero aspernatur cupiditate
          consequuntur? Suscipit nihil praesentium dolor libero alias, hic nulla
          fugit atque. Quae deleniti deserunt tenetur voluptas corrupti!
          Deleniti vel non dolore exercitationem perspiciatis itaque id
          consequuntur ipsa possimus! sapiente reiciendis possimus eligendi
          fugit, nulla pariatur officiis consequuntur aperiam voluptate natus
          laudantium, sint omnis iste optio. Ducimus quibusdam laboriosam facere
          cumque voluptatum maxime minus? Quo, blanditiis amet veniam cupiditate
          alias ipsum nihil fugit similique velit, eos praesentium molestias
          sapiente eligendi necessitatibus placeat temporibus ducimus incidunt?
          Fugiat explicabo delectus facilis laudantium quaerat sequi laborum
          sunt aliquid sapiente nisi, rerum ipsam et? Ex veritatis at corrupti
          distinctio accusantium harum voluptatum, ipsam ratione, qui, nemo
          temporibus fugiat repudiandae aspernatur? At provident, sunt nulla
          dolore quia, voluptatibus atque cumque excepturi minus, vero
          aspernatur cupiditate consequuntur? Suscipit nihil praesentium dolor
          libero alias, hic nulla fugit atque. Quae deleniti deserunt tenetur
          voluptas corrupti! Deleniti vel non dolore exercitationem perspiciatis
          itaque id consequuntur ipsa possimus!
        </Modal>
      </div>
    </Page>
  );
};

export default Home;
