// netlify/functions/get-spotify-token.js
const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";

// Netlify automatically loads these keys from your environment variables
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

exports.handler = async () => {
    // Basic key check (for debugging, but necessary)
    if (!CLIENT_ID || !CLIENT_SECRET) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Client ID or Client Secret not configured." }),
        };
    }

    try {
        // Request the token from Spotify using the secure, server-side keys
        const res = await fetch(SPOTIFY_TOKEN_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
            },
            body: "grant_type=client_credentials",
        });

        if (!res.ok) {
            console.error("Spotify API Token Error:", res.status);
            return {
                statusCode: res.status,
                body: JSON.stringify({ error: "Failed to get token from Spotify API" }),
            };
        }

        // Return the token response (which includes the access_token) directly to the client
        const data = await res.json();
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                // Essential for client-side JS to access this endpoint
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error("Netlify Function execution error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal server error during token generation." }),
        };
    }
};