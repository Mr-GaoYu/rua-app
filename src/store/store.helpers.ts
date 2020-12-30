import { AsyncActionCreators } from 'typescript-fsa';
import {

  ThunkActionCreator
} from 'src/store/types';

export const createRequestThunk = <Req extends any, Res, Err>(
  actions: AsyncActionCreators<Req, Res, Err>,
  request: (params: Req) => Promise<Res>
): ThunkActionCreator<Promise<Res>, Req> => {
  return (params: Req) => async dispatch => {
    const { started, done, failed } = actions;

    dispatch(started(params));

    try {
      const result = await request(params);
      const doneAction = done({ result, params });
      dispatch(doneAction);
      return result;
    } catch (error) {
      const failAction = failed({ error, params });
      dispatch(failAction);
      return Promise.reject(error);
    }
  };
};