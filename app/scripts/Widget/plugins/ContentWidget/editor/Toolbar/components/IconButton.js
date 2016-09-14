import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'


class IconButton extends Component {

  render() {
    const { iconClass, title, active, onClick, className, ...props } = this.props

    return (
      <button title={title} onClick={onClick} className={classnames(className, active ? 'bg-blue' : null)} {...props}>
        <i className={iconClass}></i>
      </button>
    )
  }
}

IconButton.propTypes = {
  iconClass: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

IconButton.defaultProps = {
  active: false
}

export default IconButton
