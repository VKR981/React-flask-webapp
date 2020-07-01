import React, { Component } from 'react';
import axios from 'axios';
import Login from './Login';
import ReactDOM from 'react-dom';
import { Segment } from 'semantic-ui-react'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: "",
      pwd: "",
      cpwd: "",
      error: ""


    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }


  handleChange(event) {
    // console.log(event.target);
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleSubmit(event) {

    console.log(event.target);

    const { username, email, pwd, cpwd } = this.state;

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", pwd);
    formData.append("cpassword", cpwd);
    formData.append("X-CSRFToken", "ghjgjhg");

    const formDatatoken = new FormData();
    formDatatoken.append("X-CSRFToken", "ghjgjhg");





    if (username === '' || email === '' || pwd === '' || cpwd === '') {
      alert("please fill all the fields");

    }
    else if (pwd !== cpwd) {
      alert("passwords do not match");
    }
    else if (pwd.length < 8) {
      alert("passwords should be atleast 8 characters");
    }
    else {



      axios.post("/api/register", formData, formDatatoken).then(res => { alert(res.data); });
    }


  }



  render() {



    return (
      <div>
        <style>
          {`
       body {
        background-image: url(${require("../book.jpg")}); !important;
  background-size: 100% 120%; !important;
      }
      
    }
    `}
        </style>
        <Segment basic style={{ margin: '6em' }} />
        <div id="loginform" class="wrapper fadeInDown my-auto">
          <div >
            <div id="formContent">



              <div class="fadeIn first">

              </div>


              <form onSubmit={e => { e.preventDefault(); this.handleSubmit(e); }}>
                <input type="username" value={this.state.username} onChange={this.handleChange} id="login" class="fadeIn second" name="username" placeholder="User name"></input>
                <input type="email" value={this.state.email} onChange={this.handleChange} id="login" class="fadeIn second mt-4" name="email" placeholder="Email"></input>
                <input type="password" value={this.state.pwd} onChange={this.handleChange} id="password" class="fadeIn third" name="pwd" placeholder="password"></input>
                <input type="password" value={this.state.cpwd} onChange={this.handleChange} id="password" class="fadeIn third" name="cpwd" placeholder=" confirm password"></input>
                <input type="submit" onSubmit={e => { e.preventDefault(); this.handleSubmit(e); }} class="fadeIn fourth" value="Register"></input>
              </form>


              <div id="formFooter">

                <a class="underlineHover" href="/login" >Login</a>
              </div>

            </div>
          </div>
        </div>

      </div>
    );
  }

  switchform() {

    ReactDOM.render(<Login />, document.getElementById('root'))
  }

}

export default Register;
