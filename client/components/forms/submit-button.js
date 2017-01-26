import React from 'react'

const SubmitButton = ({ children, pristine, submitting }) => (
  <button type='submit' disabled={pristine || submitting}>{children}</button>
)

export default SubmitButton
