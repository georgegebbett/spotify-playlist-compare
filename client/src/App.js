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

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/playlistChoice" element={<PlaylistChoice/>}/>
                <Route path="/compare" element={<Comparison/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    )

}
export default App;
