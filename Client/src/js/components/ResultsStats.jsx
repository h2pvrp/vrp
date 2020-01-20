import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap'

import {
  set_result_visibility,
} from '../actions'

const mapStateToProps = state => ({
  results: state.results,
})

const mapDispatchToProps = dispatch => ({
  set_result_visibility: (index, isVisible) => dispatch(set_result_visibility(index, isVisible)),
});

class ConnectedResultsStats extends Component {
  constructor(props) {
    super(props);
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
  }


  onCheckboxChange(index) {
    return event => {
      const { set_result_visibility } = this.props;
      set_result_visibility(index, event.target.checked);
    }
  }

  render() {
    const { results } = this.props;
    console.log(results);

    if(results.length < 1) {
      return (<div><small>No results yet.</small></div>);
    }

    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Worker</th>
              <th>Computation Time</th>
              <th>Combined Length</th>
              <th>Longest Route Length</th>
              <th>Longest Route Time</th>
              <th>Average Route</th>
              <th>Hide?</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <th>{result.name}</th>
                <td>{result.computationTime} <em>ms</em></td>
                <td>{result.combinedLength} <em>km</em></td>
                <td>{result.longestRouteLength} <em>km</em></td>
                <td>{result.longestRouteTime} <em>min</em></td>
                <td>{result.averageRoute} <em>km</em></td>
                <td>
                  <input
                    type="checkbox"
                    className="form-check-input ml-0"
                    id={index}
                    onChange={this.onCheckboxChange(index)}
                  ></input>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

      </div>
    );
  }
};

const ResultsStats = connect(mapStateToProps, mapDispatchToProps)(ConnectedResultsStats);

export default ResultsStats;
