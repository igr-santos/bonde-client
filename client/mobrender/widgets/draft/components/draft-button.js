import React, { PropTypes } from 'react'

const DraftButton = ({ icon, label, updateKind, ...props }) => (
  <div className='draft-widget-button col col-4 p1'>
    <button className='btn col-12' onClick={() => updateKind(props)}>
      <span className='content'>
        <i className={`fa fa-${icon} block white`} />
        <span className='text'>{label}</span>
      </span>
    </button>
  </div>
)

DraftButton.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  kind: PropTypes.string.isRequired,
  settings: PropTypes.object.isRequired,
  updateKind: PropTypes.func.isRequired
}

export default DraftButton
