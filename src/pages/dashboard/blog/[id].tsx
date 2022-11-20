import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import useSWR, { mutate } from 'swr';
import TextInput from '../../../components/common/Input/TextInput';

import Page from '../../../components/common/Page';
import Editor from '../../../components/Editor';
import { useAppSelector } from '../../../hooks/store';
import http from '../../../services/httpService';
import routes from '../../../utlis/routes';
import Button from '../../../components/common/Button';
import { toast } from 'react-toastify';
import Select from '../../../components/common/Input/Select';
import {
  publishArticleAsync,
  saveArticleAsync,
  scheduleArticleAsync,
  unPublishArticleAsync,
} from '../../../api/articles';
import { displayError } from '../../../utlis/errorHandler';
import moment from 'moment';
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
  const [publishDate, setPublishDate] = React.useState(null);
  const [fetching, setFetching] = React.useState(false);
  const dataReceivedArticle = receivedArticle?.data;
  const [article, setArticle] = React.useState<any>({});
  const [publishing, setPublishing] = React.useState(false);
  const handleChange = (content: any) => {
    setArticle((prev: any) => ({ ...prev, draft: content }));
  };

  const handleAutoSave = async () => {
    const data = {
      currentUser,
      article: {
        ...article,
        tags: article.tags.map((tag: any) => tag.value).join(','),
      },
    };
    io && io.emit('auto-save-article', data);
  };

  useEffect(() => {
    if (article?.draft === dataReceivedArticle?.draft) return;

    if (dataReceivedArticle) {
      const formatedTags = dataReceivedArticle.tags.map((tag: any) => ({
        value: tag,
        label: tag,
      }));

      setArticle({
        ...dataReceivedArticle,
        tags: dataReceivedArticle.tags.map((tag: string) => ({
          value: tag,
          label: tag,
        })),
      });

      setPublishDate(dataReceivedArticle?.scheduledAt);
      if (dataReceivedArticle.isNewArticle) {
        router.replace(`${routes.blog}/${dataReceivedArticle._id}`);
      } else {
        mutate(`${apiUrl}/${article._id}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataReceivedArticle, router]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleAutoSave();
    }, SAVE_INTERVAL_MS);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article]);

  const handlePublish = async () => {
    setPublishing(true);
    try {
      await publishArticleAsync(article._id);
      toast.success('Article published successfully');
      router.push(routes.blog);
      mutate(`${apiUrl}/${article._id}`);
    } catch (error) {
      displayError(error);
    } finally {
      setPublishing(false);
    }
  };

  const handleSave = async () => {
    setFetching(true);
    try {
      const formData = new FormData();
      formData.append('title', article.title);
      formData.append('draft', article.draft);
      formData.append(
        'tags',
        article.tags.map((tag: any) => tag.value).join(','),
      );
      formData.append('mainImageUrl', article.mainImageUrl);
      await saveArticleAsync(article._id, formData);
      toast.success('Article saved successfully');
      setFetching(false);
      mutate(`${apiUrl}/${article._id}`);
      router.push(routes.blog);
    } catch (error) {
      displayError(error);
    } finally {
      setFetching(false);
    }
  };

  const handleUnPublish = async () => {
    setFetching(true);
    try {
      await unPublishArticleAsync(article._id);
      toast.success('Article unpublished successfully');
      router.push(routes.blog);
      mutate(`${apiUrl}/${article._id}`);
    } catch (error) {
      displayError(error);
    } finally {
      setFetching(false);
    }
  };

  const handleSchedule = async () => {
    setFetching(true);
    try {
      const { data } = await scheduleArticleAsync(article._id, {
        scheduledAt: publishDate,
      });
      console.log(data);
      setArticle(data);
      mutate(`${apiUrl}/${article._id}`);
      toast.success('Article scheduled successfully');
    } catch (error) {
      displayError(error);
    } finally {
      setFetching(false);
    }
  };

  const shouldShowForm = article && article._id;

  console.log(article, 'article');
  return (
    <Page>
      <div className='mt-10 py-10 px-4 pt-6 bg-white rounded-xl shadow-soft-3xl'>
        <div>
          <div className='flex items-center justify-between'>
            <h1 className='text-xl font-medium text-gray-900'>
              {shouldShowForm ? article.title : 'New Article'}
            </h1>
            <div className='flex items-center'>
              <Button
                loading={publishing}
                onClick={handlePublish}
                disabled={fetching}
              >
                Publish
              </Button>
              {article.isPublished && (
                <Button
                  loading={fetching}
                  disabled={publishing}
                  onClick={handleUnPublish}
                  className='ml-2'
                >
                  Unpublish
                </Button>
              )}
              <Button
                variant='outlined'
                className='ml-2'
                onClick={handleSave}
                disabled={publishing}
                loading={fetching}
              >
                Save Draft
              </Button>
              <Button
                className='ml-2'
                color='secondary'
                onClick={() => {
                  router.push(routes.blog);
                }}
                disabled={publishing}
                loading={fetching}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
        {shouldShowForm && (
          <div className='my-4'>
            <TextInput
              usesFormik={false}
              value={article.title}
              label='Title'
              onChange={(e) =>
                setArticle((prev: any) => ({ ...prev, title: e.target.value }))
              }
            />
            <Select
              isMulti
              isCreatable
              value={article.tags || []}
              label='Tags'
              name='tags'
              usesFormik={false}
              onChange={(e: any) =>
                setArticle((prev: any) => ({ ...prev, tags: e.target.value }))
              }
            />
            <TextInput
              usesFormik={false}
              label='Main Image'
              type='file'
              accepts='image/*'
              multiple={false}
              onChange={(e: any) => {
                setArticle((prev: any) => ({
                  ...prev,
                  mainImageUrl: e.target.files[0],
                }));
              }}
            />
            {article.mainImageUrl && (
              <div className='flex items-center justify-start my-1 relative'>
                <div className='relative'>
                  <Image
                    src={
                      article.mainImageUrl?.name
                        ? URL.createObjectURL(article.mainImageUrl)
                        : article.mainImageUrl
                    }
                    alt='main image'
                    className='w-1/2 rounded-xl'
                    width={80}
                    height={80}
                  />
                  <button
                    className='absolute top-1 right-1 text-slate-100 hover:text-slate-200 ease-soft-in-out duration-200'
                    type='button'
                    onClick={() => {
                      if (publishing) return;
                      setArticle((prev: any) => ({
                        ...prev,
                        mainImageUrl: null,
                      }));
                    }}
                    title='Remove Image'
                  >
                    <CloseIcon />
                  </button>
                </div>
              </div>
            )}
            <div className='flex items-center justify-between'>
              <div className='flex items-end'>
                <TextInput
                  usesFormik={false}
                  label='Schedule'
                  value={moment(publishDate).format('YYYY-MM-DD HH:mm')}
                  type='datetime-local'
                  onChange={(e: any) => setPublishDate(e.target.value)}
                />
                <Button
                  variant='outlined'
                  className='ml-2'
                  onClick={handleSchedule}
                  disabled={publishing}
                  loading={fetching}
                >
                  Schedule
                </Button>
              </div>
            </div>

            <Editor onChange={handleChange} value={article.draft} />
          </div>
        )}
      </div>
    </Page>
  );
};

export default Artice;
