import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import useSWR from 'swr';

import Page from '../../../components/common/Page';
import Editor from '../../../components/Editor';
import { useAppSelector } from '../../../hooks/store';
import http from '../../../services/httpService';
import routes from '../../../utlis/routes';
const apiUrl = `/articles`;

const SAVE_INTERVAL_MS = 2000;

const Artice = () => {
  const router = useRouter();
  const { id } = router.query;

  const { io } = useAppSelector<any>((state) => state.socket);
  const { currentUser } = useAppSelector<any>((state) => state.auth);
  const { data: receivedArticle, error } = useSWR<any>(
    id && (id === 'new' ? '/articles/new-article' : `${apiUrl}/${id}`),
    (url: any) => (id === 'new' ? http.post(url) : http.get(url)),
  );
  const dataReceivedArticle = receivedArticle?.data;
  const [article, setArticle] = React.useState<any>({});

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
    if (dataReceivedArticle) {
      setArticle({
        ...dataReceivedArticle,
      });

      if (dataReceivedArticle.isNewArticle) {
        router.replace(`${routes.blog}/${dataReceivedArticle._id}`);
      }
    }
  }, [dataReceivedArticle, router]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleAutoSave();
    }, SAVE_INTERVAL_MS);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article]);

  return (
    <Page>
      <div className='mt-10 py-10 px-4 pt-6 bg-white rounded-xl shadow-soft-3xl'>
        Article
        {article.title && (
          <Editor onChange={handleChange} value={article.draft} />
        )}
      </div>
    </Page>
  );
};

export default Artice;
