import {Fragment, useEffect, useState} from "react";
import axios from 'axios';
import Table from "react-bootstrap/Table";
import {Button, Form, FormCheck} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import WebPlayback from "../../components/WebPlayback";


export default function PlaylistChoice(props) {

    const [playlists, setPlaylists] = useState(undefined);
    const [selectedPlaylists, setSelectedPlaylists] = useState({p1: "", p2: ""});
    const [compareEnabled, setCompareEnabled] = useState(false);
    const [spotifyToken, setSpotifyToken] = useState(undefined);

    let navigate = useNavigate();

    useEffect(() => {
        const getPlaylists = async () => {
            const {data} = await axios.get('/api/app/userPlaylists');
            console.log(data);
            setPlaylists(data);
        }

        const newPlaylists = () => {
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

        const getToken = async () => {
            const {data} = await axios.get('/api/auth/spotifyToken');
            console.log(data);
            setSpotifyToken(data);
        }

        // getPlaylists();
        newPlaylists();
        getToken();

    }, []);

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

    const handleChange = (event) => {
        setSelectedPlaylists({...selectedPlaylists, [event.target.name]: event.target.value})
    }

    return (
        <Fragment>
            {spotifyToken !== undefined && playlists !== undefined ? <WebPlayback token={props.spotifyApi.getAccessToken()} uri={playlists[0].uri}/> : null}
            <div className="App">
                <h1>Here are all your Top Songs playlists! Which two would you like to compare?</h1>
                <h3>If you expected to see more playlists here, make sure they are saved to your library!</h3>
                <br/>
                <Form onSubmit={handleSubmit} onChange={handleChange}>
                    <Table striped hover bordered>
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
                    <Button variant="primary" type="submit" disabled={!compareEnabled}>Compare!</Button>
                </Form>
            </div>
        </Fragment>
    )


}
