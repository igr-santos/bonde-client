import * as t from '../action-types'


export default relationshipId => (dispatch, getState, axios) => {
  dispatch({ type: t.FETCH })

  const { auth: { credentials } } = getState()
  return axios
    .get(`/communities/${relationshipId}/mobilizations`)
    .then(({ status, data }) => {
      if (status === 200) {
        dispatch({ type: t.LOAD, payload: data })
        return Promise.resolve()
      } else {
        return Promise.reject({ error: `Response code ${status}` })
      }
    })
    .catch(error => console.error('AsyncRequestError', error))
}