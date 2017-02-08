import { createAction } from './create-action'
import * as t from '../action-types'

import AuthSelectors from '~authenticate/redux/selectors'

export default mobilization => (dispatch, getState, { api }) => {
  const headers = AuthSelectors(getState()).getCredentials()
  
  dispatch(createAction(t.FETCH_WIDGETS_REQUEST))
  return api
    .get(`/mobilizations/${mobilization.id}/widgets`, { headers })
    .then(res => {
      dispatch(createAction(t.FETCH_WIDGETS_SUCCESS, res.data))
    })
    .catch(ex => {
      dispatch(createAction(t.FETCH_WIDGETS_FAILURE, ex))
      return Promise.reject(ex)
    })
}
