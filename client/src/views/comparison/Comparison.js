import {useSearchParams} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import {PlaylistTable} from "../../components/playlistTable";
import axios from "axios";
import JSConfetti from "js-confetti";
import "./comparison.css";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export default function Comparison() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedPlaylists, setSelectedPlaylists] = useState({});
    const [playlist1, setPlaylist1] = useState();
    const [playlist2, setPlaylist2] = useState();
    const [stats, setStats] = useState();
    const [loading, setLoading] = useState(true);

    const confetti = new JSConfetti();

    const navigate = useNavigate();

    useEffect(() => {
        setSelectedPlaylists({p1: searchParams.get("p1"), p2: searchParams.get("p2")});

    }, [searchParams]);

    useEffect(() => {
        if (selectedPlaylists.p1 === undefined || selectedPlaylists.p2 === undefined) return;
        const getComparisonResult = async () => {
            axios.get(`/api/app/playlistComparison?p1=${selectedPlaylists.p1}&p2=${selectedPlaylists.p2}`)
                .then(data => {
                    console.log(data);
                    setPlaylist1(data.data.playlist1);
                    setPlaylist2(data.data.playlist2);
                    setStats(data.data.stats);
                    setLoading(false);
                    confetti.addConfetti({
                        confettiRadius: 6,
                        confettiNumber: 500,
                    });
                })
        }

        getComparisonResult();
    }, [selectedPlaylists]);

    const resetClickHandler = (event) => {
      event.preventDefault();
      navigate("/");
    }

    return (
        <div className="App">
            {loading ? null :
                <Fragment>
                    <h1>The results are in!</h1>
                    <h2>{stats ? `${stats.sameSongs} songs are on both of these lists` : null}</h2>
                    <Button variant="primary" onClick={resetClickHandler}>Back to the beginning!</Button>
                    <div className="table-container">
                        <PlaylistTable playlistData={playlist1}/>
                        <PlaylistTable playlistData={playlist2}/>
                    </div>
                </Fragment>
            }
        </div>
    )
}
