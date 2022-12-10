import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import DefaultTableHeaderInfo from '../../../components/common/DefaultTableHeaderInfo';
import Page from '../../../components/common/Page';
import TableActionBtn from '../../../components/common/TableActionBtn';
import Table from '../../../components/Table/Table';
import Tooltip from '../../../components/common/Tooltip';
import { useRouter } from 'next/router';
import routes from '../../../utlis/routes';
import { deleteArticleAsync } from '../../../api/articles';
import { toast } from 'react-toastify';
import { displayError } from '../../../utlis/errorHandler';
import useSWR, { useSWRConfig } from 'swr';

const Articles = () => {
  const [limit, setLimit] = React.useState(2);
  const [page, setPage] = React.useState(1);
  const { data: articlesData, error } = useSWR('/articles?page=1&limit=10');
  const { articles, total } = articlesData || {};
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
          <span className='block w-[120px] whitespace-nowrap text-ellipsis overflow-hidden'>
            {article.title}
          </span>
        </div>
      ),
    },
    {
      id: 2,
      label: 'Content',
      path: 'content',
      colClasses: 'min-w-[150px] max-w-[150px]',
      content: (article: any) => (
        <div className='flex items-center'>
          <span className='block w-[120px] whitespace-nowrap text-ellipsis overflow-hidden'>
            {article.content || 'No content'}
          </span>
        </div>
      ),
    },
    {
      id: 3,
      label: 'Modified At',
      path: 'modifiedAt',
      colClasses: 'min-w-[150px] max-w-[150px]',
      content: (article: any) => (
        <div className='flex items-center'>
          {moment(article.modifiedAt).format('DD/MM/YYYY')}
        </div>
      ),
    },
    {
      id: 3,
      label: 'Status',
      path: 'isPublished',
      colClasses: 'min-w-[150px] max-w-[150px]',
      content: (article: any) => (
        <div className='flex items-center'>
          {article.isPublished ? 'Published' : 'Draft'}
        </div>
      ),
    },
    {
      id: 3,
      label: 'Created At',
      path: 'createdAt',
      colClasses: 'min-w-[150px] max-w-[150px]',
      content: (article: any) => (
        <div className='flex items-center'>
          {moment(article.createdAt).format('DD/MM/YYYY')}
        </div>
      ),
    },
    {
      id: 4,
      label: 'Actions',
      path: '',
      colClasses: 'min-w-[170px]',
      ignoreSort: true,
      content: (article: any) => (
        <div>
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
      mutate('/articles?page=1&limit=10');
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
        limit={limit}
        page={page}
        total={total}
        loading={fetching}
        count={Math.ceil(total / limit)}
        pageNumberQueryField='page'
        pageSizeQueryField='limit'
        topHeaderContent={
          <DefaultTableHeaderInfo
            title='Articles'
            pageSizeQueryField='limit'
            subTitle='Manage your projects here with easy.'
            routePathToNew={routes.newBlog}
          />
        }
      />
    </Page>
  );
};

export default Articles;
