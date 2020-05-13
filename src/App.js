import React, { Component } from "react";
import "./App.css";

//to check if the email is of the right format  
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      email: null,
      password: null,
      confpass: null,
      passhint: null,
      isChecked: false,
      formErrors: {
        name: "",
        email: "",
        password: "",
        confpass: "",
        passhint: "",
        isChecked: ""
      }
    };
  }

  handleChecked = e => {
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    this.setState({ isChecked: !this.state.isChecked });
    switch (name) {
      case "isChecked":
        formErrors.isChecked =
          value === false ? "Must agree to complete Signup" : "";
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    // alerts if the fields are not filled
    if (this.state.name == null) {
      alert('Please enter your Name');
    }

    if (this.state.password == null) {
      alert('Please enter a valid Password');
    }

    if (this.state.confpass == null) {
      alert('Please Confirm the password');
    }

    if (this.state.passhint == null) {
      alert('Enter a Password Hint so you dont forget it');
    }

    if (this.state.isChecked == false) {
      alert('You need to agree to the T&C to complete Signup');
    }


    // logs the details in console if the form is valid else shows error
    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        Name: ${this.state.name}
        Email: ${this.state.email}
        Password: ${this.state.password}
        Confirm Password: ${this.state.confpass}
        Password Hint: ${this.state.passhint}
        Checkbox: ${this.state.isChecked}
              `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    // validation of the form
    switch (name) {
      case "name":
        if (value.trim().indexOf(' ') == -1) {
          formErrors.name = "Atleast two words";
        }
        else if (value[0] !== value[0].toUpperCase()) {
          formErrors.name = "First letter should be Uppercase"
        }
        else {
          formErrors.name = "";
        }
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      case "confpass":
        formErrors.confpass =
          value !== this.state.password ? "Password does not match" : "";
        break;
      case "passhint":
        formErrors.passhint =
          value === this.state.password ? "Hint cannot be same as the password" : "";
        break;

      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Sign-Up</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="name">
              <label htmlFor="name">Name</label>
              <input
                className={formErrors.name.length > 0 ? "error" : null}
                placeholder="Full Name"
                type="text"
                name="name"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.name.length > 0 && (
                <span className="errorMessage">{formErrors.name}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="confpassword">
              <label htmlFor="password">Confirm Password</label>
              <input
                className={formErrors.confpass.length > 0 ? "error" : null}
                placeholder="Confirm Password"
                type="password"
                name="confpass"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.confpass.length > 0 && (
                <span className="errorMessage">{formErrors.confpass}</span>
              )}
            </div>
            <div className="passhint">
              <label htmlFor="lastName">Password Hint</label>
              <input
                className={formErrors.passhint.length > 0 ? "error" : null}
                placeholder="Password Hint"
                type="text"
                name="passhint"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.passhint.length > 0 && (
                <span className="errorMessage">{formErrors.passhint}</span>
              )}
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                name="isChecked"
                noValidate
                onChange={this.handleChange}
              />I agree to the T&C
              {(
                <span className="errorMessage">{formErrors.isChecked}</span>
              )}
            </div>
            <div className="createAccount">
              <button type="submit">Sign-Up</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;