import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
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
        name: 'Articles',
        link: routes.blog,
        icon: <BookOutlinedIcon />,
        description: 'Articles List',
      },
      {
        id: 2,
        name: 'New',
        link: `${routes.blog}/new`,
        icon: <AddBoxOutlinedIcon />,
        description: 'New Article',
        canBeDynamic: true,
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
        name: 'My Profile',
        link: routes.profile,
        icon: <PersonOutlineOutlinedIcon />,
        description: 'My Profile',
      },
    ],
  },
];

export const secondaryLinks = [];
