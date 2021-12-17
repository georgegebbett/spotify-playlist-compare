import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSpotify} from "@fortawesome/free-brands-svg-icons";

import React, {Fragment} from "react";

import "./LoginWithSpotify.css";


export default function LoginWithSpotify() {

    const [loginUrl, setLoginUrl] = React.useState("");

    React.useEffect(() => {
        fetch("/api/auth/getLoginUrl")
            .then((res) => res.json())
            .then((data) => setLoginUrl(data.url));
    }, []);

    const handleClick = () => {
        window.location = loginUrl;
    }

    return (
        <Fragment>
        <span className="spotifyButton" onClick={handleClick}>
            <FontAwesomeIcon icon={faSpotify}/>
            {} Login with Spotify
        </span>
        </Fragment>
    )
}
