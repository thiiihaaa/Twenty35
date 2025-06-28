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
  document.querySelectorAll('.playlist-countries, .playlist-countries * , .playlist-countries + button').forEach(element => {
    element.addEventListener('click', () => {
      const parentDiv = element.closest('div');
      const classList = parentDiv.querySelector('.playlist-countries').classList;
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

