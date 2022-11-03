import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import * as Yup from 'yup';
import { getArticlesAsync, getSingleArticleAsync } from '../../../api/articles';
import Button from '../../../components/common/Button';
import FileUploadDropzone from '../../../components/common/Input/FileUploadDropzone';
import Select from '../../../components/common/Input/Select';
import TextInput from '../../../components/common/Input/TextInput';
import Page from '../../../components/common/Page';
import Form from '../../../components/form/Form';

interface ArticeProps {
  article: any;
}
const Artice = (props: ArticeProps) => {
  const { article } = props;
  const [scheduledAt, setScheduledAt] = React.useState(article.scheduledAt);
  const [savedDraft, setSavedDraft] = React.useState(article.savedDraft);
  const [fetching, setFetching] = React.useState(false);
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required().label('Title'),
    content: Yup.string().required().label('Content'),
    imageUrl: Yup.array().label('Image Url'),
  });
  const handleSubmit = (values: any) => {};

  return (
    <Page>
      <div className='mt-10 py-10 px-4 pt-6 bg-white rounded-xl shadow-soft-3xl'>
        <div></div>
        <Form
          initialValues={{
            title: article.title,
            content: article.content,
            mainImageUrl: article.mainImageUrl,
            tags: article.tags,
          }}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          <FileUploadDropzone name='mainImageUrl' label='Main article Image' />
          <div className='my-4' />
          <TextInput name='title' label='Title' />
          <div className='my-4' />
          <Select name='tags' isCreatable isMulti label='Tags' />
          <div className='my-4' />
          <Button usesFormik loading={fetching}>
            {article?._id ? `Save` : 'Create'}
          </Button>
          <Button
            color='secondary'
            className='ml-2'
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </Form>
      </div>
    </Page>
  );
};

export default Artice;

export const getStaticPaths = async () => {
  const { data: articles } = await getArticlesAsync();

  const projectsWithNew = [...articles, { _id: 'new' }];

  const paths = projectsWithNew.map((project: any) => ({
    params: { id: project._id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const defaultEmptyArticle = {
    title: '',
    content: '',
    tags: [],
    mainImageUrl: '',
    scheduledAt: null,
    savedDraft: false,
  };

  const { data: article } =
    params.id === 'new'
      ? { data: defaultEmptyArticle }
      : await getSingleArticleAsync(params.id);

  return {
    props: {
      article: {
        ...article,
        tags: article.tags.map((tag: any) => ({ label: tag, value: tag })),
        mainImageUrl: article.mainImageUrl
          ? [
              {
                path: article.mainImageUrl,
                name: article.mainImageUrl,
              },
            ]
          : [],
      },
    },
  };
};
