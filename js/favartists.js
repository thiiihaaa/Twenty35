const artistInput = document.getElementById("artistInput");
const searchBtn = document.getElementById("searchBtn");
const suggestionsDropdown = document.getElementById("suggestionsDropdown");

// Ensure other elements are correctly referenced
const artistGrid = document.getElementById("artistGrid");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");
const artistProfile = document.getElementById("artistProfile");
const descriptionText = document.getElementById("descriptionText");
const topTracks = document.getElementById("topTracks");
const langSelect = document.getElementById("langSelect");
const countrySelect = document.getElementById("countrySelect");

/* =========================
    CONFIG (UPDATED FOR NETLIFY FUNCTIONS)
========================= */

const TOKEN_URL = "/.netlify/functions/get-spotify-token";

// Other Spotify API Endpoints (using placeholders as requested)
const SEARCH_URL = "https://api.spotify.com/v1/search";
const TOP_TRACKS_URL_BASE = "https://api.spotify.com/v1/artists/";
const GET_ARTIST_URL_BASE = "https://api.spotify.com/v1/artists/";


// ✅ Your artists list with the correct IDs
const DISPLAY_ARTISTS = {
    global: [
        ["Sam Smith", "2wY79sveU1sp5g7SokKOiI"],
        ["FINNEAS", "37M5pPGs6V1fchFJSgCguX"],
        ["Lauv", "5JZ7CnR6gTvEMKX4g70Amv"],
        ["Joji", "3MZsBdqDrRTJihTHQrO6Dq"],
        ["Connor Price", "5zixe6AbgXPqt4c1uSl94L"],
        ["NEFFEX", "3z97WMRi731dCvKklIf2X6"],
        ["Dept", "48JtfAggQQpfUXQNxkGm5U"],
        ["Ashley Alisha", "63P6hjn73jNbnEFT0gKWKk"],
        ["Crying City", "324QqTOkQyG8CUlphElsdD"],
        ["pami", "4cC1AQC0SUwmemy2FHBST8"],
        ["Bruno Mars", "0du5cEVh5yTK9QJze8zA0C"],
        ["Gentle Bones", "4jGPdu95icCKVF31CcFKbS"],
        ["Anne-Marie", "1zNqDE7qDGCsyzJwohVaoX"]
    ],
    japan: [
        ["YOASOBI", "64tJ2EAv1R6UaZqc4iOCyj"],
        ["Aimer", "0bAsR2unSRpn6BQPEnNlZm"],
        ["asmi", "3UY1KK0iXeC0mpaK0ltFza"],
        ["Kenshi Yonezu", "1snhtMLeb2DYoMOcVbb8iB"],
        ["eill", "3AiES4wyTOfJvNgqz9baDn"],
        ["Sekai no owari", "7HwzlRPa9Ad0I8rK0FPzzK"],
        ["Ken Hirai", "6jIhEiXcCAyBsuEI7qZ9vc"],
        ["Fujii Kaze", "6bDWAcdtVR3WHz2xtiIPUi"],
        ["Yorushika", "4UK2Lzi6fBfUi9rpDt6cik"],
        ["Lilas Ikuta", "1qM11R4ylJyQiPJ0DffE9z"],
        ["milet", "45ft4DyTCEJfQwTBHXpdhM"],
        ["nishina", "2aoUBwmHWln0JSEZbi9E70"],
        ["Atarayo", "2yRnjWtHzmDELwYaUiX0Yh"],
        ["YOAKE", "0psEe4IooMjolOPMrz9A5M"],
        ["ao", "5NUhVvh0ERaLUcVqbUfDhK"]
    ],
    korea: [
        // NOTE: Fixed the TWICE ID from your original list
        ["TWICE", "7n2Ycct7BeQykOzPftTnhV"],
        ["NMIXX", "28ot3wh4oNmoFOdVajibBl"],
        ["ADORA", "3M1kgHOpPruu1uBymBHF3r"],
        ["BIGBANG", "4Kxlr1PRlDKEB0ekOCyHgX"],
        ["Punch", "2FgZrgTMX6Sk0VNcOsEPmm"],
        ["DAY6", "5TnQc2N1iKlFjYD7CPGvFc"],
        ["BOL4", "4k5fFEYgkWYrYvtOK3zVBl"],
        ["Heize", "5dCvSnVduaFleCnyy98JMo"],
        ["10CM", "6zn0ihyAApAYV51zpXxdEp"],
        ["SEVENTEEN", "7nqOGRxlXj7N2JYbgNEjYH"],
        ["Kassy", "6pU8o91xAS0aWNjj06nQSU"],
        ["KyoungSeo", "4rxWm4OrS8IRQ3YxDUwnJA"],
        ["NAYEON", "1VwDG9aBflQupaFNjUru9A"],
        ["ROSÉ", "3eVa5w3URK5duf6eyVDbu9"]
    ],
    myanmar: [
        // NOTE: Fixed the two Myanmar artists with incorrect ID formats
        ["Bunny Phyoe", "5zO858jAk9omSVmrOGtHh8"],
        ["Hlwan paing", "2ZYioL0Jy15u3W14aslapb"],
        ["SHINE", "4m45Gfg1u9Q05JhnLNdur0"],
        ["The Zero", "01ZNwLYso4QNWIiovKkimq"],
        ["Oak Soe Khant", "4gSpAieRN9BpFi3TRkkIQx"],
        ["Amera Hpone", "0SKBN6mzUjriQsuS42E4mN"],
        ["Jaz3", "2Bzou1SgWqhcnw0t1635Qm"],
        ["Shwe Htoo", "6sT6S8XD3bkd5aIXFscNTI"],
        ["Yair Yint Aung", "0z2fnnUhkFL7JTFqEtO1ew"],
        ["He Lay", "2p72jwTS9W4xmop7s990AL"],
        ["Moe Htet(B+)", "1ow6YOysiqF4VSLz7fowid"],
        ["Mi Sandi", "15jzQG0oVrP3kxrYUkAVhU"],
        ["BigBag", "0bfrBj49eulFwRW1IIfi9G"],
        ["Ye' Lay", "6c64bXKD9BUqqhiXjtXJmR"],
        ["Adjustor", "4KJ6UBdVO4PqLqSr3w13RL"]
    ]
};

const WIKI_LANG_MAP = {
    en: "en",
    ja: "ja",
    my: "my"
};

let accessToken = "";
let currentLang = "en";
let lastArtist = null;

/* TOKEN (UPDATED) */
async function getToken() {
    if (accessToken) return;

    try {
        // Fetch the token from the secure Netlify Function endpoint
        const res = await fetch(TOKEN_URL);

        if (!res.ok) {
            // Check if the function failed due to missing keys (500 status)
            console.error("Token retrieval failed via Netlify Function. Status:", res.status);
            return;
        }

        const data = await res.json();
        accessToken = data.access_token;
        console.log("Token acquired:", !!accessToken);
    } catch (error) {
        console.error("Error during token fetch:", error);
    }
}

/* SEARCH & ID LOOKUP */

// 🚨 NEW FUNCTION: Guaranteed lookup by Spotify ID
async function getArtistById(id) {
    if (!accessToken || !id) return null;

    try {
        const res = await fetch(
            `${GET_ARTIST_URL_BASE}${id}`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        if (!res.ok) {
            console.error(`Failed to fetch artist with ID: ${id}. Status: ${res.status}`);
            return null;
        }
        return await res.json();
    } catch (error) {
        console.error("Error during artist ID fetch:", error);
        return null;
    }
}


// 1. Function to show suggestions while typing (Autocomplete)
function showSuggestions(artists) {
    suggestionsDropdown.innerHTML = '';

    // Hide dropdown if input is empty or search is too short
    if (artistInput.value.trim().length < 2) {
        suggestionsDropdown.style.display = 'none';
        return;
    }

    if (artists && artists.length > 0) {
        artists.forEach(artist => {
            const item = document.createElement('div');
            item.classList.add('suggestion-item');
            item.dataset.artistId = artist.id;

            const imageUrl = artist.images?.[2]?.url || artist.images?.[1]?.url || artist.images?.[0]?.url || "";

            item.innerHTML = `
                        <img src="${imageUrl || 'https://via.placeholder.com/24/1ED760/FFFFFF?text=A'}" alt="${artist.name} Profile" />
                        <span>${artist.name}</span>
                    `;

            item.addEventListener('click', () => {
                artistInput.value = artist.name;
                openArtist(artist);
                suggestionsDropdown.style.display = 'none';
            });

            suggestionsDropdown.appendChild(item);
        });

        suggestionsDropdown.style.display = 'block';
    } else {
        suggestionsDropdown.style.display = 'none';
    }
}

// 2. Autocomplete Flow (Run on 'input' event - when typing)
async function searchFlow() {
    const name = artistInput.value.trim();

    if (name.length < 2) {
        suggestionsDropdown.style.display = 'none';
        return;
    }

    await getToken();
    const artists = await searchArtist(name);
    showSuggestions(artists);
}

// 3. Final Search Flow (Run on Search Button click or Enter keypress)
async function finalSearch() {
    const name = artistInput.value.trim();

    if (!name) return;

    suggestionsDropdown.style.display = 'none';

    await getToken();

    // Use searchArtist (name-based) here since we only have the name from the input field
    const artists = await searchArtist(name);

    if (artists.length > 0) {
        openArtist(artists[0]);
    } else {
        alert(`No artist found matching "${name}"`);
    }
}

// Used by searchFlow and finalSearch (Name search)
async function searchArtist(name) {
    const limit = 5;

    if (!accessToken) return [];

    try {
        const res = await fetch(
            `${SEARCH_URL}?q=${encodeURIComponent(name)}&type=artist&limit=${limit}`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        const data = await res.json();
        return data?.artists?.items || [];
    } catch (error) {
        console.error("Error during artist search:", error);
        return [];
    }
}

async function getTopTracks(id) {
    if (!accessToken) return [];

    try {
        const res = await fetch(
            `${TOP_TRACKS_URL_BASE}${id}/top-tracks?market=US`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        if (!res.ok) throw new Error("Failed to fetch tracks");

        return (await res.json()).tracks;
    } catch (error) {
        console.error("Error fetching top tracks:", error);
        return [];
    }
}


/* WIKIPEDIA */
async function loadWikipedia(name) {
    const lang = WIKI_LANG_MAP[currentLang] || "en";
    descriptionText.textContent = "Loading...";
    try {
        const res = await fetch(
            `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`
        );
        const data = await res.json();
        descriptionText.textContent = data.extract || "No description available.";
    } catch {
        descriptionText.textContent = "No description available.";
    }
}

/* OVERLAY */
async function openArtist(artist) {
    lastArtist = artist;
    overlay.classList.add("active");

    // Handle image array (pick the first large one)
    const artistImageUrl = artist.images[0]?.url || "";

    artistProfile.innerHTML = `
            <img src="${artistImageUrl}" alt="${artist.name}">
            <div>
                <h2>${artist.name}</h2>
                <p>Followers: ${artist.followers.total.toLocaleString()}</p>
            </div>
            `;

    loadWikipedia(artist.name);

    topTracks.innerHTML = "<h3>Top Tracks</h3><p>Loading tracks...</p>";

    const tracks = await getTopTracks(artist.id);
    renderTracks(tracks);
}

function renderTracks(tracks) {
    topTracks.innerHTML = "<h3>Top Tracks</h3>";

    if (tracks.length === 0) {
        topTracks.innerHTML += "<p>No top tracks found.</p>";
        return;
    }

    tracks.slice(0, 5).forEach(track => {
        topTracks.innerHTML += `
                <a
                    class="track"
                    href="${track.external_urls.spotify}"
                    target="_blank"
                    rel="noopener noreferrer"
                    onclick="event.stopPropagation()"
                >
                    <img src="${track.album.images[0]?.url || ""}" alt="${track.name} album cover" />

                    <div class="track-info">
                        <strong>${track.name}</strong>
                        <p>${track.artists.map(a => a.name).join(", ")}</p>
                    </div>

                    <span class="spotify-link">Open ↗</span>
                </a>
                `;
    });
}

function closeOverlay() {
    overlay.classList.remove("active");
}

/* GRID */
function createArtistCard(artist) {
    const div = document.createElement("div");
    div.className = "artist-card";

    // Handle image array (pick the first large one)
    const artistImageUrl = artist.images[0]?.url || "";

    div.innerHTML = `
            <img src="${artistImageUrl}" alt="${artist.name} image">
            <h3>${artist.name}</h3>
            `;
    div.onclick = () => openArtist(artist);
    artistGrid.appendChild(div);
}

// 🚨 FIXED FUNCTION: Now loads artists by their Spotify ID
async function loadArtistsByCountry(country) {
    artistGrid.innerHTML = "Loading...";
    await getToken();
    artistGrid.innerHTML = "";

    if (!accessToken) {
        artistGrid.innerHTML = "Failed to load artists. Check Netlify Environment Variables.";
        return;
    }

    const artistsToLoad = DISPLAY_ARTISTS[country];

    for (const [name, id] of artistsToLoad) {

        // Use the new getArtistById function for guaranteed correctness
        const artist = await getArtistById(id);

        if (artist) createArtistCard(artist);
    }

    if (artistGrid.innerHTML === "") {
        artistGrid.innerHTML = "No artists loaded. Check that your Spotify IDs are correct.";
    }
}

/* EVENTS and DEFAULT SETUP */
document.addEventListener("DOMContentLoaded", () => {
    // EVENT LISTENERS
    searchBtn.onclick = finalSearch;

    closeBtn.onclick = closeOverlay;
    overlay.onclick = e => e.target === overlay && closeOverlay();

    langSelect.onchange = () => {
        currentLang = langSelect.value;
        if (lastArtist) loadWikipedia(lastArtist.name);
    };

    countrySelect.onchange = e => loadArtistsByCountry(e.target.value);

    // Enter Keypress
    artistInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            e.preventDefault();
            finalSearch(); // Call the dedicated final search function
        }
    });

    // Autocomplete Trigger
    artistInput.addEventListener('input', searchFlow);

    // Hide dropdown when clicking outside the search container
    document.addEventListener('click', (e) => {
        const searchContainerWrapper = document.getElementById('search-container-wrapper');
        if (searchContainerWrapper && !searchContainerWrapper.contains(e.target) && suggestionsDropdown.style.display !== 'none') {
            suggestionsDropdown.style.display = 'none';
        }
    });

    // DEFAULT LOAD
    loadArtistsByCountry("global");
});