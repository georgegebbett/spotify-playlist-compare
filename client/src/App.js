import './App.css';
import React from "react";

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import Login from "./views/login/Login";
import Comparison from "./views/comparison/Comparison";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/callback" element={<Comparison/>}/>
            </Routes>
        </Router>
    )

}
export default App;
