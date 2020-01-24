import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';

import {Navbar} from 'react-bootstrap';

import List from './pages/List';

class App extends Component {
    render() {
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/">Weather App</Navbar.Brand>
                </Navbar>
                <Switch>
                    <Route exact path='/' component={List}/>
                </Switch>
            </div>
        );
    }
}

export default App;