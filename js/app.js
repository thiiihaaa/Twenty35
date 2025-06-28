const clientId = 'YOUR_CLIENT_ID';
const redirectUri = 'YOUR_REDIRECT_URI';
const scopes = 'user-read-private user-top-read playlist-read-private';

document.getElementById('loginBtn').addEventListener('click', () => {
  const authUrl =
    `https://accounts.spotify.com/authorize?client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=${encodeURIComponent(scopes)}&response_type=token`;
  window.location.href = authUrl;
});

window.onload = () => {
  const hash = window.location.hash;
  if (hash) {
    const token = hash
      .substring(1)
      .split('&')
      .find(el => el.startsWith('access_token'))
      .split('=')[1];
    
    fetch('https://api.spotify.com/v1/me', {
      headers: { Authorization: 'Bearer ' + token }
    })
      .then(res => res.json())
      .then(data => {
        document.getElementById('profile').innerHTML = `
          <h2>Hello, ${data.display_name}</h2>
          <img src="${data.images[0]?.url}" width="100"/>
        `;
      });
  }
};