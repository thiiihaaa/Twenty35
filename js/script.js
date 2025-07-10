document.addEventListener("DOMContentLoaded", () => {
  const tracksContainer = document.querySelector('.tracks');
  const titleBox = document.querySelector('.countriesTitle');

  const supportedCountries = ["global", "china", "japan", "korea", "myanmar"];

  // Spotify embed URLs per country
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
      "https://open.spotify.com/embed/track/3HYsldPuR1FSOfxcKjwAvv?utm_source=generator",
      "https://open.spotify.com/embed/track/6uUozZtG4kiJM46ORFzYTQ?utm_source=generator",
      "https://open.spotify.com/embed/track/6XiP2fehIzxaAPzevd1eqM?utm_source=generator",
      "https://open.spotify.com/embed/track/1ZeVIrCWzEmsJexkrgvjFv?utm_source=generator",
      "https://open.spotify.com/embed/track/04q1mkGitMZLcsiA6BIdpm?utm_source=generator",
      "https://open.spotify.com/embed/track/0F6nAVTpdghoq4CJDtxI4u?utm_source=generator",
      "https://open.spotify.com/embed/track/79FkuZkxGymv9LduQHV5z9?utm_source=generator",
      "https://open.spotify.com/embed/track/5vCpBOgec3IWU2JZ2G3ujo?utm_source=generator",
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
    myanmar: [
      "https://open.spotify.com/embed/track/73wIuG6Uzsbk3u2uks5OGR?utm_source=generator",
      "https://open.spotify.com/embed/track/2uc7t2lxi6eXgLvHojBFRJ?utm_source=generator",
      "https://open.spotify.com/embed/track/4Xi1RKnEMXwOdIJRwZmMwD?utm_source=generator",
      "https://open.spotify.com/embed/track/10uxl5NM4RgQYuqRfSETnA?utm_source=generator",
      "https://open.spotify.com/embed/track/4FXkR660IUo82GhEqWuKYu?utm_source=generator",
      "https://open.spotify.com/embed/track/5ZFlmg64ygPIocQ9oiVG3y?utm_source=generator",
      "https://open.spotify.com/embed/track/3H0PKb647M9gqQywj3AF19?utm_source=generator",
      "https://open.spotify.com/embed/track/2NNFyVokPSX6Ebtkdnh9jC?utm_source=generator",
      "https://open.spotify.com/embed/track/2FiXRDGJeLiNHKkAR5ABz2?utm_source=generator",
    ]
  };

  // Unified function to load songs + update title
  function loadSongs(country) {
    tracksContainer.innerHTML = "";

    // Update title
    if (titleBox) {
      titleBox.innerHTML = `&gt; ${country.charAt(0).toUpperCase() + country.slice(1)}`;
    }

    // Load songs
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

  // Playlist box + buttons
  document.querySelectorAll('.playlist-countries, .playlist-countries *, button[data-country]').forEach(element => {
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

  //  Sidebar navigation links
  document.querySelectorAll('.countries').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const country = link.dataset.country;
      if (country && supportedCountries.includes(country)) {
        loadSongs(country);
      }
    });
  });

// main.js


//SongRecommendations

});