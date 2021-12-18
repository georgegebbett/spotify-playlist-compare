import {useLocation, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
const queryString = require("query-string");

export default function Callback(props) {
    let navigate = useNavigate();
    const [params, setParams] = useSearchParams();
    const [token, setToken] = useState(undefined);
    let location = useLocation();
    const regex = /access_token=(.*?)&/;



    useEffect(() => {
        setToken(location.hash.match(regex)[1]);
        // props.spotifyApi.setAccessToken(token);


    }, []);

    useEffect(() => {
        if (token !== undefined) {
            props.spotifyApi.setAccessToken(token);
            console.log(`token set to ${token}`);
            navigate('/playlistChoice');
        }
    }, [token])

    return null;
}
