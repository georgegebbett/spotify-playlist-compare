import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSpotify} from "@fortawesome/free-brands-svg-icons";

import {Fragment} from "react";

import "./LoginWithSpotify.css";


export default function LoginWithSpotify() {
    return (
        <Fragment>
        <span className="spotifyButton">
            <FontAwesomeIcon icon={faSpotify}/>
            {} Login with Spotify
        </span>
        </Fragment>
    )
}
