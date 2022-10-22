import type { NextPage } from 'next';
import SearchIcon from '@mui/icons-material/Search';

import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div
      className={`${styles.container} flex flex-col align-middle justify-center h-auto p-20`}
    >
      This is the main dashboard welcome page
    </div>
  );
};

export default Home;
