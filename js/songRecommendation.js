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
      "https://open.spotify.com/embed/track/5UXJzLFdBn6u9FJTCnoHrH?utm_source=generator",
      "https://open.spotify.com/embed/track/4q3biaQQoADspV16lbsfPH?utm_source=generator",
      "https://open.spotify.com/embed/track/2X71ww8wImSYbw4s0Mr2ur?utm_source=generator",
      "https://open.spotify.com/embed/track/66h3xcrTooMC9AxV8g0Y75?utm_source=generator",
      "https://open.spotify.com/embed/track/2mlNgAeIBnL78ZriXgrRHz?utm_source=generator",
      "https://open.spotify.com/embed/track/1B2dsxhiNChPRUPlxyhHck?utm_source=generator",
      "https://open.spotify.com/embed/track/38CFljBjwKy4CS4mx6u9es?utm_source=generator",
      "https://open.spotify.com/embed/track/046Gh1kXtPynYPaKep5M8E?utm_source=generator",
      "https://open.spotify.com/embed/track/1XqZ4xJ49New05avVfzwiY?utm_source=generator"
    ],
    
    Energetic: [
      "https://open.spotify.com/embed/track/1XqZ4xJ49New05avVfzwiY?utm_source=generator",
      "https://open.spotify.com/embed/track/71rw9MB77BR8LHMFZK8gKV?utm_source=generator",
      "https://open.spotify.com/embed/track/1SVOLTmC627fn0XY9ltvx2?utm_source=generator",
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
