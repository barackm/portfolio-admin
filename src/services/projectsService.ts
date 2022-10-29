import { apiCallBegan } from '../store/actions/api';
import {
  projectsLoaded,
  projectsRequestFailed,
  projectsRequestStarted,
} from '../store/slices/projects';
import { shouldFetchNow } from '../utlis/api';
const url = '/projects';

export const getProjects = () => (dispatch: any, getState: any) => {
  const { lastFetch } = getState().entities.projects;
  if (!shouldFetchNow(lastFetch, 'minutes', 5)) return;
  dispatch(
    apiCallBegan({
      url,
      onStart: projectsRequestStarted.type,
      onSuccess: projectsLoaded.type,
      onError: projectsRequestFailed.type,
    }),
  );
};
