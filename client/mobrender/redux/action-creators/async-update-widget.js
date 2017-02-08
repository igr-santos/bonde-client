import { createAction } from './create-action'
import * as t from '../action-types'

export default widget => (dispatch, getState, { api }) => {
  dispatch(createAction(t.UPDATE_WIDGET_REQUEST))
  const { auth: { credentials }, mobilization } = getState()

  return api
    .put(`/widgets`, { widget }, { headers: credentials })
    .then(res => {
      //dispatch(createAction(t.UPDATE_WIDGET_SUCCESS, res.data))
      return Promise.resolve()
    })
    .catch(error => {
      dispatch(createAction(t.UPDATE_WIDGET_FAILURE, error))
      return Promise.reject({ _error: error })
    })
}
