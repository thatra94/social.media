import React from "react";
import HeaderBar from "./headerbar";
import { withRouter } from "react-router-dom";

//MOST CODE TAKEN FROM LESSON 08 AND MODIFIED TO FIT MY APP
class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: "",
            surname: "",
            hometown: "",
            dateOfBirth: "",
            password: "",
            confirm: "",
            errorMsg: null
        };

    }

    onUserIdChange = (event) => {
        this.setState({ userId: event.target.value, errorMsg: null });
    };
    onSurnameChange = (event) => {
        this.setState({ surname: event.target.value, errorMsg: null });
    };

    onHometownChange = (event) => {
        this.setState({ hometown: event.target.value, errorMsg: null });
    };
    onDateOfBirthChange = (event) => {
        this.setState({ dateOfBirth: event.target.value, errorMsg: null });
    };

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value, errorMsg: null });
    };

    onConfirmChange = (event) => {
        this.setState({ confirm: event.target.value, errorMsg: null });
    };

    doSignUp = async () => {
        const { userId, surname, hometown, dateOfBirth, password, confirm } = this.state;

        if (confirm !== password) {
            this.setState({ errorMsg: "Passwords do not match" });
            return;
        }

        const url = "/api/signup";

        const payload = { userId: userId, surname: surname, hometown: hometown, dateOfBirth: dateOfBirth, password: password };

        let response;

        try {
            response = await fetch(url, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
        } catch (err) {
            this.setState({ errorMsg: "Failed to connect to server: " + err });
            return;
        }

        if (response.status === 400) {
            this.setState({ errorMsg: "Invalid userId/password" });
            return;
        }

        if (response.status !== 201) {
            this.setState({
                errorMsg:
                    "Error when connecting to server: status code " + response.status
            });
            return;
        }

        this.setState({ errorMsg: null });
        this.props.updateLoggedInUserId(userId);
        this.props.updateLoggedInSurname(surname);
        this.props.updateLoggedInHometown(hometown);
        this.props.updateLoggedInDateOfBirth(dateOfBirth);
        this.props.history.push("/");
    };

    render() {
        let error = <div />;
        if (this.state.errorMsg !== null) {
            error = (
                <div className="errorMsg">
                    <p>{this.state.errorMsg}</p>
                </div>
            );
        }

        let confirmMsg = "Ok";
        if (this.state.confirm !== this.state.password) {
            confirmMsg = "Not matching";
        }

        return (
            <div>
                <HeaderBar
                    userId={this.props.userId}
                    surname={this.props.surname}
                    updateLoggedInUserId={this.props.updateLoggedInUserId}
                />
                <div className="signupArea">
                    <div>
                        <p>User Id:</p>
                        <input
                            type="text"
                            value={this.state.userId}
                            onChange={this.onUserIdChange}
                        />
                    </div>
                    <div>
                        <p>Surname:</p>
                        <input
                            type="text"
                            value={this.state.surname}
                            onChange={this.onSurnameChange}
                        />
                    </div>
                    <div>
                        <p>Hometown:</p>
                        <input
                            type="text"
                            value={this.state.hometown}
                            onChange={this.onHometownChange}
                        />
                    </div>
                    <div>
                        <p>Date of birth:</p>
                        <input
                            type="date"
                            value={this.state.dateOfBirth}
                            onChange={this.onDateOfBirthChange}
                        />
                    </div>
                    <div>
                        <p>Password:</p>
                        <input
                            type="password"
                            value={this.state.password}
                            onChange={this.onPasswordChange}
                        />
                    </div>
                    <div>
                        <p>Confirm:</p>
                        <input
                            type="password"
                            value={this.state.confirm}
                            onChange={this.onConfirmChange}
                        />
                        <div>{confirmMsg}</div>
                    </div>
                    {error}
                    <div className="btn" onClick={this.doSignUp}>
                        Sign Up
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(SignUp);
