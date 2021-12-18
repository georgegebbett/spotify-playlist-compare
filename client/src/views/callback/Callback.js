import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export default function Callback(props) {
    let navigate = useNavigate();
    const [token, setToken] = useState(undefined);
    let location = useLocation();
    const regex = /access_token=(.*?)&/;

    useEffect(() => {
        setToken(location.hash.match(regex)[1]);
    }, []);

    useEffect(() => {
        if (token !== undefined) {
            props.spotifyApi.setAccessToken(token);
            localStorage.setItem("SPOTIFY_TOKEN", token);
            navigate('/playlistChoice');
        }
    }, [token])

    return null;
}
