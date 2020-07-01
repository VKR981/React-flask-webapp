import React, { Component } from 'react'
import { Input, Menu, Container,Segment,Button, Form, Search } from 'semantic-ui-react'
import jwt_decode from 'jwt-decode'
import logout from './functions'
import { Route , withRouter} from 'react-router-dom';
import { createHashHistory } from 'history'
import {loadinganim} from './loading.gif'
export const history = createHashHistory()
class Navbar extends Component {
  constructor(props){
    super(props)
    this.state = { activeItem: 'home',
        loginstatus: false,
      email:'',
    query:'',
  username:'' }

      this.logout=this.logout.bind(this);
      this.handleFormSubmit=this.handleFormSubmit.bind(this);
      this.handleChange=this.handleChange.bind(this);

  }
  

      componentDidMount() {


        
    
        const token = localStorage.getItem('usertoken');
        if(token){
          const decoded = jwt_decode(token)
          this.setState({email:decoded.email,username:decoded.username,loginstatus:true})
        }
        
    
        

      
        
    
      }
    

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleFormSubmit(e,d){
    let url= '/explore/'+this.state.query
    console.log(this.state.query)
    this.props.history.push(url)
  }
  handleChange(e,d){
    this.setState({query:d.value})
    console.log(this.state.query)
  }

  render() {
    const { activeItem } = this.state
    let fixed=false

    return (

    	
    	
    <asd style={{backgroundcolor:'black'}}>
      
      
      <Segment inverted color='black'>
     
    
      <Menu
      inverted 
              fixed={fixed ? 'top' : null}
              
              pointing={!fixed}
              secondary={!fixed}
              size='small'
              
            >
              <Container>
                <Menu.Item as='a' active onClick={res=>{this.props.history.push('/home')}}>
                  Home
                </Menu.Item>
                <Menu.Item as='a'>Recomendations</Menu.Item>
                <Menu.Item as='a'>Latest</Menu.Item>
                <Menu.Item>
                
                </Menu.Item>
                <Menu.Item position='right'>
                <Form onSubmit={this.handleFormSubmit}>
                  
                <Input icon='search' size='small' placeholder='Search...' value={this.state.query} onChange={this.handleChange} >
                <input style={{borderRadius: '17.345px'}} icon='search' />
</Input>
      </Form>
                {this.state.loginstatus&&<Button as='a' inverted={!fixed} style={{ marginLeft: '0.5em' }}>
                    {this.state.username}
                  </Button>}
                  {this.state.loginstatus&&<Button as='a' onClick={res=>{localStorage.clear();this.setState({loginstatus:false}); this.props.history.push('/login')}} inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                    Log out
                  </Button>}
                  {!this.state.loginstatus&&<Button as='a' onClick={res=>{ this.props.history.push('/login')}} inverted={!fixed} style={{ marginLeft: '0.5em' }}>
                    Log in
                  </Button>}
                  {!this.state.loginstatus&&<Button as='a' onClick={res=>{ this.props.history.push('/register')}} inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>}
                </Menu.Item>
              </Container>
            </Menu>
            </Segment>
      </asd>
      

    )
  }

   logout(){
    
    localStorage.removeItem('usertoken');
    this.props.history.push('/login')
}
}


export default withRouter(Navbar)









// import React,{ Component} from 'react';
// import axios from 'axios';
// import Register from './register.js';
// import ReactDOM from 'react-dom';

// class Navbar extends Component {

// 	constructor(props){
// 		super (props);

// 	}

// 	render(){

// 		return()
// 	}


// }