import React from "react";
import { Link, withRouter } from "react-router-dom";
import HeaderBar from "./headerbar";

//NOT ORIGINAL CODE
class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: "",
            surname: "test",
            password: "",
            errorMsg: null
        };
    }

    onUserIdChange = (event) => {
        this.setState({ userId: event.target.value });
    };

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value });
    };

    doLogIn = async () => {
        const { userId, password } = this.state;

        const url = "/api/login";

        const payload = { userId: userId, password: password };

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

        if (response.status === 401) {
            this.setState({ errorMsg: "Invalid userId/password" });
            return;
        }

        if (response.status !== 204) {
            this.setState({
                errorMsg:
                    "Error when connecting to server: status code " + response.status
            });
            return;
        }

        this.setState({ errorMsg: null });
        this.props.updateLoggedInUserId(userId);
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
                        <p>Password:</p>
                        <input
                            type="password"
                            value={this.state.password}
                            onChange={this.onPasswordChange}
                        />
                    </div>

                    {error}

                    <div className="loginRegisterArea">
                        <div className="btn" onClick={this.doLogIn}>
                            Log In
                        </div>

                        <Link to={"/signup"}>Register</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);
