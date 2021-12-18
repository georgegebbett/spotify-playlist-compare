import React, { useState, useEffect } from 'react';
import {Button, Modal} from "react-bootstrap";

function WebPlayback(props) {

    const [player, setPlayer] = useState(undefined);
    const {token} = props;
    const [show, setShow] = useState(true);

    const {playbackEnabled} = props;

    useEffect(() => {

        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {

            const player = new window.Spotify.Player({
                name: 'Wrapped Comparer',
                getOAuthToken: cb => { cb(props.token); },
                volume: 0.5
            });

            const play = ({
                              spotify_uri,
                              playerInstance: {
                                  _options: {
                                      getOAuthToken
                                  }
                              },
                              device_id
                          }) => {
                getOAuthToken(access_token => {
                    const trackNo = Math.floor(Math.random() * 100);
                    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
                        method: 'PUT',
                        body: JSON.stringify({
                            context_uri: spotify_uri,
                            offset: {
                                position: trackNo
                            }
                        }),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                    });
                });
            };

            setPlayer(player);

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);

                player.getCurrentState().then(state => {
                    if (!state) {
                        if (playbackEnabled) {
                            play({
                                playerInstance: player,
                                spotify_uri: props.uri,
                                device_id: device_id
                            });
                        }
                    } else {
                        if (state.paused) {
                            player.resume();
                        }
                    }
                })




            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });


            player.connect();

        };
    }, []);


    const handlePlaybackCheck = () => {
        console.log("aaaa");
        player.getCurrentState().then(state => {
            console.log(state);
            if (state.paused) {
                player.resume();
            }
        })
        setShow(false);
        localStorage.setItem("PLAYBACK_INITIATED", "true");
    }



    return (
        <>
            <div className="container">
                <div className="main-wrapper">
                    <Modal
                        show={show}
                        backdrop="static"
                        centered
                    >
                        <Button onClick={handlePlaybackCheck}>Click here to get started</Button>
                    </Modal>
                </div>
            </div>
        </>
    );
}

export default WebPlayback
