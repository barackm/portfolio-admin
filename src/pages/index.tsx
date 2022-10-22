import type { NextPage } from 'next';
import SearchIcon from '@mui/icons-material/Search';

import Button from '../components/common/Button';
import TextInput from '../components/common/Input/TextInput';
import styles from '../styles/Home.module.css';
import Switch from '../components/common/Input/Switch';

const Home: NextPage = () => {
  return (
    <div
      className={`${styles.container} flex flex-col align-middle justify-center h-auto p-20`}
    >
      <div>
        <Button widthAuto variant='contained' onClick={() => {}}>
          Go To Products
        </Button>
      </div>
      <br />
      <div>
        <TextInput
          startIcon={<SearchIcon />}
          label='Email'
          placeholder='Enter emil address'
        />
      </div>
      <br />
      <div>
        <Switch />
      </div>
    </div>
  );
};

export default Home;
