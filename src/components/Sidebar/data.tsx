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
    link: routes.dashboard,
    icon: <HomeOutlinedIcon />,
    description: 'Dashboard',
    children: [
      {
        id: 1,
        name: 'Dashboard',
        link: routes.dashboard,
        icon: <HomeOutlinedIcon />,
        description: 'Dashboard',
      },
    ],
  },
  {
    id: 3,
    name: 'Projects',
    link: routes.projects,
    icon: <ListAltOutlinedIcon />,
    description: 'Projects List',
    children: [
      {
        id: 1,
        name: 'Projects',
        link: routes.projects,
        icon: <ListAltOutlinedIcon />,
        description: 'Projects List',
      },
      {
        id: 2,
        name: 'New',
        link: `${routes.projects}/new`,
        paramName: 'id',
        icon: <AddBoxOutlinedIcon />,
        description: 'Edit Project',
        canBeDynamic: true,
      },
    ],
  },
  {
    id: 4,
    name: 'Blog',
    link: routes.blog,
    icon: <BookOutlinedIcon />,
    description: 'Blog',
    children: [
      {
        id: 1,
        name: 'Blog',
        link: routes.blog,
        icon: <BookOutlinedIcon />,
        description: 'Blog',
      },
      {
        id: 2,
        name: 'New',
        link: `${routes.blog}/new`,
        icon: <AddBoxOutlinedIcon />,
        description: 'New Blog',
        canBeDynamic: true,
      },
      {
        id: 3,
        name: 'Drafts',
        link: routes.blogDrafts,
        icon: <SaveAsOutlinedIcon />,
        description: 'Blog Drafts',
      },
      {
        id: 4,
        name: 'Scheduled',
        link: routes.scheduledBlog,
        icon: <PendingActionsOutlinedIcon />,
        description: 'Scheduled Blog',
      },
    ],
  },
  {
    id: 5,
    name: 'Users',
    link: routes.users,
    icon: <PeopleAltOutlinedIcon />,
    description: 'Users',
    children: [
      {
        id: 1,
        name: 'Users',
        link: routes.users,
        icon: <PeopleAltOutlinedIcon />,
        description: 'Users List',
      },
      {
        id: 2,
        name: 'New',
        link: `${routes.users}/new`,
        icon: <PersonAddAltOutlinedIcon />,
        description: 'New User',
        canBeDynamic: true,
      },
    ],
  },
];

export const secondaryLinks = [
  {
    id: 1,
    name: 'Settings',
    link: routes.settings,
    icon: <SettingsOutlinedIcon />,
    description: 'Settings',
    children: [
      {
        id: 1,
        name: 'Settings',
        link: routes.settings,
        icon: <SettingsOutlinedIcon />,
        description: 'Settings',
      },
    ],
  },
];
