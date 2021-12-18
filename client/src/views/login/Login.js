import React, {useEffect, useState} from "react";
import LoginWithSpotify from "../../components/LoginWithSpotify";

import "./login.css";

export default function Login(props) {

    const [currentEmoji, setCurrentEmoji] = useState("🎸");
    const EMOJI_LIST =  ["🎼", "🪗", "🎸", "🎹", "🎺", "🎻", "🪕", "🥁", "🪘", "🎤"]



    useEffect(() => {

        const changeEmoji = () => {
            let emojiIndex = Math.floor(Math.random() * (EMOJI_LIST.length));
            setCurrentEmoji(EMOJI_LIST[emojiIndex]);
        }

        setInterval(changeEmoji, 1500);

    }, [])


    return (
        <div className="login-div">
            <h1 className="login-hero-emoji">{currentEmoji}</h1>
            <h1>How much did your taste <i>really</i> change between your Spotify Wrappeds? 🤔</h1>
            <h2>Did you actually manage to listen to any new music, or are you still clinging to your comfort albums?</h2>
            <h3>Why don't we find out?</h3>
            <br/>
            <LoginWithSpotify spotifyApi={props.spotifyApi}/>
        </div>
    );
}
