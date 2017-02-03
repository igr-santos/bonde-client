import React, { PropTypes } from 'react'

const Content = ({ widget, update }) => (
  <div className='content'>
    {widget.settings.content}
  </div>
)

Content.propTypes = {
  widget: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired
}

export default Content
