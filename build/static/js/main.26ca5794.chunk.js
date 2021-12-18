(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{104:function(e,t){},122:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n.n(c),i=n(47),s=n.n(i),r=(n(56),n(12)),o=n(3),l=n(7),j=n(48),d=n(49),u=(n(61),n(1));function b(){var e=a.a.useState(""),t=Object(l.a)(e,2),n=t[0],i=t[1];a.a.useEffect((function(){fetch("/api/auth/getLoginUrl").then((function(e){return e.json()})).then((function(e){return i(e.url)}))}),[]);return Object(u.jsx)(c.Fragment,{children:Object(u.jsxs)("span",{className:"spotifyButton",onClick:function(){window.location=n},children:[Object(u.jsx)(j.a,{icon:d.a})," Login with Spotify"]})})}n(63);function p(e){var t=Object(c.useState)("\ud83c\udfb8"),n=Object(l.a)(t,2),a=n[0],i=n[1],s=["\ud83c\udfbc","\ud83e\ude97","\ud83c\udfb8","\ud83c\udfb9","\ud83c\udfba","\ud83c\udfbb","\ud83e\ude95","\ud83e\udd41","\ud83e\ude98","\ud83c\udfa4"];return Object(c.useEffect)((function(){setInterval((function(){var e=Math.floor(Math.random()*s.length);i(s[e])}),1500)}),[]),Object(u.jsx)("div",{className:"login-div",children:Object(u.jsxs)("header",{className:"App-header",children:[Object(u.jsx)("h1",{className:"login-hero-emoji",children:a}),Object(u.jsxs)("h1",{children:["How much did your taste ",Object(u.jsx)("i",{children:"really"})," change between your Spotify Wrappeds? \ud83e\udd14"]}),Object(u.jsx)("h3",{children:"Why don't we find out?"}),Object(u.jsx)("br",{}),Object(u.jsx)(b,{spotifyApi:e.spotifyApi})]})})}var O=n(13),h=n(2),f=(n(64),n(22)),y=n(123),m=n(15),v=n(124);var x=function(e){var t=Object(c.useState)(void 0),n=Object(l.a)(t,2),a=(n[0],n[1]),i=e.token,s=e.playbackEnabled;return Object(c.useEffect)((function(){var t=document.createElement("script");t.src="https://sdk.scdn.co/spotify-player.js",t.async=!0,document.body.appendChild(t),window.onSpotifyWebPlaybackSDKReady=function(){var t=new window.Spotify.Player({name:"Wrapped Comparer",getOAuthToken:function(t){t(e.token)},volume:.5});a(t),t.addListener("ready",(function(n){var c=n.device_id;console.log("Ready with Device ID",c),s&&function(e){var t=e.spotify_uri,n=e.playerInstance._options.getOAuthToken,c=e.device_id;n((function(e){var n=Math.floor(100*Math.random());fetch("https://api.spotify.com/v1/me/player/play?device_id=".concat(c),{method:"PUT",body:JSON.stringify({context_uri:t,offset:{position:n}}),headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(i)}})}))}({playerInstance:t,spotify_uri:e.uri,device_id:c})})),t.addListener("not_ready",(function(e){var t=e.device_id;console.log("Device ID has gone offline",t)})),t.connect()}}),[]),Object(u.jsx)(u.Fragment,{children:Object(u.jsx)("div",{className:"container",children:Object(u.jsx)("div",{className:"main-wrapper"})})})};n(82);function g(e){var t=Object(c.useState)(void 0),n=Object(l.a)(t,2),a=n[0],i=n[1],s=Object(c.useState)({p1:"",p2:""}),r=Object(l.a)(s,2),j=r[0],d=r[1],b=Object(c.useState)(!1),p=Object(l.a)(b,2),g=p[0],S=p[1],k=Object(c.useState)(!1),T=Object(l.a)(k,2),_=T[0],E=T[1],A=Object(c.useState)(!1),N=Object(l.a)(A,1)[0],C=Object(o.f)();Object(c.useEffect)((function(){var t=function(){void 0===e.spotifyApi.getAccessToken()&&void 0!==localStorage.getItem("SPOTIFY_TOKEN")&&e.spotifyApi.setAccessToken(localStorage.getItem("SPOTIFY_TOKEN"))};!function(){var n;if(void 0===e.spotifyApi.getAccessToken())return t(),void E(!_);null===(n=e.spotifyApi.getMe())||void 0===n||n.then((function(t){var n=t.body.id;e.spotifyApi.getUserPlaylists(n).then((function(e){var t=[],n=/^Your Top Songs (\d+)/;e.body.items.map((function(e){n.test(e.name)&&t.push({name:e.name,year:n.exec(e.name)[1],id:e.id,uri:e.uri})})),i(t)}))}))}(),t()}),[_]),Object(c.useEffect)((function(){j.p1===j.p2||""===j.p1||""===j.p2?S(!1):S(!0)}),[j]);return Object(u.jsxs)(c.Fragment,{children:[void 0!==e.spotifyApi.getAccessToken()&&void 0!==a?Object(u.jsx)(x,{token:e.spotifyApi.getAccessToken(),uri:a[0].uri,playbackEnabled:N}):null,Object(u.jsxs)("div",{className:"playlist-choice-div",children:[Object(u.jsxs)("div",{className:"title-div",children:[N?null:Object(u.jsx)("h1",{style:{color:"#E63946"},children:"Playback disabled"}),Object(u.jsx)("h1",{children:"Here are all your Top Songs playlists! Which two would you like to compare?"}),Object(u.jsx)("h3",{children:"If you expected to see more playlists here, make sure they are saved to your library!"})]}),Object(u.jsx)("br",{}),Object(u.jsxs)(y.a,{onSubmit:function(e){e.preventDefault(),C("/compare?p1=".concat(j.p1,"&p2=").concat(j.p2))},onChange:function(e){d(Object(h.a)(Object(h.a)({},j),{},Object(O.a)({},e.target.name,e.target.value)))},children:[Object(u.jsxs)(f.a,{striped:!0,hover:!0,bordered:!0,className:"selection-table",children:[Object(u.jsx)("thead",{children:Object(u.jsxs)("tr",{children:[Object(u.jsx)("td",{children:"Year"}),Object(u.jsx)("td",{children:"Playlist"}),Object(u.jsx)("td",{children:"Playlist 1"}),Object(u.jsx)("td",{children:"Playlist 2"})]})}),Object(u.jsx)("tbody",{children:a?a.map((function(e){return Object(u.jsxs)("tr",{children:[Object(u.jsx)("td",{children:e.year}),Object(u.jsx)("td",{children:e.name}),Object(u.jsx)("td",{children:Object(u.jsx)(m.a,{type:"radio",name:"p1",value:e.id})}),Object(u.jsx)("td",{children:Object(u.jsx)(m.a,{type:"radio",name:"p2",value:e.id})})]},e.id)})):null})]}),Object(u.jsx)(v.a,{className:"compare-button",variant:"success",type:"submit",hidden:!g,children:"Compare!"})]})]})]})}var S=n(30),k=n.n(S),T=n(16),_=n(50);function E(e){var t=e.playlistData;return Object(u.jsx)(c.Fragment,{children:Object(u.jsxs)(f.a,{striped:!0,hover:!0,bordered:!0,size:"sm",className:"playlist-table",children:[Object(u.jsxs)("thead",{children:[Object(u.jsx)("tr",{children:Object(u.jsx)("th",{colSpan:"3",children:t.name})}),Object(u.jsxs)("tr",{children:[Object(u.jsx)("th",{children:"#"}),Object(u.jsx)("th",{children:"Track name"}),Object(u.jsx)("th",{children:"Artist"})]})]}),Object(u.jsx)("tbody",{children:t?t.tracks.map((function(e){return Object(u.jsxs)("tr",{className:e.inOtherList?"table-warning":null,children:[Object(u.jsx)("td",{children:e.index}),Object(u.jsx)("td",{children:e.name}),Object(u.jsx)("td",{children:e.artist})]},e.id)})):null})]})})}var A=n(51);n(84);function N(e){var t=Object(r.b)(),n=Object(l.a)(t,1)[0],a=Object(c.useState)({}),i=Object(l.a)(a,2),s=i[0],j=i[1],d=Object(c.useState)(void 0),b=Object(l.a)(d,2),p=b[0],O=b[1],h=Object(c.useState)(!0),f=Object(l.a)(h,2),y=f[0],m=f[1],x=e.spotifyApi,g=new A.a,S=Object(o.f)();Object(c.useEffect)((function(){j({p1:n.get("p1"),p2:n.get("p2")})}),[n]),Object(c.useEffect)((function(){if(void 0!==s.p1&&void 0!==s.p2){var e=function(){var e=Object(_.a)(k.a.mark((function e(){var t;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={stats:{sameSongs:0},playlist1:{name:"",tracks:[]},playlist2:{name:"",tracks:[]}},e.next=3,x.getPlaylist(s.p1);case 3:return t.playlist1.name=e.sent.body.name,e.next=6,x.getPlaylist(s.p2);case 6:t.playlist2.name=e.sent.body.name,x.getPlaylistTracks(s.p1).then((function(e){var n=0;t.playlist1.tracks=e.body.items.map((function(e){return{index:++n,id:e.track.id,name:e.track.name,artist:e.track.artists[0].name,inOtherList:!1}})),x.getPlaylistTracks(s.p2).then((function(e){var n=0;t.playlist2.tracks=e.body.items.map((function(e){return{index:++n,id:e.track.id,name:e.track.name,artist:e.track.artists[0].name,inOtherList:!1}}));var c,a=Object(T.a)(t.playlist1.tracks);try{for(a.s();!(c=a.n()).done;){var i,s=c.value,r=Object(T.a)(t.playlist2.tracks);try{for(r.s();!(i=r.n()).done;){var o=i.value;s.id===o.id&&(s.inOtherList=!0,o.inOtherList=!0,t.stats.sameSongs++)}}catch(l){r.e(l)}finally{r.f()}}}catch(l){a.e(l)}finally{a.f()}O(t),m(!1),g.addConfetti({confettiRadius:6,confettiNumber:500})})).catch((function(e){return console.log("error")}))})).catch((function(e){return console.log("error")}));case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}}),[s]);return Object(u.jsx)("div",{className:"App",children:y?Object(u.jsx)(c.Fragment,{children:Object(u.jsx)("h1",{children:"Loading!"})}):Object(u.jsxs)(c.Fragment,{children:[Object(u.jsx)("h1",{children:"The results are in!"}),Object(u.jsx)("h2",{children:p?"".concat(p.stats.sameSongs," songs are on both of these lists"):null}),Object(u.jsx)(v.a,{variant:"primary",onClick:function(e){e.preventDefault(),S("/")},children:"Back to the beginning!"}),Object(u.jsxs)("div",{className:"table-container",children:[Object(u.jsx)(E,{playlistData:p.playlist1}),Object(u.jsx)(E,{playlistData:p.playlist2})]})]})})}n(85);function C(){var e=Object(o.f)();return Object(u.jsxs)("div",{className:"App-header App error-page",children:[Object(u.jsx)("h1",{className:"error-hero",children:"\ud83e\udd14"}),Object(u.jsx)("h2",{children:"What on earth are you up to"}),Object(u.jsx)(v.a,{variant:"success",onClick:function(t){t.preventDefault(),e("/")},children:"Why don't you start again?"})]})}function P(e){var t=Object(o.f)(),n=Object(c.useState)(void 0),a=Object(l.a)(n,2),i=a[0],s=a[1],r=Object(o.e)(),j=/access_token=(.*?)&/;return Object(c.useEffect)((function(){s(r.hash.match(j)[1])}),[]),Object(c.useEffect)((function(){void 0!==i&&(e.spotifyApi.setAccessToken(i),localStorage.setItem("SPOTIFY_TOKEN",i),t("/playlistChoice"))}),[i]),null}var I=n(86);var w=function(){var e=new I({redirectUri:Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).SPOTIFY_REDIRECT_URI,clientId:Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).SPOTIFY_CLIENT_ID});return Object(u.jsx)(r.a,{children:Object(u.jsxs)(o.c,{children:[Object(u.jsx)(o.a,{path:"/",element:Object(u.jsx)(p,{spotifyApi:e})}),Object(u.jsx)(o.a,{path:"/loginCallback",element:Object(u.jsx)(P,{spotifyApi:e})}),Object(u.jsx)(o.a,{path:"/playlistChoice",element:Object(u.jsx)(g,{spotifyApi:e})}),Object(u.jsx)(o.a,{path:"/compare",element:Object(u.jsx)(N,{spotifyApi:e})}),Object(u.jsx)(o.a,{path:"*",element:Object(u.jsx)(C,{})})]})})},D=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,125)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,i=t.getLCP,s=t.getTTFB;n(e),c(e),a(e),i(e),s(e)}))};n(121);s.a.render(Object(u.jsx)(a.a.StrictMode,{children:Object(u.jsx)(w,{})}),document.getElementById("root")),D()},56:function(e,t,n){},61:function(e,t,n){},63:function(e,t,n){},82:function(e,t,n){},84:function(e,t,n){},85:function(e,t,n){}},[[122,1,2]]]);
//# sourceMappingURL=main.26ca5794.chunk.js.map