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

  Field = ({ label, onChange, name, value, type = "text" }) => {
    return (
      <div>
        <label className="control-label">{label}</label>
        <input
          onChange={onChange}
          value={value}
          name={name}
          type={type}
          className="form-control"
        />
      </div>
    );
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4 m-4">
          <form onSubmit={this.onSubmit}>
            <h1>Register!</h1>

            <this.Field
              label="Username"
              onChange={this.onChange}
              value={this.state.username}
              name="username"
            />

            <this.Field
              label="Email"
              onChange={this.onChange}
              value={this.state.email}
              name="email"
              type="email"
            />

            <this.Field
              label="Password"
              onChange={this.onChange}
              value={this.state.password}
              name="password"
              type="password"
            />

            <this.Field
              label="Password Confirmation"
              onChange={this.onChange}
              value={this.state.passwordConfirmation}
              name="passwordConfirmation"
              type="password"
            />

            <div className="form-group m-2">
              <button className="btn btn-primary btn-lg">Sign up</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
