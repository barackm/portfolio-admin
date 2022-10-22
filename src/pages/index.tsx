import type { NextPage } from 'next';
import SearchIcon from '@mui/icons-material/Search';

import styles from '../styles/Home.module.css';
import Page from '../components/common/Page';

const Home: NextPage = () => {
  return (
    <Page>
      <div className={``}>This is the main dashboard welcome page</div>
    </Page>
  );
};

export default Home;
