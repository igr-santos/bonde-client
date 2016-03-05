import React from 'react'
import { connect } from 'react-redux'
import { Loading, TopMenu } from './../components'
import { fetchMobilizations, isMobilizationsLoaded } from './../reducers/mobilizations'
import { fetchOrganizations, isOrganizationsLoaded } from './../reducers/organizations'

@connect(state => ({
  mobilizations: state.mobilizations,
  organizations: state.organizations
}))

export default class UserDashboard extends React.Component {
  static fetchData(store) {
    const promises = []

    if (!isMobilizationsLoaded(store.getState())) {
      promises.push(store.dispatch(fetchMobilizations()))
    }

    if (!isOrganizationsLoaded(store.getState())) {
      promises.push(store.dispatch(fetchOrganizations()))
    }

    return Promise.all(promises)
  }

  componentDidMount() {
    // TODO this callback is a workaround to load mobilizations in client-side
    // but it should be replaced by the static fetchData method that is fetching
    // mobilizations only in the server-side for now
    if (!this.props.mobilizations.loaded) {
      this.props.dispatch(fetchMobilizations())
    }

    if (!this.props.organizations.loaded) {
      this.props.dispatch(fetchOrganizations())
    }
  }

  selectedMobilization() {
    const { mobilizations, params } = this.props
    return mobilizations.data.filter((m) => {
      return m.id === parseInt(params.mobilization_id, 10)
    })[0]
  }

  renderMobilizations() {
    const { children, ...otherProps } = this.props

    // TODO http://glenmaddern.com/articles/css-modules
    // we should be using css modules to better define styles
    return (
      <div className="top-0 right-0 bottom-0 left-0 flex flex-column absolute">
        <TopMenu auth={this.props.auth} />
        {
          /* TODO pass mobilizations as props, and change the following
          components to read mobilizations.data as the mobilizations list */
          React.cloneElement(children, {
            ...otherProps,
            mobilization: this.selectedMobilization()
          })
        }
      </div>
    )
  }

  render() {
    return (this.props.mobilizations.loaded ? this.renderMobilizations() : <Loading />)
  }
}
