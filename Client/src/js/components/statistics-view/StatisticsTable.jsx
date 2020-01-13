import React, { Component } from "react";

const requests = [
  { location: "Russia", count: 150 },
  { location: "Poland", count: 121 },
  { location: "France", count: 40 },
  { location: "Great Britain", count: 40 },
  { location: "Germany", count: 24 },
  { location: "Czech Republic", count: 13 },
  { location: "Belarus", count: 5 }
];

class StatisticsTable extends Component {
  state = {};
  render() {
    return (
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Location</th>
            <th scope="col">Requests</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => {
            return (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{request.location}</td>
                <td>{request.count}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default StatisticsTable;
