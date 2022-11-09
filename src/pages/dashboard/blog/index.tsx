import moment from 'moment';
import { GetServerSideProps, GetStaticProps } from 'next';
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
import Tooltip from '../../../components/common/Tooltip';
import { useRouter } from 'next/router';
import routes from '../../../utlis/routes';
import { deleteArticleAsync, getArticlesAsync } from '../../../api/articles';
import { toast } from 'react-toastify';
import { displayError } from '../../../utlis/errorHandler';
import useSWR, { useSWRConfig } from 'swr';

const Articles = () => {
  const { data: articles, error } = useSWR('/articles');
  const { mutate } = useSWRConfig();
  const fetching = !articles && !error;
  const [loading, setLoading] = React.useState(false);
  const [sortColumn, setSortColumn] = React.useState({
    path: 'title',
    order: 'asc',
  });

  const router = useRouter();

  const columns = [
    {
      id: 1,
      label: 'Slug',
      path: 'title',
      colClasses: 'min-w-[150px] max-w-[150px]',
      content: (article: any) => (
        <div className='flex items-center'>
          <div className='flex items-center'>
            <Checkbox onChange={() => {}} name='article' />
          </div>
          <div>
            <span className='block w-[120px] whitespace-nowrap text-ellipsis overflow-hidden'>
              {article.title}
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      label: 'Actions',
      path: '',
      colClasses: 'min-w-[170px]',
      ignoreSort: true,
      content: (article: any) => (
        <div>
          <Tooltip title='View Article'>
            <TableActionBtn>
              <VisibilityIcon className='text-inherit' />
            </TableActionBtn>
          </Tooltip>
          <Tooltip title='Edit Article'>
            <TableActionBtn
              onClick={() => router.push(`${routes.blog}/${article._id}`)}
            >
              <EditIcon className='text-inherit' />
            </TableActionBtn>
          </Tooltip>
          <Tooltip title='Delete Article'>
            <TableActionBtn onClick={() => handleDeleteArticle(article._id)}>
              <DeleteIcon className='text-inherit text-red-400 hover:text-red-500' />
            </TableActionBtn>
          </Tooltip>
        </div>
      ),
    },
  ];

  const handleDeleteArticle = async (id: string) => {
    setLoading(true);
    try {
      await deleteArticleAsync(id);
      setLoading(false);
      toast.success('Article deleted successfully');
      mutate('/articles');
    } catch (error) {
      displayError(error);
      setLoading(false);
    }
  };

  return (
    <Page>
      <Table
        data={articles || []}
        columns={columns}
        onSort={(sortColumn) => setSortColumn(sortColumn)}
        sortColumn={sortColumn}
        sortTable
        title='Articles'
        topHeaderContent={
          <DefaultTableHeaderInfo
            title='Articles'
            subTitle='Manage your articles'
          />
        }
      />
    </Page>
  );
};

export default Articles;
