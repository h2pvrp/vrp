import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap'

import {
  delete_alert,
} from '../actions'

const mapStateToProps = state => ({
  alerts: state.alerts,
})

const mapDispatchToProps = dispatch => ({
  delete_alert: index => dispatch(delete_alert(index)),
});

class ConnectedAlerts extends Component {

  constructor(props) {
  super(props);
    this.onButtonCloseClick = this.onButtonCloseClick.bind(this);
  }

  onButtonCloseClick(index) {
    return event => {
      const { delete_alert } = this.props;
      delete_alert(index);
    };
  }

  render() {
  const { alerts } = this.props;
  console.log(alerts);
  return (<div>
    {alerts.map((alert, index) => (
      <Alert key={index} variant={alert.variant} onClose={this.onButtonCloseClick(index)} dismissible>
        <p className="mb-0">{alert.text}</p>
      </Alert>
    ))}
  </div>);
  }

}

const Alerts = connect(mapStateToProps, mapDispatchToProps)(ConnectedAlerts);

export default Alerts;
