import './App.css';
import React from "react";


import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import Login from "./views/login/Login";

import PlaylistChoice from "./views/playlistChoice/PlaylistChoice";
import Comparison from "./views/comparison/Comparison";
import NotFound from "./views/notFound/NotFound";
import Callback from "./views/callback/Callback";
const SpotifyWebApi = require("spotify-web-api-node");

function App() {

    const spotifyApi = new SpotifyWebApi({
        redirectUri: process.env.SPOTIFY_REDIRECT_URI,
        clientId: process.env.SPOTIFY_CLIENT_ID
    });

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login spotifyApi={spotifyApi}/>}/>
                <Route path="/loginCallback" element={<Callback spotifyApi={spotifyApi}/>}/>
                <Route path="/playlistChoice" element={<PlaylistChoice spotifyApi={spotifyApi}/>}/>
                <Route path="/compare" element={<Comparison/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    )

}
export default App;
