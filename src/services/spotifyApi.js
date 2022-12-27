import axios from 'axios'
import { Buffer } from 'buffer'
import qs from 'qs'

const clientId = import.meta.env.VITE_SPOTIFY_PUBLIC_CLIENT_ID
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
const authToken = Buffer.from(`${clientId}:${clientSecret}`, 'utf-8').toString('base64');

const getAuth = async () => {
    try {
        const url = 'https://accounts.spotify.com/api/token'
        const data = qs.stringify({ grant_type: "client_credentials" })

        const response = await axios.post(url,data, {
            headers: { 
              'Authorization': "Basic " + authToken,
              'Content-Type': 'application/x-www-form-urlencoded' 
            }
        })
        
        return response.data.access_token
    }catch(error){
        console.log(error)
    }
}

const exports = {
    getAuth
}

export default exports