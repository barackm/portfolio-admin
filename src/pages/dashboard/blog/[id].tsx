import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import useSWR from 'swr';

import Page from '../../../components/common/Page';
import Editor from '../../../components/Editor';
import { useAppSelector } from '../../../hooks/store';
import http from '../../../services/httpService';
import { API_END_POINT } from '../../../utlis/constants/constants';
import routes from '../../../utlis/routes';
const apiUrl = `${API_END_POINT}articles`;

const SAVE_INTERVAL_MS = 2000;
interface ArticeProps {}

const postFetcher = (url: string) => http.post(url).then((res) => res.data);
const getFetcher = (url: string) => http.get(url).then((res) => res.data);
const putFetcher = (url: string) => http.put(url).then((res) => res.data);

const Artice = (props: ArticeProps) => {
  const router = useRouter();
  const [article, setArticle] = React.useState<any>({
    title: '',
    draft: '',
    tags: [],
    mainImageUrl: '',
  });
  const { io } = useAppSelector<any>((state) => state.socket);
  const { currentUser } = useAppSelector<any>((state) => state.auth);

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

  const handleChange = (content: any) => {
    setArticle((prev: any) => ({ ...prev, draft: content }));
  };

  const handleAutoSave = async () => {
    const data = {
      currentUser,
      article,
    };

    io && io.emit('auto-save-article', data);
  };

  useEffect(() => {
    const interval = setInterval(handleAutoSave, SAVE_INTERVAL_MS);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article]);

  return (
    <Page>
      <div className='mt-10 py-10 px-4 pt-6 bg-white rounded-xl shadow-soft-3xl'>
        Article
        {!loading && <Editor onChange={handleChange} value={article.draft} />}
      </div>
    </Page>
  );
};

export default Artice;
