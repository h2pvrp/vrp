import React, { Component } from "react";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state);
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Register!</h1>

        <div>
          <label className="control-label">Username</label>
          <input
            onChange={this.onChange}
            value={this.state.username}
            name="username"
            className="form-control"
          />
        </div>

        <div>
          <label className="control-label">Email</label>
          <input
            onChange={this.onChange}
            value={this.state.email}
            name="email"
            type="email"
            className="form-control"
          />
        </div>

        <div>
          <label className="control-label">Password</label>
          <input
            onChange={this.onChange}
            value={this.state.password}
            name="password"
            type="password"
            className="form-control"
          />
        </div>

        <div>
          <label className="control-label">Password Confirmation</label>
          <input
            onChange={this.onChange}
            value={this.state.passwordConfirmation}
            name="passwordConfirmation"
            type="password"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <button className="btn btn-primary btn-lg">Sign up</button>
        </div>
      </form>
    );
  }
}

export default Register;
