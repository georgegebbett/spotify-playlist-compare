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

    const {spotifyApi} = props;

    const confetti = new JSConfetti();

    const navigate = useNavigate();

    useEffect(() => {
        setSelectedPlaylists({p1: searchParams.get("p1"), p2: searchParams.get("p2")});

    }, [searchParams]);

    useEffect(() => {
        if (selectedPlaylists.p1 === undefined || selectedPlaylists.p2 === undefined) return;

        const comparePlaylists = async () => {
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
                                confettiRadius: 6,
                                confettiNumber: 500,
                            });
                        })
                        .catch(e => console.log("error"));
                })
                .catch(e => console.log("error"));
        }

        comparePlaylists();
    }, [selectedPlaylists]);

    const resetClickHandler = (event) => {
      event.preventDefault();
      navigate("/");
    }

    return (
        <div className="App">
            {loading ?
                <Fragment>
                    <h1>Loading!</h1>
                </Fragment>
                :
                <Fragment>
                    <h1>The results are in!</h1>
                    <h2>{comparisonResult ? `${comparisonResult.stats.sameSongs} songs are on both of these lists` : null}</h2>
                    <Button variant="primary" onClick={resetClickHandler}>Back to the beginning!</Button>
                    <div className="table-container">
                        <PlaylistTable playlistData={comparisonResult.playlist1}/>
                        <PlaylistTable playlistData={comparisonResult.playlist2}/>
                    </div>
                </Fragment>
            }
        </div>
    )
}
