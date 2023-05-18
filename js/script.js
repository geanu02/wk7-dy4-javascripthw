import data from '../secret.json' assert { type: 'json' }

const { clientId, clientSecret } = data

// console.log(clientId)

const apiAdd = 'https://accounts.spotify.com/api/token'
let token

async function getToken() {
    const res = await fetch(apiAdd, {
        method: "POST",
        body: "grant_type=client_credentials",
        headers: {
            Authorization: `Basic ${btoa(clientId+':'+clientSecret)}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }})
    if (res.ok) {
        const data = await res.json()
        return data.access_token
    }
}

(async () => {
    token = await getToken()
})()

async function getSongApiCall(track, artist) {
    const res = await fetch(`https://api.spotify.com/v1/search?q=${track},${artist}&type=track,artist`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${await getToken()}`,
            'Content-Type': 'application/json'
        }})
    if (res.ok) {
        const data = await res.json()
        return data.tracks.items[0].preview_url
    }
}

// getSongApiCall('Take Me To Your Body', 'Moon Boots')

const imgs = document.getElementsByTagName('img')
for (const image of imgs) {
    image.addEventListener('click', async () => {
        const [ track, artist ] = image.alt.split(' - ')
        playSong(await getSongApiCall(track, artist))
    })
}

let song

function playSong(url) {
    song = new Audio(url)
    song.volume = 0.5
    song.play()
}

function stopSong() {
    song.pause()
}

// document.getElementById('stopSong').addEventListener('click', () => stopSong() ? song : '')