import moment from 'moment';
import { GetServerSideProps } from 'next';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import React from 'react';
import DefaultTableHeaderInfo from '../../../components/common/DefaultTableHeaderInfo';
import Checkbox from '../../../components/common/Input/Checkbox';
import Page from '../../../components/common/Page';
import TableActionBtn from '../../../components/common/TableActionBtn';
import TableLink from '../../../components/common/TableLink';
import Tag from '../../../components/common/Tag';
import Table from '../../../components/Table/Table';
import { useAppSelector } from '../../../hooks/store';
import { getProjectCategories } from '../../../services/projectCategoriesService';
import { getProjects } from '../../../services/projectsService';
import store from '../../../store';

interface ProjectsProps {
  projects: any;
  categories: any;
}

const Projects = (props: ProjectsProps) => {
  const { projects, categories } = props;
  const { loading } = useAppSelector((state: any) => state.entities.projects);
  const [sortColumn, setSortColumn] = React.useState({
    path: 'name',
    order: 'asc',
  });

  const columns = [
    {
      id: 1,
      label: 'Project',
      path: 'name',
      colClasses: '',
      content: (project: any) => (
        <div className='flex items-center'>
          <div className='flex items-center'>
            <Checkbox onChange={() => {}} name='project' />
          </div>
          <div>
            <span>{project.title}</span>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      label: 'Description',
      path: 'description',
      colClasses: 'min-w-[200px] max-w-[200px] w-[200px]',
      content: (project: any) => (
        <span className='block w-[200px] whitespace-nowrap text-ellipsis overflow-hidden'>
          {project.description}
        </span>
      ),
    },

    {
      id: 2,
      label: 'Category',
      path: 'category',
      colClasses: '',
      content: (project: any) => (
        <div>
          <Tag>{project.category.name}</Tag>
        </div>
      ),
    },
    {
      id: 3,
      label: 'Created at',
      path: 'createdAt',
      colClasses: '',
      content: (project: any) => (
        <div>
          <span>{moment(project.createdAt).format('DD/MM/YYYY')}</span>
        </div>
      ),
    },
    {
      id: 3,
      label: 'Live Demo Url',
      path: 'liveDemoUrl',
      colClasses: '',
      ignoreSort: true,
      content: (project: any) => (
        <div>
          <TableLink url={project.liveDemoUrl} external>
            <span>Live Demo</span>
          </TableLink>
        </div>
      ),
    },
    {
      id: 3,
      label: 'Source Code Url',
      path: 'sourceCodeUrl',
      colClasses: '',
      ignoreSort: true,
      content: (project: any) => (
        <div>
          <TableLink url={project.sourceCodeUrl} external>
            <span>Source Code</span>
          </TableLink>
        </div>
      ),
    },
    {
      id: 3,
      label: 'Actions',
      path: '',
      colClasses: '',
      ignoreSort: true,
      content: (project: any) => (
        <div>
          <TableActionBtn>
            <VisibilityIcon className='text-inherit' />
          </TableActionBtn>
          <TableActionBtn>
            <EditIcon className='text-inherit' />
          </TableActionBtn>
          <TableActionBtn>
            <DeleteIcon className='text-inherit' />
          </TableActionBtn>
        </div>
      ),
    },
  ];

  console.log(projects);
  return (
    <Page>
      <div>
        <div>
          <Table
            data={projects}
            columns={columns}
            loading={loading}
            onSort={(sortColumn) => setSortColumn(sortColumn)}
            sortColumn={sortColumn}
            sortTable
            title='Projects'
            topHeaderContent={
              <DefaultTableHeaderInfo
                title='Projects'
                subTitle='Manage your projects here with easy.'
              />
            }
          />
        </div>
      </div>
    </Page>
  );
};

export const getServerSideProps = async (context: GetServerSideProps) => {
  store.dispatch(getProjects());
  store.dispatch(getProjectCategories());

  const { list: projects } = store.getState().entities.projects;
  const { list: categories } = store.getState().entities.projectCategories;

  return {
    props: {
      categories,
      projects,
    },
  };
};

export default Projects;
