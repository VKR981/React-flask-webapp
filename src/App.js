import React from 'react';
import './App.css';



import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import BookMain from './pages/BookMain';
import Bookitem from './pages/Book_item'
import Login from './pages/Login'
import Register from './pages/register';

function App(props) {
  return (
    <div>

      <Router>

        <Route exact path="/reviews/:isbn/:title/:author/:avgrating/:totalratings/:reviews/:year" component={BookMain} />
        <Route exact path="/explore/:query" component={Bookitem} />
        <Route exact path="/home" component={Bookitem} />
        <Route exact path="/" component={Bookitem} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Router>
    </div>

  );
}

export default App;
