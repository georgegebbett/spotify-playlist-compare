const express = require("express");

const SpotifyWebApi = require("spotify-web-api-node");

const SPOTIFY_SCOPES = ['playlist-read-private']
const REDIRECT_URI = 'http://localhost:3001/api/auth/loginCallback'
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_STATE = 'state';


const PORT = process.env.PORT || 3001;

const app = express();

const spotifyApi = new SpotifyWebApi({
    redirectUri: REDIRECT_URI,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET
});


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

    res.redirect("http://localhost:3000/callback")
})

app.get("/api/app/userPlaylists", ((req, res) => {
    spotifyApi.getMe()?.then(data => {
        let userId = (data.body.id);
        spotifyApi.getUserPlaylists(userId).then(data => {
            console.log(data.body.items);
            let playlistList = [];

            let topSongRegExp = /^Your Top Songs (\d+)/;

            data.body.items.map(playlist => {
                if (topSongRegExp.test(playlist.name)) {
                    playlistList.push({
                        name: playlist.name,
                        year: topSongRegExp.exec(playlist.name)[1],
                        id: playlist.id
                    });
                }
            })

            res.json(playlistList);
        })
    });
}))


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
