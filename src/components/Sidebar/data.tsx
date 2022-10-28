import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SeparatorLine from '../common/SeparatorLine';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import routes from '../../utlis/routes';

export const links = [
  {
    id: 1,
    name: 'Dashboard',
    link: '/',
    icon: <HomeOutlinedIcon />,
    children: [
      {
        id: 1,
        name: 'Dashboard',
        link: '/',
        icon: <HomeOutlinedIcon />,
      },
    ],
  },
  {
    id: 2,
    name: 'Admin',
    link: '/admin',
    children: [
      {
        id: 1,
        name: 'Dashboard',
        link: '/admin',
        icon: <AdminPanelSettingsOutlinedIcon />,
      },
    ],
    icon: <AdminPanelSettingsOutlinedIcon />,
  },
  {
    id: 3,
    name: 'Projects',
    link: routes.projects,
    children: [
      {
        id: 1,
        name: 'Projects',
        link: routes.projects,

        icon: <ListAltOutlinedIcon />,
      },
      {
        id: 2,
        name: 'New',
        link: `${routes.projects}/new`,
        paramName: 'id',
        icon: <AddBoxOutlinedIcon />,
      },
    ],
    icon: <ListAltOutlinedIcon />,
  },
  {
    id: 4,
    name: 'Blog',
    link: '/blog',
    children: [
      {
        id: 1,
        name: 'Blog',
        link: '/blog',
        icon: <BookOutlinedIcon />,
      },
      {
        id: 2,
        name: 'New',
        link: '/blog/new',
        icon: <AddBoxOutlinedIcon />,
      },
      {
        id: 3,
        name: 'Drafts',
        link: '/blog/drafts',
        icon: <SaveAsOutlinedIcon />,
      },
      {
        id: 4,
        name: 'Scheduled',
        link: '/blog/scheduled',
        icon: <PendingActionsOutlinedIcon />,
      },
    ],
    icon: <BookOutlinedIcon />,
  },
  {
    id: 5,
    name: 'Users',
    link: '/users',
    children: [
      {
        id: 1,
        name: 'Users',
        link: '/users',
        icon: <PeopleAltOutlinedIcon />,
      },
      {
        id: 2,
        name: 'New',
        link: '/users/new',
        icon: <PersonAddAltOutlinedIcon />,
      },
    ],
    icon: <PeopleAltOutlinedIcon />,
  },
];

export const secondaryLinks = [
  {
    id: 1,
    name: 'Settings',
    link: '/settings',
    icon: <SettingsOutlinedIcon />,
    children: [
      {
        id: 1,
        name: 'Settings',
        link: '/settings',
        icon: <SettingsOutlinedIcon />,
      },
    ],
  },
];
