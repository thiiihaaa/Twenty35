document.addEventListener("DOMContentLoaded", () => {
  const tracksContainer = document.querySelector('.tracks');

  // Song data for each country – Replace with real Spotify embed URLs
  const songData = {
    global: [
      "https://open.spotify.com/embed/track/1mXVgsBdtIVeCLJnSnmtdV?utm_source=generator",
      "https://open.spotify.com/embed/track/0DGh73t9eaZA3X3ZXHf4Qe?utm_source=generator",
      "https://open.spotify.com/embed/track/5gguiSurLMRJwKPTGbEj5r?utm_source=generator",
      "https://open.spotify.com/embed/track/74h6p7El7eyV6HKvTefpIJ?utm_source=generator",
      "https://open.spotify.com/embed/track/4SjXHwsZevaRo1M2EQgHf6?utm_source=generator",
      "https://open.spotify.com/embed/track/3pTHZHX0MRE7xYeiTEWlaM?utm_source=generator",
      "https://open.spotify.com/embed/track/7wfxf9QXBIWgBx1aG5QWhR?utm_source=generator",
      "https://open.spotify.com/embed/track/6DRZmJa38MaMNthwG3fCBD?utm_source=generator",
      "https://open.spotify.com/embed/track/16bo9rjhuBfM6mUFKpSdRJ?utm_source=generator",
    ],
    china: [
      "https://open.spotify.com/embed/track/6YUN7NkILBuFEvzMTLnMek?utm_source=generator",
    ],
    japan: [
      "https://open.spotify.com/embed/track/4BE1OloRc9xwjyqA4wFFuN?utm_source=generator",
      "https://open.spotify.com/embed/track/34jv2mOVzPjncrBncjYl6F?utm_source=generator",
      "https://open.spotify.com/embed/track/227xgVTDRjtmCBc1mKWcTr?utm_source=generator",
      "https://open.spotify.com/embed/track/4gyksxg8oXcUqhULEhRuOV?utm_source=generator",
      "https://open.spotify.com/embed/track/1UPtzvnvQALqV9feDrqVSs?utm_source=generator",
      "https://open.spotify.com/embed/track/4stYPN0wX9KSOf3DKkXYGQ?utm_source=generator",
      "https://open.spotify.com/embed/track/3CBnlqIkzArK0vOg5zQfQ8?utm_source=generator",
      "https://open.spotify.com/embed/track/7xyruDfHqEQ7RqnsMmRYbW?utm_source=generator",
      "https://open.spotify.com/embed/track/7DrwN98xjUsoLwbfPbnLRf?utm_source=generator",

    ],
    korea: [
        "https://open.spotify.com/embed/track/5tdzH8IkV62pyL1BHXrfmv?utm_source=generator",
        "https://open.spotify.com/embed/track/3HAkoNmThZhyFejhpRXXYI?utm_source=generator",
        "https://open.spotify.com/embed/track/0Wv6HtcBNex6lwPugykWCd?utm_source=generator",
        "https://open.spotify.com/embed/track/5VkWxt21vUAkhShLYLZ2Kb?utm_source=generator",
        "https://open.spotify.com/embed/track/21uTv4ytzeEAW9S3d7Joqv?utm_source=generator",
        "https://open.spotify.com/embed/track/0JKGe340YJwfDrpXqPQ8sw?utm_source=generator",
        "https://open.spotify.com/embed/track/5juCu4WFTFRZ2XilopAMTy?utm_source=generator",
        "https://open.spotify.com/embed/track/6eRUz27KzkmGy3s6ZMcHgt?utm_source=generator",
        "https://open.spotify.com/embed/track/1j34c0bX2EXG4lKe2Q74Bw?utm_source=generator",

    ],
    myanmar: []
  };

  // Function to load embeds
  function loadSongs(country) {
    tracksContainer.innerHTML = "";
    if (songData[country] && songData[country].length) {
      songData[country].forEach(url => {
        const iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.width = "300px";
        iframe.height = "100px";
        iframe.frameBorder = "0";
        iframe.allow = "encrypted-media";
        tracksContainer.appendChild(iframe);
      });
    } else {
      tracksContainer.innerHTML = `<p>No songs available for ${country} yet!</p>`;
    }
  }

  // Set up click events for both image and button

const supportedCountries = ["global", "china", "japan", "korea", "myanmar"];
    document.querySelectorAll('.playlist-countries, .playlist-countries *, button').forEach(element => {
      element.addEventListener('click', () => {
        const countryElement = element.closest('.playlist-countries') || element.parentElement.querySelector('.playlist-countries');
        if (!countryElement) return;

        const classList = countryElement.classList;
        const countryClass = [...classList].find(cls => supportedCountries.includes(cls));
        if (countryClass) {
          loadSongs(countryClass);
        }
      });
    });


  // Also respond to sidebar nav clicks
document.querySelectorAll('.countries').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault(); // prevent page jump
    const country = link.dataset.country;
    if (country && supportedCountries.includes(country)) {
      loadSongs(country);
    }
  });  
});

});







document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".songRecommendation button");
  const musicPlayer = document.querySelector(".musicPlayer");

  // 🎧 Mood-based playlist collections
  const spotifyEmbeds = {
    Joyful: [
       "https://open.spotify.com/embed/track/1mXVgsBdtIVeCLJnSnmtdV?utm_source=generator",
      "https://open.spotify.com/embed/track/0DGh73t9eaZA3X3ZXHf4Qe?utm_source=generator",
      "https://open.spotify.com/embed/track/5gguiSurLMRJwKPTGbEj5r?utm_source=generator",
      "https://open.spotify.com/embed/track/74h6p7El7eyV6HKvTefpIJ?utm_source=generator",
      "https://open.spotify.com/embed/track/4SjXHwsZevaRo1M2EQgHf6?utm_source=generator",
      "https://open.spotify.com/embed/track/3pTHZHX0MRE7xYeiTEWlaM?utm_source=generator",
      "https://open.spotify.com/embed/track/7wfxf9QXBIWgBx1aG5QWhR?utm_source=generator",
      "https://open.spotify.com/embed/track/6DRZmJa38MaMNthwG3fCBD?utm_source=generator",
      "https://open.spotify.com/embed/track/16bo9rjhuBfM6mUFKpSdRJ?utm_source=generator",
    ],
    Melancholic: [
       "https://open.spotify.com/embed/track/1mXVgsBdtIVeCLJnSnmtdV?utm_source=generator",
      "https://open.spotify.com/embed/track/0DGh73t9eaZA3X3ZXHf4Qe?utm_source=generator",
      "https://open.spotify.com/embed/track/5gguiSurLMRJwKPTGbEj5r?utm_source=generator",
      "https://open.spotify.com/embed/track/74h6p7El7eyV6HKvTefpIJ?utm_source=generator",
      "https://open.spotify.com/embed/track/4SjXHwsZevaRo1M2EQgHf6?utm_source=generator",
      "https://open.spotify.com/embed/track/3pTHZHX0MRE7xYeiTEWlaM?utm_source=generator",
      "https://open.spotify.com/embed/track/7wfxf9QXBIWgBx1aG5QWhR?utm_source=generator",
      "https://open.spotify.com/embed/track/6DRZmJa38MaMNthwG3fCBD?utm_source=generator",
      "https://open.spotify.com/embed/track/16bo9rjhuBfM6mUFKpSdRJ?utm_source=generator"
    ],
    Energetic: [
       "https://open.spotify.com/embed/track/1mXVgsBdtIVeCLJnSnmtdV?utm_source=generator",
      "https://open.spotify.com/embed/track/0DGh73t9eaZA3X3ZXHf4Qe?utm_source=generator",
      "https://open.spotify.com/embed/track/5gguiSurLMRJwKPTGbEj5r?utm_source=generator",
      "https://open.spotify.com/embed/track/74h6p7El7eyV6HKvTefpIJ?utm_source=generator",
      "https://open.spotify.com/embed/track/4SjXHwsZevaRo1M2EQgHf6?utm_source=generator",
      "https://open.spotify.com/embed/track/3pTHZHX0MRE7xYeiTEWlaM?utm_source=generator",
      "https://open.spotify.com/embed/track/7wfxf9QXBIWgBx1aG5QWhR?utm_source=generator",
      "https://open.spotify.com/embed/track/6DRZmJa38MaMNthwG3fCBD?utm_source=generator",
      "https://open.spotify.com/embed/track/16bo9rjhuBfM6mUFKpSdRJ?utm_source=generator"
    ],
    Chill: [
      "https://open.spotify.com/embed/track/1mXVgsBdtIVeCLJnSnmtdV?utm_source=generator",
      "https://open.spotify.com/embed/track/0DGh73t9eaZA3X3ZXHf4Qe?utm_source=generator",
      "https://open.spotify.com/embed/track/5gguiSurLMRJwKPTGbEj5r?utm_source=generator",
      "https://open.spotify.com/embed/track/74h6p7El7eyV6HKvTefpIJ?utm_source=generator",
      "https://open.spotify.com/embed/track/4SjXHwsZevaRo1M2EQgHf6?utm_source=generator",
      "https://open.spotify.com/embed/track/3pTHZHX0MRE7xYeiTEWlaM?utm_source=generator",
      "https://open.spotify.com/embed/track/7wfxf9QXBIWgBx1aG5QWhR?utm_source=generator",
      "https://open.spotify.com/embed/track/6DRZmJa38MaMNthwG3fCBD?utm_source=generator",
      "https://open.spotify.com/embed/track/16bo9rjhuBfM6mUFKpSdRJ?utm_source=generator"
    ],
    Mysterious: [
      "https://open.spotify.com/embed/track/1mXVgsBdtIVeCLJnSnmtdV?utm_source=generator",
      "https://open.spotify.com/embed/track/0DGh73t9eaZA3X3ZXHf4Qe?utm_source=generator",
      "https://open.spotify.com/embed/track/5gguiSurLMRJwKPTGbEj5r?utm_source=generator",
      "https://open.spotify.com/embed/track/74h6p7El7eyV6HKvTefpIJ?utm_source=generator",
      "https://open.spotify.com/embed/track/4SjXHwsZevaRo1M2EQgHf6?utm_source=generator",
      "https://open.spotify.com/embed/track/3pTHZHX0MRE7xYeiTEWlaM?utm_source=generator",
      "https://open.spotify.com/embed/track/7wfxf9QXBIWgBx1aG5QWhR?utm_source=generator",
      "https://open.spotify.com/embed/track/6DRZmJa38MaMNthwG3fCBD?utm_source=generator",
      "https://open.spotify.com/embed/track/16bo9rjhuBfM6mUFKpSdRJ?utm_source=generator"
    ],
    Nostalgic: [
      "https://open.spotify.com/embed/track/1mXVgsBdtIVeCLJnSnmtdV?utm_source=generator",
      "https://open.spotify.com/embed/track/0DGh73t9eaZA3X3ZXHf4Qe?utm_source=generator",
      "https://open.spotify.com/embed/track/5gguiSurLMRJwKPTGbEj5r?utm_source=generator",
      "https://open.spotify.com/embed/track/74h6p7El7eyV6HKvTefpIJ?utm_source=generator",
      "https://open.spotify.com/embed/track/4SjXHwsZevaRo1M2EQgHf6?utm_source=generator",
      "https://open.spotify.com/embed/track/3pTHZHX0MRE7xYeiTEWlaM?utm_source=generator",
      "https://open.spotify.com/embed/track/7wfxf9QXBIWgBx1aG5QWhR?utm_source=generator",
      "https://open.spotify.com/embed/track/6DRZmJa38MaMNthwG3fCBD?utm_source=generator",
      "https://open.spotify.com/embed/track/16bo9rjhuBfM6mUFKpSdRJ?utm_source=generator"
    ],
    Romantic: [
      "https://open.spotify.com/embed/track/1mXVgsBdtIVeCLJnSnmtdV?utm_source=generator",
      "https://open.spotify.com/embed/track/0DGh73t9eaZA3X3ZXHf4Qe?utm_source=generator",
      "https://open.spotify.com/embed/track/5gguiSurLMRJwKPTGbEj5r?utm_source=generator",
      "https://open.spotify.com/embed/track/74h6p7El7eyV6HKvTefpIJ?utm_source=generator",
      "https://open.spotify.com/embed/track/4SjXHwsZevaRo1M2EQgHf6?utm_source=generator",
      "https://open.spotify.com/embed/track/3pTHZHX0MRE7xYeiTEWlaM?utm_source=generator",
      "https://open.spotify.com/embed/track/7wfxf9QXBIWgBx1aG5QWhR?utm_source=generator",
      "https://open.spotify.com/embed/track/6DRZmJa38MaMNthwG3fCBD?utm_source=generator",
      "https://open.spotify.com/embed/track/16bo9rjhuBfM6mUFKpSdRJ?utm_source=generator"
    ]
  };

  //  Attach click listeners to buttons
 buttons.forEach(button => {
    button.addEventListener("click", () => {
      const mood = button.dataset.moods;
      const playlistArray = spotifyEmbeds[mood];

      if (playlistArray && playlistArray.length) {
        const randomIndex = Math.floor(Math.random() * playlistArray.length);
        const embedURL = playlistArray[randomIndex];

        musicPlayer.innerHTML = `
          <iframe 
            src="${embedURL}" 
            width="100%" 
            height="80" 
            frameborder="0" 
            allowtransparency="true" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture">
          </iframe>`;

        //  Reveal the music player
        musicPlayer.classList.add("show");
      } else {
        musicPlayer.innerHTML = `<p>No playlists found for <strong>${mood}</strong>. </p>`;
        musicPlayer.classList.add("show");
      }
    });
  });
});

