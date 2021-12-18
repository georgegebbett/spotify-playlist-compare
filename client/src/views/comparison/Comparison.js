import {useSearchParams} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import {PlaylistTable} from "../../components/PlaylistTable";
import JSConfetti from "js-confetti";
import "./comparison.css";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export default function Comparison(props) {
    const [searchParams] = useSearchParams();
    const [selectedPlaylists, setSelectedPlaylists] = useState({});
    const [comparisonResult, setComparisonResult] = useState(undefined);
    const [loading, setLoading] = useState(true);

    const [updateData, setUpdateData] = useState(false);

    const {spotifyApi} = props;

    const confetti = new JSConfetti();

    const navigate = useNavigate();

    useEffect(() => {
        setSelectedPlaylists({p1: searchParams.get("p1"), p2: searchParams.get("p2")});

    }, [searchParams]);

    useEffect(() => {
        if (selectedPlaylists.p1 === undefined || selectedPlaylists.p2 === undefined) return;

        const comparePlaylists = async () => {

            if (props.spotifyApi.getAccessToken() === undefined) {
                updateToken();
                setUpdateData(!updateData);
                return;
            }

            let playlistResult = {stats: {sameSongs: 0}, playlist1: {name: "", tracks: []}, playlist2: {name: "", tracks: []}};

            playlistResult.playlist1.name = (await spotifyApi.getPlaylist(selectedPlaylists.p1)).body.name;
            playlistResult.playlist2.name = (await spotifyApi.getPlaylist(selectedPlaylists.p2)).body.name;

            spotifyApi.getPlaylistTracks(selectedPlaylists.p1)
                .then(data => {
                    let index = 0;
                    playlistResult.playlist1.tracks = data.body.items.map(item => {
                        index++;
                        return {
                            index: index,
                            id: item.track.id,
                            name: item.track.name,
                            artist: item.track.artists[0].name,
                            inOtherList: false
                        }
                    })
                    spotifyApi.getPlaylistTracks(selectedPlaylists.p2)
                        .then(data => {
                            let index = 0;
                            playlistResult.playlist2.tracks = data.body.items.map(item => {
                                index++;
                                return {
                                    index: index,
                                    id: item.track.id,
                                    name: item.track.name,
                                    artist: item.track.artists[0].name,
                                    inOtherList: false
                                }
                            })
                            for (let track of playlistResult.playlist1.tracks) {
                                for (let track2 of playlistResult.playlist2.tracks) {
                                    if (track.id === track2.id) {
                                        track.inOtherList = true;
                                        track2.inOtherList = true;
                                        playlistResult.stats.sameSongs++;
                                    }
                                }
                            }

                            setComparisonResult(playlistResult);
                            setLoading(false);
                            confetti.addConfetti({
                                emojiSize: 80,
                                confettiNumber: 500,
                                emojis: ["🎼", "🪗", "🎸", "🎹", "🎺", "🎻", "🪕", "🥁", "🪘", "🎤"]
                            });
                        })
                        .catch(e => console.log("error"));
                })
                .catch(e => console.log("error"));
        }

        const updateToken = () => {
            if (props.spotifyApi.getAccessToken() === undefined) {
                if (localStorage.getItem("SPOTIFY_TOKEN") !== undefined) {
                    props.spotifyApi.setAccessToken(localStorage.getItem("SPOTIFY_TOKEN"));
                }
            }
        }

        updateToken();
        comparePlaylists();
    }, [selectedPlaylists, updateData]);

    const resetClickHandler = (event) => {
      event.preventDefault();
      navigate("/");
    }

    const changeListClickHandler = (event) => {
        event.preventDefault();
        navigate("/playlistChoice");
    }

    return (
        <div className="comparison-container">
            {loading ?
                <Fragment>
                    <div className="loading-div">
                        <h1>🥁 Loading... 🥁</h1>
                        <br/>
                        <h3>Jesus your music is awful 🤢</h3>
                    </div>
                </Fragment>
                :
                <Fragment>
                    <div className="title-div">
                        <h1>The results are in!</h1>
                        <h2>{comparisonResult ? `${comparisonResult.stats.sameSongs} songs (the red ones) are on both of these lists` : null}</h2>
                        <h4>{comparisonResult ? `This basically means you're only ${100 - comparisonResult.stats.sameSongs}% original...` : null}</h4>
                    </div>
                    <div className="button-div">
                        <Button className="comparison-button" variant="primary" onClick={changeListClickHandler}>Try some other playlists!</Button>
                        <Button className="comparison-button" variant="danger" onClick={resetClickHandler}>Get me out of here!</Button>
                    </div>
                    <div className="table-container">
                        <PlaylistTable playlistData={comparisonResult.playlist1}/>
                        <PlaylistTable playlistData={comparisonResult.playlist2}/>
                    </div>
                </Fragment>
            }
        </div>
    )
}
