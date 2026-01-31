document.addEventListener("DOMContentLoaded", () => {
  const recommendationBlocks = document.querySelectorAll(".songRecommendation");
  const musicPlayer = document.querySelector(".musicPlayer");

  // 🎧 Mood-based playlist collections
  const spotifyEmbeds = {
  Joyful: [
  "https://open.spotify.com/embed/track/1Je1IMUlBXcx1Fz0WE7oPT", // Owl City – Fireflies
  "https://open.spotify.com/embed/track/2LEF1A8DOZ9wRYikWgVlZ8", // WALK THE MOON – Shut Up and Dance
  "https://open.spotify.com/embed/track/1d7Ptw3qYcfpdLNL5REhtJ", // OneRepublic – Good Life
  "https://open.spotify.com/embed/track/17tuuYUw3K1J9pDe4QrWNo", // Jason Mraz – I'm Yours
  "https://open.spotify.com/embed/track/5BZsQlgw21vDOAjoqkNgKb", // Train – Hey, Soul Sister
  "https://open.spotify.com/embed/track/1rIKgCH4H52lrvDcz50hS8", // Matt & Kim – Daylight
  "https://open.spotify.com/embed/track/6b8Be6ljOzmkOmFslEb23P", // Natasha Bedingfield – Pocketful of Sunshine
  "https://open.spotify.com/embed/track/2nGFzvICaeEWjIrBrL2RAx", // Bruno Mars – Treasure
  "https://open.spotify.com/embed/track/60nZcImufyMA1MKQY3dcCH", // Foster The People – Sit Next to Me
  "https://open.spotify.com/embed/track/2PWTZV5znjLtZC5T1EVJvL"  
],
    Melancholic: [
  "https://open.spotify.com/embed/track/7LVHVU3tWfcxj5aiPFEW4Q", // Adele – Someone Like You
  "https://open.spotify.com/embed/track/3ZCTVFBt2Brf31RLEnCkWJ", // Billie Eilish – everything i wanted
  "https://open.spotify.com/embed/track/0At2qAoaVjIwWNAqrscXli", // Coldplay – Yellow
  "https://open.spotify.com/embed/track/0FDzzruyVECATHXKHFs9eJ", // Snow Patrol – Chasing Cars
  "https://open.spotify.com/embed/track/1lDWb6b6ieDQ2xT7ewTC3G", // Keane – Somewhere Only We Know
  "https://open.spotify.com/embed/track/41CgzGD7xlgnJe14R4cqkL", // Lauv – Paris in the Rain
  "https://open.spotify.com/embed/track/0eGsygTp906u18L0Oimnem", // Radiohead – Creep
  "https://open.spotify.com/embed/track/5w9c2J52mkdntKOmRLeM2m", // Stephen Sanchez – Until I Found You
  "https://open.spotify.com/embed/track/2Fxmhks0bxGSBdJ92vM42m", // Post Malone – Sunflower
  "https://open.spotify.com/embed/track/3AJwUDP919kvQ9QcozQPxg"  // Coldplay – Fix You
],
    Energetic: [
  "https://open.spotify.com/embed/track/7qiZfU4dY1lWllzX7mPBI3", // Ed Sheeran – Shape of You
  "https://open.spotify.com/embed/track/0VjIjW4GlUZAMYd2vXMi3b", // The Weeknd – Blinding Lights
  "https://open.spotify.com/embed/track/6DCZcSspjsKoFjzjrWoCdn", // Drake – God's Plan
  "https://open.spotify.com/embed/track/4NsPgRYUdHu2Q5JRNgXYU5", // Dua Lipa – Don't Start Now
  "https://open.spotify.com/embed/track/5Z3GHaZ6ec9bsiI5BenrbY", // Imagine Dragons – Believer
  "https://open.spotify.com/embed/track/0nrRP2bk19rLc0orkWPQk2", // Twenty One Pilots – Stressed Out
  "https://open.spotify.com/embed/track/2Fxmhks0bxGSBdJ92vM42m", // Post Malone – Sunflower
  "https://open.spotify.com/embed/track/4fGQqkPe1XW6lO8E9P3e5E", // Avicii – Wake Me Up
  "https://open.spotify.com/embed/track/3PfIrDoz19wz7qK7tYeu62", // Mark Ronson – Uptown Funk
  "https://open.spotify.com/embed/track/6v3KW9xbzN5yKLt9YKDYA2"  // Calvin Harris – Feel So Close
],
   Chill: [
  "https://open.spotify.com/embed/track/2gZUPNdnz5Y45eiGxpHGSc", // Cigarettes After Sex – Sweet
  "https://open.spotify.com/embed/track/4yNk9iz9WVJikRFle3XEvn", // Joji – Slow Dancing in the Dark
  "https://open.spotify.com/embed/track/3ZCTVFBt2Brf31RLEnCkWJ", // Billie Eilish – everything i wanted
  "https://open.spotify.com/embed/track/7lPN2DXiMsVn7XUKtOW1CS", // Harry Styles – Adore You
  "https://open.spotify.com/embed/track/0At2qAoaVjIwWNAqrscXli", // Coldplay – Yellow
  "https://open.spotify.com/embed/track/41CgzGD7xlgnJe14R4cqkL", // Lauv – Paris in the Rain
  "https://open.spotify.com/embed/track/6RUKPb4LETWmmr3iAEQktW", // The Chainsmokers – Something Just Like This
  "https://open.spotify.com/embed/track/5w9c2J52mkdntKOmRLeM2m", // Stephen Sanchez – Until I Found You
  "https://open.spotify.com/embed/track/0eGsygTp906u18L0Oimnem", // Radiohead – Creep
  "https://open.spotify.com/embed/track/0FDzzruyVECATHXKHFs9eJ"  // Snow Patrol – Chasing Cars
]
,
Mysterious: [
  "https://open.spotify.com/embed/track/2takcwOaAZWiXQijPHIx7B", // Arctic Monkeys – Do I Wanna Know?
  "https://open.spotify.com/embed/track/7MXVkk9YMctZqd1Srtv4MB", // The Weeknd – Starboy
  "https://open.spotify.com/embed/track/4iV5W9uYEdYUVa79Axb7Rh", // Massive Attack – Teardrop
  "https://open.spotify.com/embed/track/2d8JP84HNLKhmd6IYOoupQ", // James Blake – Retrograde
  "https://open.spotify.com/embed/track/0gplL1WMoJ6iYaPgMCL0gX", // Radiohead – Everything In Its Right Place
  "https://open.spotify.com/embed/track/1qPbGZqppFwLwcBC1JQ6Vr", // Lana Del Rey – Dark Paradise
  "https://open.spotify.com/embed/track/3USxtqRwSYz57Ewm6wWRMp", // Billie Eilish – bad guy
  "https://open.spotify.com/embed/track/0sf12qNH5qcw8qpgymFOqD", // Linkin Park – Numb
  "https://open.spotify.com/embed/track/6K4t31amVTZDgR3sKmwUJJ", // Lorde – Royals
  "https://open.spotify.com/embed/track/2gZUPNdnz5Y45eiGxpHGSc"  // Cigarettes After Sex – Sweet
],
 Nostalgic: [
  "https://open.spotify.com/embed/track/7LVHVU3tWfcxj5aiPFEW4Q", // Adele – Someone Like You
  "https://open.spotify.com/embed/track/0VjIjW4GlUZAMYd2vXMi3b", // The Weeknd – Blinding Lights
  "https://open.spotify.com/embed/track/3AJwUDP919kvQ9QcozQPxg", // Coldplay – Fix You
  "https://open.spotify.com/embed/track/4kflIGfjdZJW4ot2ioixTB", // Oasis – Wonderwall
  "https://open.spotify.com/embed/track/1EzrEOXmMH3G43AXT1y7pA", // Linkin Park – Leave Out All The Rest
  "https://open.spotify.com/embed/track/2RlgNHKcydI9sayD2Df2xp", // Green Day – Boulevard of Broken Dreams
  "https://open.spotify.com/embed/track/6dGnYIeXmHdcikdzNNDMm2", // Avril Lavigne – Complicated
  "https://open.spotify.com/embed/track/0eGsygTp906u18L0Oimnem", // Radiohead – Creep
  "https://open.spotify.com/embed/track/0FDzzruyVECATHXKHFs9eJ", // Snow Patrol – Chasing Cars
  "https://open.spotify.com/embed/track/1lDWb6b6ieDQ2xT7ewTC3G"  // Keane – Somewhere Only We Know
],
Romantic: [
  "https://open.spotify.com/embed/track/0tgVpDi06FyKpA1z0VMD4v", // Ed Sheeran – Perfect
  "https://open.spotify.com/embed/track/1dGr1c8CrMLDpV6mPbImSI", // Taylor Swift – Lover
  "https://open.spotify.com/embed/track/3U4isOIWM3VvDubwSI3y7a", // John Legend – All of Me
  "https://open.spotify.com/embed/track/7BqBn9nzAq8spo5e7cZ0dJ", // Bruno Mars – Just The Way You Are
  "https://open.spotify.com/embed/track/41CgzGD7xlgnJe14R4cqkL", // Lauv – Paris in the Rain
  "https://open.spotify.com/embed/track/6RUKPb4LETWmmr3iAEQktW", // The Chainsmokers – Something Just Like This
  "https://open.spotify.com/embed/track/4cktbXiXOapiLBMprHFErI", // Sam Smith – Stay With Me
  "https://open.spotify.com/embed/track/2VxeLyX666F8uXCJ0dZF8B", // James Arthur – Say You Won’t Let Go
  "https://open.spotify.com/embed/track/0At2qAoaVjIwWNAqrscXli", // Coldplay – Yellow
  "https://open.spotify.com/embed/track/5w9c2J52mkdntKOmRLeM2m"  // Stephen Sanchez – Until I Found You
]

  };

  //  Attach click listeners to buttons
  recommendationBlocks.forEach(block => {
    block.addEventListener("click", () => {
      const button = block.querySelector("button");
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

        musicPlayer.classList.add("show");
      } else {
        musicPlayer.innerHTML = `<p>No playlists found for <strong>${mood}</strong>.</p>`;
        musicPlayer.classList.add("show");
      }
    });
  });
});