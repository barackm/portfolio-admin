import { apiCallBegan } from '../store/actions/api';
import {
  projectCategoriesLoaded,
  projectCategoriesRequestFailed,
  projectCategoriesRequestStarted,
  projectCategoryAdded,
} from '../store/slices/projectCategories';
import { shouldFetchNow } from '../utlis/api';

const url = '/projectCategories';
export const getProjectCategories =
  () => async (dispatch: any, getState: any) => {
    const { lastFetch } = getState().entities.projectCategories;

    if (!shouldFetchNow(lastFetch, 'minutes', 5)) return;

    dispatch(
      apiCallBegan({
        url,
        onStart: projectCategoriesRequestStarted.type,
        onSuccess: projectCategoriesLoaded.type,
        onError: projectCategoriesRequestFailed.type,
        successAction: () => {
          Promise.resolve();
        },
      }),
    );
  };

export const addProjectCategory = (data: any) => (dispatch: any) => {
  dispatch(
    apiCallBegan({
      url,
      method: 'POST',
      data,
      onSuccess: projectCategoryAdded.type,
      onError: projectCategoriesRequestFailed.type,
      onStart: projectCategoriesRequestStarted.type,
    }),
  );
};

export const updateProjectCategory = (data: any) => (dispatch: any) => {
  dispatch(
    apiCallBegan({
      url: `${url}/${data._id}`,
      method: 'PUT',
      data,
      onSuccess: projectCategoriesLoaded.type,
      onError: projectCategoriesRequestFailed.type,
      onStart: projectCategoriesRequestStarted.type,
    }),
  );
};

export const deleteProjectCategory = (_id: string) => (dispatch: any) => {
  dispatch(
    apiCallBegan({
      url: `${url}/${_id}`,
      method: 'DELETE',
      onSuccess: projectCategoriesLoaded.type,
      onError: projectCategoriesRequestFailed.type,
      onStart: projectCategoriesRequestStarted.type,
    }),
  );
};
