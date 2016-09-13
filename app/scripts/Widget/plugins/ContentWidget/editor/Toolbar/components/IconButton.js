import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'


class IconButton extends Component {

  render() {

    const { iconClass, title, active, onClick, className, ...props } = this.props

    const newClassName = classnames(className, { 'bg-blue': active })

    return (
      <button title={title} onClick={onClick} className={newClassName} {...props}>
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
