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



  //dark/light mode start
  const switchBtn = document.getElementById('modeSwitch');
const label = document.getElementById('modeLabel');

// Load saved mode from localStorage
let isDark = localStorage.getItem('theme') !== 'light'; // default to dark if not set

// Apply saved mode on page load
document.body.classList.toggle('light-mode', !isDark);
switchBtn.classList.toggle('active', !isDark);
label.textContent = isDark ? 'Dark Mode' : 'Light Mode';

// Handle toggle
switchBtn.addEventListener('click', () => {
  isDark = !isDark;

  // Toggle class
  document.body.classList.toggle('light-mode', !isDark);
  switchBtn.classList.toggle('active', !isDark);
  label.textContent = isDark ? 'Dark Mode' : 'Light Mode';

  // Save to localStorage
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

//TopBar JS(mode switch button)end
});



// Open overlay
document.querySelectorAll(".flip-button").forEach((btn, index) => {
  const ids = ["overlay-pop", "overlay-rock", "overlay-rnb", "overlay-rap", "overlay-other"];
  btn.addEventListener("click", () => {
    const id = ids[index];
    const overlay = document.getElementById(id);
    if (overlay) overlay.style.display = "flex";
  });
});

// Close overlay when clicking the close button
document.querySelectorAll(".overlay .close").forEach(closeBtn => {
  closeBtn.addEventListener("click", () => {
    const overlay = closeBtn.closest(".overlay");
    if (overlay) overlay.style.display = "none";
  });
});

// Close overlay when clicking outside the content box
document.querySelectorAll(".overlay").forEach(overlay => {
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.style.display = "none";
    }
  });
});

  const layer1 = document.querySelector('.main');
const menuToggle = document.getElementById('hamburger');

// Hamburger toggle
menuToggle.addEventListener('click', () => {
  layer1.classList.toggle('slide-out');
  layer1.classList.toggle('no-scroll');
});

// Touch gestures
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeDistance = touchEndX - touchStartX;

  if (swipeDistance > 50) {
    // Swipe right → open
    layer1.classList.add('slide-out');
    layer1.classList.add('no-scroll');
  } 
  else if (swipeDistance < -50) {
    // Swipe left → close
    layer1.classList.remove('slide-out');
    layer1.classList.remove('no-scroll');
  }
}


  function moveTopBarElements() {
  const isMobile = window.innerWidth <= 768; 
  const modeButton = document.getElementById("modebutton");
  const langSwitch = document.getElementById("langSwitch");
  const profile = document.getElementById("profile");
  const mobileExtras = document.getElementById("mobileExtras");
  const topBar = document.getElementById("topBar");

  if (isMobile) {
    // Move to sidebar
    if (!mobileExtras.contains(modeButton)) mobileExtras.appendChild(modeButton);
    if (!mobileExtras.contains(langSwitch)) mobileExtras.appendChild(langSwitch);
    if (!mobileExtras.contains(profile)) mobileExtras.appendChild(profile);
  } else {
    // Move back to topBar
    if (!topBar.contains(modeButton)) topBar.appendChild(modeButton);
    if (!topBar.contains(langSwitch)) topBar.appendChild(langSwitch);
    if (!topBar.contains(profile)) topBar.appendChild(profile);
  }
}

// Trigger on load and resize
window.addEventListener("load", moveTopBarElements);
window.addEventListener("resize", moveTopBarElements);



  