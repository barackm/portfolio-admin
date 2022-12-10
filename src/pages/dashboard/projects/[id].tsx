import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';
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
import { displayError } from '../../../utlis/errorHandler';
import routes from '../../../utlis/routes';

const Project = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: categories = [] } = useSWR('/projectCategories');
  const defaultProjectData = {
    title: '',
    description: '',
    category: {},
    liveDemoUrl: '',
    githubUrl: '',
    sourceCodeUrl: '',
    tags: [],
    technologies: [],
    imageUrl: '',
  };

  const { data: project = id === 'new' ? defaultProjectData : {}, error } =
    useSWR(id && id !== 'new' ? `/projects/${id}` : null);

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
    imageUrl: Yup.array().label('Image'),
  });

  const handleSubmit = (values: any) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('liveDemoUrl', values.liveDemoUrl);
    formData.append('sourceCodeUrl', values.sourceCodeUrl);
    formData.append('categoryId', values.category._id);
    formData.append(
      'tags',
      values.tags.map((tag: any) => tag.label),
    );
    formData.append(
      'technologies',
      values.technologies.map((tech: any) => tech.label),
    );

    formData.append(
      'imageUrl',
      values.imageUrl[0].path.includes('http')
        ? values.imageUrl.path
        : values.imageUrl[0],
    );

    if (project._id) {
      handleUpdateProject(formData, project._id);
    } else {
      handleCreateProject(formData);
    }
  };

  const handleUpdateProject = async (values: any, projectId: string) => {
    setFetching(true);
    try {
      await updateProjectAsync(values, projectId);
      setFetching(false);
      toast.success('Project updated successfully');
      router.push(routes.projects);
    } catch (error) {
      setFetching(false);
      displayError(error);
    }
  };

  const handleCreateProject = async (values: any) => {
    setFetching(true);
    try {
      await createProjectAsync(values);
      setFetching(false);
      toast.success('Project created successfully');
      router.push(routes.projects);
    } catch (error) {
      setFetching(false);
      displayError(error);
    }
  };

  console.log(project.category, 'project.imageUrl');

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
              tags:
                project.tags &&
                project.tags.map((tag: string) => ({
                  label: tag,
                  value: tag,
                })),
              technologies:
                project.technologies &&
                project.technologies.map((tech: string) => ({
                  label: tech,
                  value: tech,
                })),
              category: project.category && {
                ...project.category,
                label: project.category.name,
                value: project.category._id,
              },
              imageUrl: project.imageUrl
                ? [
                    {
                      path: project.imageUrl,
                      name: project.imageUrl,
                    },
                  ]
                : [],
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

            <Button usesFormik loading={fetching}>
              {project?._id ? `Save` : 'Create'}
            </Button>
            <Button
              color='secondary'
              className='ml-2'
              onClick={() => router.push(routes.projects)}
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
