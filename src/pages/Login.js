import React, { Component } from 'react';
import axios from 'axios';
import Register from './register.js';
import ReactDOM from 'react-dom';
import './form.css';
import { Container, Header, Segment } from 'semantic-ui-react';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pwd: "",
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

    const { email, pwd } = this.state;

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", pwd);
    formData.append("X-CSRFToken", "ghjgjhg");

    const formDatatoken = new FormData();
    formDatatoken.append("X-CSRFToken", "ghjgjhg");



    console.log('formdata', formData.keys());

    if (email === '' || pwd === '') {
      alert("please fill all the fields");

    }

    else if (pwd.length < 2) {
      alert("passwords should be atleast 8 characters");
    }
    else {



      axios.post("/api/login", formData, formDatatoken).then(res => {
        if (res.data.token) {
          localStorage.setItem('usertoken', res.data.token);
          console.log(res.data.token);
          this.props.history.push('/home')
        }
        else {
          alert('invalid credentials')
        }
      });

    }


  }



  render() {



    return (

      <div >
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
        
        <div id="loginform" class="wrapper fadeInDown my-auto" style={{ marginTop: '4em' }}>
          <div >
            <div id="formContent">



              <div class="fadeIn first">

              </div>


              <form onSubmit={e => { e.preventDefault(); this.handleSubmit(e); }}>
                <input type="email" value={this.state.email} onChange={this.handleChange} id="login" class="fadeIn second" name="email" placeholder="Email"></input>
                <input type="password" value={this.state.pwd} onChange={this.handleChange} id="password" class="fadeIn third" name="pwd" placeholder="password"></input>
                <input type="submit" onSubmit={e => { e.preventDefault(); this.handleSubmit(e); }} class="fadeIn fourth" value="Log In"></input>
              </form>


              <div id="formFooter">
                <a class="underlineHover" href="#">Forgot Password?</a>
                <a class="underlineHover" href="/register" >Sign up</a>
              </div>

            </div>
          </div>
        </div>

      </div>
    );
  }
  switchform() {

    ReactDOM.render(<Register />, document.getElementById('root'))
  }



}

export default Login;
