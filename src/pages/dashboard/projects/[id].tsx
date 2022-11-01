import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { getProjectCategoriesAsync } from '../../../api/projectCategories';
import {
  createProjectAsync,
  getProjectsAsync,
  getSingleProjectAsync,
  updateProjectAsync,
} from '../../../api/projects';
import Button from '../../../components/common/Button';
import FileUploadDropzone from '../../../components/common/Input/FileUploadDropzone';
import Select from '../../../components/common/Input/Select';
import Textarea from '../../../components/common/Input/Textarea';
import TextInput from '../../../components/common/Input/TextInput';
import Page from '../../../components/common/Page';
import Form from '../../../components/form/Form';
interface ProjectPros {
  project: any;
  categories: any;
}

const Project = (props: ProjectPros) => {
  const router = useRouter();
  const { project, categories } = props;
  const [fetching, setFetching] = React.useState(false);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required().label('Title'),
    description: Yup.string().required().label('Description'),
    liveDemoUrl: Yup.string().url().label('Live Demo Url'),
    sourceCodeUrl: Yup.string().url().label('Source Code Url'),
    category: Yup.object({
      label: Yup.string(),
    })
      .required()
      .label('Category'),
    tags: Yup.array().label('Tags'),
    technologies: Yup.array().label('Technologies'),
    imageUrl: Yup.array().label('Image Url'),
    // .test(
  });

  const handleSubmit = (values: any) => {
    const body = {
      title: values.title,
      description: values.description,
      liveDemoUrl: values.liveDemoUrl,
      sourceCodeUrl: values.sourceCodeUrl,
      categoryId: values.category._id,
      tags: values.tags.map((tag: any) => tag.label),
      technologies: values.technologies.map((tech: any) => tech.label),
      imageUrl: values.imageUrl[0],
    };

    // if (project._id) {
    //   handleUpdateProject(body, project._id);
    // } else {
    //   handleCreateProject(body);
    // }
    console.log(body);
  };

  const handleUpdateProject = async (values: any, projectId: string) => {
    setFetching(true);
    try {
      const { data } = await updateProjectAsync(values, projectId);
      setFetching(false);
    } catch (error) {
      setFetching(false);
    }
  };

  const handleCreateProject = async (values: any) => {
    setFetching(true);
    try {
      const { data } = await createProjectAsync(values);
      setFetching(false);
    } catch (error) {
      setFetching(false);
    }
  };

  return (
    <Page>
      <div>
        <div className='mt-10 py-10 px-4 pt-6 bg-white rounded-xl shadow-soft-3xl'>
          <div className='mb-6'>
            <h1 className='text-3xl font-normal text-gray-800'>
              {project?._id ? `Edit Project` : 'New Project'}
            </h1>
          </div>
          <Form
            initialValues={{
              title: project.title,
              description: project.description,
              liveDemoUrl: project.liveDemoUrl,
              sourceCodeUrl: project.sourceCodeUrl,
              tags: project.tags,
              technologies: project.technologies,
              category: project.category,
              imageUrl: project.imageUrl,
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            enableReinitialize
          >
            <FileUploadDropzone name='imageUrl' label='Project Image' />
            <div className='my-4' />
            <TextInput name='title' label='Project Name' />
            <div className='my-4' />
            <Textarea name='description' label='Project Description' />
            <div className='my-4' />
            <TextInput name='liveDemoUrl' label='Live Demo Url' />
            <div className='my-4' />
            <TextInput name='sourceCodeUrl' label='Source Code Url' />
            <div className='my-4' />
            <Select
              name='category'
              label='Category'
              options={categories.map((category: any) => ({
                ...category,
                label: category.name,
                value: category._id,
              }))}
            />
            <div className='my-4' />
            <Select name='tags' isCreatable isMulti label='Tags' />
            <div className='my-4' />
            <Select
              name='technologies'
              isCreatable
              isMulti
              label='Technologies'
            />
            <div className='my-4' />

            <Button usesFormik type='submit'>
              {project?._id ? `Save` : 'Create'}
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
      </div>
    </Page>
  );
};

export default Project;

export const getStaticPaths = async () => {
  const { data: projects } = await getProjectsAsync();

  const projectsWithNew = [...projects, { _id: 'new' }];

  const paths = projectsWithNew.map((project: any) => ({
    params: { id: project._id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const defaultEmptyProject = {
    title: '',
    description: '',
    liveDemoUrl: '',
    sourceCodeUrl: '',
    tags: [],
    technologies: [],
    category: null,
    imageUrl: '',
  };

  const { data: project } =
    params.id === 'new'
      ? { data: defaultEmptyProject }
      : await getSingleProjectAsync(params.id);
  const { data: categories } = await getProjectCategoriesAsync();

  return {
    props: {
      project: {
        ...project,
        tags: project.tags.map((tag: any) => ({ label: tag, value: tag })),
        technologies: project.technologies.map((tech: any) => ({
          label: tech,
          value: tech,
        })),
        category: project.category
          ? {
              ...project.category,
              label: project.category.name,
              value: project.category._id,
            }
          : null,
        imageUrl: project.imageUrl && {
          path: project.imageUrl,
          name: project.imageUrl,
        },
      },
      categories,
    },
  };
};
