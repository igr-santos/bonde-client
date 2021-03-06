import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ga from 'react-ga'

import '../../../node_modules/font-awesome/scss/font-awesome.scss'
import '../../styles/main.scss'
import { GoogleFontsLoader } from '../../components/Fonts'
import { actions as AccountActions } from '../Account'


@connect(state => ({ auth: state.auth }))
export default class Application extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    auth: PropTypes.object,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    })
  }

  static fetchData(store) {
    const promises = []
    if (!AccountActions.isLoaded(store.getState())) {
      promises.push(store.dispatch(AccountActions.load()))
    }
    return Promise.all(promises)
  }

  componentDidMount() {
    ga.initialize('UA-26278513-30')
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      ga.pageview(this.props.location.pathname)
    }
  }

  render() {
    return (
      <div>
        {React.cloneElement(this.props.children, {auth: this.props.auth})}
        <GoogleFontsLoader fonts="Source Sans Pro" />
      </div>
    )
  }
}
