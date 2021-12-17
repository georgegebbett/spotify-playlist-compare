const express = require("express");
const cors = require("cors");

const SpotifyWebApi = require("spotify-web-api-node");
const path = require("path");

const SPOTIFY_SCOPES = ['playlist-read-private', 'streaming', 'user-modify-playback-state']
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

const PLAYLIST_CHOICE_URL = process.env.PLAYLIST_CHOICE



const SPOTIFY_STATE = 'state';

const PORT = process.env.PORT || 3001;


const app = express();

const spotifyApi = new SpotifyWebApi({
    redirectUri: REDIRECT_URI,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET
});

app.use(cors());
app.use(express.json()); // Recognize Request Objects as JSON objects
app.use(express.static('build')); // serve static files (css & js) from the 'public' directory


app.get("/api/auth/getLoginUrl", (req, res) => {
    let url = spotifyApi.createAuthorizeURL(SPOTIFY_SCOPES, SPOTIFY_STATE);

    res.json({url: url});
})

app.get("/api/auth/loginCallback", (req, res) => {
    let code = req.query.code;
    console.log(code);

    spotifyApi.authorizationCodeGrant(code).then((data) => {

        console.log('The token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);
        console.log('The refresh token is ' + data.body['refresh_token']);

        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.setRefreshToken(data.body['refresh_token']);

        }
    )

    res.redirect(PLAYLIST_CHOICE_URL)
})

app.get("/api/auth/spotifyToken", ((req, res) => {
    res.send(spotifyApi.getAccessToken());
}))

app.get("/api/app/userPlaylists", ((req, res) => {
    spotifyApi.getMe()?.then(data => {
        let userId = (data.body.id);
        spotifyApi.getUserPlaylists(userId).then(data => {
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

            res.json(playlistList);
        })
    });
}))

app.get("/api/app/playlistSongs", ((req, res) => {
    spotifyApi.getPlaylistTracks(req.query.playlist)
        .then(data => {
            let resArr = data.body.items.map(item => {return {id: item.track.id, name: item.track.name, artist: item.track.artists[0].name}})
            console.log(resArr.length);
            res.json(resArr);
        })
        .catch(e => console.log(e));
}))

app.get("/api/app/playlistComparison", (async (req, res) => {
    let playlistResult = {stats: {sameSongs: 0}, playlist1: {name: "", tracks: []}, playlist2: {name: "", tracks: []}};

    console.log(req.query)

    playlistResult.playlist1.name = (await spotifyApi.getPlaylist(req.query.p1)).body.name;
    playlistResult.playlist2.name = (await spotifyApi.getPlaylist(req.query.p2)).body.name;

    spotifyApi.getPlaylistTracks(req.query.p1)
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
            spotifyApi.getPlaylistTracks(req.query.p2)
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

                    res.json(playlistResult);
                })
                .catch(e => console.log("error"));
        })
        .catch(e => console.log("error"));




}))

app.get("/api/app/playlistName", ((req, res) => {
    spotifyApi.getPlaylist(req.query.playlist)
        .then(data => {
            res.json({name: data.body.name});
        })
        .catch(e => console.log(e));
}))

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
