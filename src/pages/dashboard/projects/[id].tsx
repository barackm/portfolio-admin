import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import Button from '../../../components/common/Button';
import FileUploadDropzone from '../../../components/common/Input/FileUploadDropzone';
import Select from '../../../components/common/Input/Select';
import Textarea from '../../../components/common/Input/Textarea';
import TextInput from '../../../components/common/Input/TextInput';
import Page from '../../../components/common/Page';
import Form from '../../../components/form/Form';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { getProjectCategories } from '../../../services/projectCategoriesService';
import { getProjects } from '../../../services/projectsService';

const Project = () => {
  const router = useRouter();
  const { id } = router.query;
  const { list: projects, loading: loadingProjects } = useAppSelector(
    (state: any) => state.entities.projects,
  );
  const { list: categories, loading: loadingCategories } = useAppSelector(
    (state: any) => state.entities.projectCategories,
  );
  const [project, setProject] = React.useState({
    category: {},
    description: '',
    liveDemoUrl: '',
    sourceCodeUrl: '',
    tags: [],
    technologies: [],
    title: '',
    _id: null,
    imageUrl: [],
  });

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id === 'new') {
      setProject({
        category: {},
        description: '',
        liveDemoUrl: '',
        sourceCodeUrl: '',
        tags: [],
        technologies: [],
        title: '',
        imageUrl: [],
        _id: null,
      });
      return;
    }
    const project = projects.find((project: any) => project._id === id);
    console.log(project);

    if (project) {
      setProject({
        ...project,
        tags: project.tags.map((tag: any) => {
          return { label: tag, value: tag };
        }),
        technologies: project.technologies.map((tech: any) => {
          return { label: tech, value: tech };
        }),
        category: {
          label: project.category.name,
          value: project.category._id,
          ...project.category,
        },
        imageUrl: project.imageUrl
          ? [
              {
                name: project.imageUrl,
                path: project.imageUrl,
              },
            ]
          : [],
      });
    }
  }, [id, projects]);

  useEffect(() => {
    dispatch(getProjects());
    dispatch(getProjectCategories());
  }, [dispatch]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required().label('Title'),
    description: Yup.string().required().label('Description'),
    liveDemoUrl: Yup.string().url().label('Live Demo Url'),
    sourceCodeUrl: Yup.string().url().label('Source Code Url'),
    category: Yup.object().required().label('Category'),
    tags: Yup.array().required().label('Tags'),
    technologies: Yup.array().required().label('Technologies'),
    imageUrl: Yup.array().label('Image Url'),
  });

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
            onSubmit={(values) => console.log(values)}
            validationSchema={validationSchema}
            enableReinitialize={project?._id || false}
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
