import {Fragment} from "react";
import Table from "react-bootstrap/Table";

export function PlaylistTable(props) {
    const {playlistData} = props;

    return (
        <Fragment>
            <Table hover bordered size="sm" className="playlist-table">
                <thead>
                    <tr>
                        <th colSpan="3">{playlistData.name}</th>
                    </tr>
                    <tr>
                        <th>#</th>
                        <th>Track name</th>
                        <th>Artist</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        playlistData ?
                            playlistData.tracks.map(track => {
                                return (
                                    <tr key={track.id} className={track.inOtherList ? "in-other-row" : null}>
                                        <td>{track.index}</td>
                                        <td>{track.name}</td>
                                        <td>{track.artist}</td>
                                    </tr>
                                )
                            })
                            : null
                    }
                </tbody>
            </Table>
        </Fragment>
    )

}
