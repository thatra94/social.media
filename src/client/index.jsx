import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import {Home} from "./home";
import Login from "./login";
import SignUp from "./signup";
import Search from "./search";

//SOME CODE SNIPPETS FROM LESSON 08 WITH ADDED NEW CODE
export class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            surname: null,
            hometown: null,
            dateOfBirth: null
        };
    }

    updateLoggedInUserId = (userId) => {
        this.setState({userId: userId});
    };

    updateLoggedInSurname = (surname) => {
        this.setState({surname: surname});
    }
    updateLoggedInHometown = (hometown) => {
        this.setState({hometown: hometown});
    }

    updateLoggedInDateOfBirth = (dateOfBirth) => {
        this.setState({dateOfBirth: dateOfBirth});
    };

    notFound() {

        return (
            <div>
                <h2>NOT FOUND: 404</h2>
                <p>
                    ERROR: the page you requested in not available.
                </p>
            </div>
        );

    };

    render() {

        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path="/login"
                               render={props => <Login {...props}
                                                       userId={this.state.userId}
                                                       surname={this.state.surname}
                                                       hometown={this.state.hometown}
                                                       dateOfBirth={this.state.dateOfBirth}
                                                       updateLoggedInUserId = {this.updateLoggedInUserId}
                                                       updateLoggedInSurname = {this.updateLoggedInSurname}
                                                       updateLoggedInHometown = {this.updateLoggedInHometown}
                                                       updateLoggedInDateOfBirth = {this.updateLoggedInDateOfBirth}
                               />}/>
                        <Route exact path="/signup"
                               render={props => <SignUp {...props}
                                                        userId={this.state.userId}
                                                        surname={this.state.surname}
                                                        hometown={this.state.hometown}
                                                        dateOfBirth={this.state.dateOfBirth}
                                                        updateLoggedInUserId = {this.updateLoggedInUserId}
                                                        updateLoggedInSurname = {this.updateLoggedInSurname}
                                                        updateLoggedInHometown = {this.updateLoggedInHometown}
                                                        updateLoggedInDateOfBirth = {this.updateLoggedInDateOfBirth}
                               />}/>
                        <Route exact path="/"
                               render={props => <Home {...props}
                                                      userId={this.state.userId}
                                                      surname={this.state.surname}
                                                      hometown={this.state.hometown}
                                                      dateOfBirth={this.state.dateOfBirth}
                                                      updateLoggedInUserId = {this.updateLoggedInUserId}
                                                      updateLoggedInSurname = {this.updateLoggedInSurname}
                                                      updateLoggedInHometown = {this.updateLoggedInHometown}
                                                      updateLoggedInDateOfBirth = {this.updateLoggedInDateOfBirth}
                               />}/>
                        <Route exact path="/search"
                               render={props => <Search {...props}
                                                      userId={this.state.userId}
                                                      surname={this.state.surname}
                                                      hometown={this.state.hometown}
                                                      dateOfBirth={this.state.dateOfBirth}
                                                      updateLoggedInUserId = {this.updateLoggedInUserId}
                                                      updateLoggedInSurname = {this.updateLoggedInSurname}
                                                      updateLoggedInHometown = {this.updateLoggedInHometown}
                                                      updateLoggedInDateOfBirth = {this.updateLoggedInDateOfBirth}
                               />}/>

                        <Route component={this.notFound}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}


ReactDOM.render(<App/>, document.getElementById("root"));
