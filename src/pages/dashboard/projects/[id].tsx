import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Page from '../../../components/common/Page';
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
  });

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id === 'new') return;
    const project = projects.find((project: any) => project._id === id);
    setProject(project);
  }, [id, projects]);

  useEffect(() => {
    dispatch(getProjects());
    dispatch(getProjectCategories());
  }, [dispatch]);

  return (
    <Page>
      <h3>Project</h3>
    </Page>
  );
};

export default Project;
