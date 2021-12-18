import {Fragment, useEffect, useState} from "react";
import axios from 'axios';
import Table from "react-bootstrap/Table";
import {Button, Form, FormCheck} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import WebPlayback from "../../components/WebPlayback";
import "./playlistChoice.css";


export default function PlaylistChoice(props) {

    const [playlists, setPlaylists] = useState(undefined);
    const [selectedPlaylists, setSelectedPlaylists] = useState({p1: "", p2: ""});
    const [compareEnabled, setCompareEnabled] = useState(false);

    const [updateData, setUpdateData] = useState(false);

    const [playbackEnabled] = useState(true);

    let navigate = useNavigate();

    useEffect(() => {
        const getPlaylists = () => {
            if (props.spotifyApi.getAccessToken() === undefined) {
                updateToken();
                setUpdateData(!updateData);
                return;
            }
            props.spotifyApi.getMe()?.then(data => {
                let userId = (data.body.id);
                props.spotifyApi.getUserPlaylists(userId).then(data => {
                    let playlistList = [];

                    let topSongRegExp = /^Your Top Songs (\d+)/;

                    data.body.items.map(playlist => {
                        if (topSongRegExp.test(playlist.name)) {
                            playlistList.push({
                                name: playlist.name,
                                year: topSongRegExp.exec(playlist.name)[1],
                                id: playlist.id,
                                uri: playlist.uri
                            });
                        }
                    })

                    setPlaylists(playlistList);
                })
            });
        }

        const updateToken = () => {
            if (props.spotifyApi.getAccessToken() === undefined) {
                if (localStorage.getItem("SPOTIFY_TOKEN") !== undefined) {
                    props.spotifyApi.setAccessToken(localStorage.getItem("SPOTIFY_TOKEN"));
                }
            }
        }

        getPlaylists();
        updateToken();

    }, [updateData]);

    useEffect(() => {
        if (selectedPlaylists.p1 === selectedPlaylists.p2 || selectedPlaylists.p1 === "" || selectedPlaylists.p2 === "") {
            setCompareEnabled(false);
        } else {
            setCompareEnabled(true);
        }
    }, [selectedPlaylists])



    const handleSubmit = (event) => {

        event.preventDefault();
        navigate(`/compare?p1=${selectedPlaylists.p1}&p2=${selectedPlaylists.p2}`);
    }

    const handleExit = (event) => {
        event.preventDefault();
        navigate("/");
    }

    const handleChange = (event) => {
        setSelectedPlaylists({...selectedPlaylists, [event.target.name]: event.target.value})
    }

    return (
        <Fragment>
            {props.spotifyApi.getAccessToken() !== undefined && playlists !== undefined ? <WebPlayback token={props.spotifyApi.getAccessToken()} uri={playlists[0].uri} playbackEnabled={playbackEnabled}/> : null}
            <div className="playlist-choice-div">
                <div className="title-div">
                    {playbackEnabled ? null : <h1 style={{color: "#E63946"}}>Playback disabled</h1>}
                    <h1 className="login-hero-emoji">🎧🤔</h1>
                    <h1>Here are all your Top Songs playlists! Which two would you like to compare?</h1>
                    <h3>If you expected to see more playlists here, make sure they are saved to your library!</h3>
                    <h5>Choose one playlist 1 and one playlist 2 - then the compare button will appear!</h5>
                </div>
                <br/>
                <Form onSubmit={handleSubmit} onChange={handleChange}>
                    <Table striped hover bordered className="selection-table">
                        <thead>
                            <tr>
                                <td>Year</td>
                                <td>Playlist</td>
                                <td>Playlist 1</td>
                                <td>Playlist 2</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                playlists ? playlists.map(playlist => {
                                    return(
                                        <tr key={playlist.id}>
                                            <td>{playlist.year}</td>
                                            <td>{playlist.name}</td>
                                            <td><FormCheck type="radio" name="p1" value={playlist.id} /></td>
                                            <td><FormCheck type="radio" name="p2" value={playlist.id} /></td>
                                        </tr>
                                    )
                                }) : null
                            }
                        </tbody>
                    </Table>
                </Form>
                <div className="playlist-button-div">
                    <Button className="compare-button" variant="success" type="submit" hidden={!compareEnabled} onClick={handleSubmit}>Compare!</Button>
                    <Button className="compare-button" variant="danger" hidden={!compareEnabled} onClick={handleExit}>Actually I don't want to see this, I already know I have terrible taste</Button>
                </div>
            </div>
        </Fragment>
    )


}
