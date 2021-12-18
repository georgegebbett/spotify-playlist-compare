import React from "react";
import LoginWithSpotify from "../../components/LoginWithSpotify";

export default function Login(props) {


    return (
        <div className="App">
            <header className="App-header">
                <h1>How much did your taste change between your Spotify Wrappeds? 🤔</h1>
                <br/>
                <LoginWithSpotify spotifyApi={props.spotifyApi}/>
            </header>
        </div>
    );
}
