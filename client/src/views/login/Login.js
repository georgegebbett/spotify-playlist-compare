import logo from "../../logo.svg";
import React from "react";
import LoginWithSpotify from "../../components/LoginWithSpotify";

export default function Login() {
    const [loginUrl, setLoginUrl] = React.useState("");

    React.useEffect(() => {
        fetch("/api/auth/getLoginUrl")
            .then((res) => res.json())
            .then((data) => setLoginUrl(data.url));
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <a href={loginUrl}>
                    <LoginWithSpotify/>
                </a>
            </header>
        </div>
    );
}
