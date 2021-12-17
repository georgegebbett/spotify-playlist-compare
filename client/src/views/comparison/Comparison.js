import {Fragment, useEffect, useState} from "react";
import axios from 'axios';


export default function Comparison() {

    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const getPlaylists = async () => {
            const {data} = await axios.get('/api/app/userPlaylists');
            console.log(data);
            setPlaylists(data);
        }

        getPlaylists();

        console.log(playlists);
    }, [])

    return (
        <Fragment>
            <p>
                The playlists are:
            </p>
            <br/>
            {
                playlists ? playlists.map(playlist => {
                    return(
                        <p key={playlist.id}>
                            {playlist.year + ": " + playlist.name}
                        </p>
                    )
                }) : null
            }
        </Fragment>
    )


}
