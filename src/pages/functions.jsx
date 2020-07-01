import React from 'react'
import ReactDOM from "react-dom";
import {Router, Route, useHistory, IndexRoute } from "react-router-dom";

export default function  logout(props){
    
    localStorage.removeItem('usertoken');
    
}