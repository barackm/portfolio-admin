import moment from 'moment';
import { GetStaticProps } from 'next';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import React, { useEffect } from 'react';
import DefaultTableHeaderInfo from '../../../components/common/DefaultTableHeaderInfo';
import Checkbox from '../../../components/common/Input/Checkbox';
import Page from '../../../components/common/Page';
import TableActionBtn from '../../../components/common/TableActionBtn';
import TableLink from '../../../components/common/TableLink';
import Tag from '../../../components/common/Tag';
import Table from '../../../components/Table/Table';
import Tooltip from '../../../components/common/Tooltip';
import { useRouter } from 'next/router';
import routes from '../../../utlis/routes';
import useSWR, { useSWRConfig } from 'swr';
import useAuth from '../../../hooks/useAuth';
import Modal from '../../../components/common/Modal';
import { deleteProjectAsync } from '../../../api/projects';
import { toast } from 'react-toastify';
import { displayError } from '../../../utlis/errorHandler';

const Projects = () => {
  const { data: projects, error } = useSWR('/projects');
  const { mutate } = useSWRConfig();
  const [activeProjectIdToDelete, setActiveProjectIdToDelete] = React.useState<
    string | null
  >(null);
  const loading = !projects && !error;
  const [fetching, setFetching] = React.useState(false);
  const [sortColumn, setSortColumn] = React.useState({
    path: 'name',
    order: 'asc',
  });

  const router = useRouter();
  const route = useAuth();

  useEffect(() => {
    if (route) {
      router.push(route);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  const handleDeleteProject = async () => {
    if (!activeProjectIdToDelete) return;
    setFetching(true);
    try {
      await deleteProjectAsync(activeProjectIdToDelete);
      toast.success('Project deleted successfully');
      mutate('/projects');
      setActiveProjectIdToDelete(null);
    } catch (error) {
      displayError(error);
    } finally {
      setFetching(false);
    }
  };

  const columns = [
    {
      id: 1,
      label: 'Project',
      path: 'name',
      colClasses: 'min-w-[150px] max-w-[150px]',
      content: (project: any) => (
        <div className='flex items-center'>
          <span className='block w-[120px] whitespace-nowrap text-ellipsis overflow-hidden'>
            {project.title}
          </span>
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
      colClasses: 'min-w-[170px]',
      ignoreSort: true,
      content: (project: any) => (
        <div>
          <Tooltip title='Edit Project'>
            <TableActionBtn
              onClick={() => router.push(`${routes.projects}/${project._id}`)}
            >
              <EditIcon className='text-inherit' />
            </TableActionBtn>
          </Tooltip>
          <Tooltip title='Delete Project'>
            <TableActionBtn
              onClick={() => setActiveProjectIdToDelete(project._id)}
            >
              <DeleteIcon className='text-inherit text-red-400 hover:text-red-500' />
            </TableActionBtn>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <Page>
      <Modal
        open={!!activeProjectIdToDelete}
        onClose={() => setActiveProjectIdToDelete(null)}
        title='Delete Project'
        onConfirm={handleDeleteProject}
        loading={loading || fetching}
      >
        <div className='flex flex-col items-center justify-center'>
          <p className='text-center'>
            Are you sure you want to delete this project?
          </p>
        </div>
      </Modal>
      <Table
        data={projects || []}
        columns={columns}
        onSort={(sortColumn) => setSortColumn(sortColumn)}
        sortColumn={sortColumn}
        sortTable
        loading={loading || fetching}
        total={projects?.length}
        title='Projects'
        pageNumberQueryField='page'
        pageSizeQueryField='limit'
        topHeaderContent={
          <DefaultTableHeaderInfo
            title='Projects'
            pageSizeQueryField='limit'
            subTitle='Manage your projects here with easy.'
            routePathToNew={routes.newProject}
          />
        }
      />
    </Page>
  );
};

export default Projects;
