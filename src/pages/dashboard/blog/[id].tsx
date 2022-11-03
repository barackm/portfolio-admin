import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import useSWR from 'swr';

import Page from '../../../components/common/Page';
import Editor from '../../../components/Editor';
import http from '../../../services/httpService';
import { API_END_POINT } from '../../../utlis/constants/constants';
import routes from '../../../utlis/routes';
const apiUrl = `${API_END_POINT}articles`;

interface ArticeProps {}

const postFetcher = (url: string) => http.post(url).then((res) => res.data);
const getFetcher = (url: string) => http.get(url).then((res) => res.data);
const putFetcher = (url: string) => http.put(url).then((res) => res.data);

const Artice = (props: ArticeProps) => {
  const router = useRouter();
  const [article, setArticle] = React.useState<any>(null);
  const { id } = router.query;
  const shouldNotFetch = !id || article?.isNewArticle;
  const url = `${apiUrl}/${id === 'new' ? 'new-article' : id}`;

  const { data, error } = useSWR(
    url,
    shouldNotFetch
      ? null
      : (url) => {
          return id === 'new' ? postFetcher(url) : getFetcher(url);
        },
  );

  const loading = !data && !error;
  useEffect(() => {
    if (data) {
      setArticle(data);
      if (data.isNewArticle) {
        router.replace(`${routes.blog}/${data._id}`);
      }
    }
  }, [data, router]);

  console.log('article', article);

  return (
    <Page>
      <div className='mt-10 py-10 px-4 pt-6 bg-white rounded-xl shadow-soft-3xl'>
        Article
        <Editor />
      </div>
    </Page>
  );
};

export default Artice;
