<script lang="ts">
  import { Buffer } from 'buffer';
  // import init, { get_img_height } from '../proeminent-color/proeminent_color';
  import axios from 'axios';

  let frame: HTMLDivElement;
  let userColor: { color: string; gradient: string };
  let musicStyle: { dancable: string; energetic: string; happiness: string };
  let isLoggedIn = false;
  let token: string;
  let loading = false;
  let logInURL = 'https://accounts.spotify.com/authorize';
  logInURL += '?response_type=token';
  logInURL += '&client_id=' + encodeURIComponent('e069de3022af4a738e103dfa452c80a2');
  logInURL += '&scope=user-top-read';
  logInURL += '&redirect_uri=' + encodeURIComponent('https://euromoon.github.io/musicolor/callback');

  function setUpIsLoggedIn(): void {
    let newToken = localStorage.getItem('token');
    let expireTime = localStorage.getItem('expireTime');
    if (newToken && expireTime) {
      console.log(Date.now(), parseInt(Buffer.from(expireTime, 'base64').toString()));
      if (Date.now() > parseInt(Buffer.from(expireTime, 'base64').toString())) {
        localStorage.clear();
      } else {
        token = Buffer.from(newToken, 'base64').toString();
        isLoggedIn = true;
      }
    }
  }

  function hslToHex(h, s, l) {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  async function getUserColor(): Promise<{ color: string; gradient: string }> {
    return new Promise((resolve) => {
      axios
        .get('https://api.spotify.com/v1/me/top/tracks?limit=25&time_range=short_term', {
          headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
        })
        .then((response) => {
          let ids: string[] = response.data.items.map((m) => m.id);
          axios
            .get(`https://api.spotify.com/v1/audio-features?ids=${ids.join(',')}`, {
              headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
            })
            .then((fResponse) => {
              let features = fResponse.data.audio_features;

              let danceabilities: number[] = features.map((a) => a.danceability);
              let danceability = danceabilities.reduce((a, b) => a + b, 0) / danceabilities.length;

              let sadnesses: number[] = features.map((a) => 1 - a.valence);
              let sadness = sadnesses.reduce((a, b) => a + b, 0) / sadnesses.length;

              musicStyle = { dancable: '', energetic: '', happiness: '' };

              let hueRange: { min: number; max: number };
              // dancável e feliz: amarelo ~ verde
              // dancável e triste: azul
              // não dancável e triste: vermelho
              if (danceability > 0.5 && sadness < 0.5) {
                hueRange = { min: 40, max: 115 };
                musicStyle.dancable = 'dancable';
                musicStyle.happiness = 'happy';
              } else if (danceability > 0.5 && sadness > 0.5) {
                musicStyle.dancable = 'dancable';
                musicStyle.happiness = 'emotional';
                hueRange = { min: 180, max: 270 };
              } else {
                musicStyle.dancable = 'calming';
                musicStyle.happiness = 'emotional';
                hueRange = { min: 0, max: 30 };
              }

              let energies = features.map((a) => a.energy);
              let energy = energies.reduce((a, b) => a + b, 0) / energies.length;
              if (energy >= 0.5)
              {
                musicStyle.energetic = 'energetic';
              }
              else
              {
                musicStyle.energetic = 'relaxing';
              }

              let hue = Math.round(energy * (hueRange.max - hueRange.min) + hueRange.min);
              let sat = Math.round(danceability * 100);
              let light = Math.round((1 - sadness) * 100);

              resolve({
                color: hslToHex(hue, sat, light),
                gradient: hslToHex(hue, sat, light * 0.6),
              });
            });
        });
    });
  }

  // check for tokens and change isLoggedIn accordlingly
  setUpIsLoggedIn();
  // and do it every time the localStorage changes
  window.addEventListener('storage', setUpIsLoggedIn);

  /* window.addEventListener('mousemove', (event) => {
    frame.style.backgroundPosition = `${(event.clientX * 100) / window.outerWidth}% ${
      (event.clientY * 100) / window.outerHeight
    }%`;
  });
 */
  $: if (isLoggedIn) {
    loading = true;
    getUserColor().then((hex) => {
      userColor = hex;
      loading = false;
    });
  }
</script>

<svelte:head>
  <title>musicolor</title>
</svelte:head>

<h1 class="text-3xl m-5 self-start justify-self-start absolute">musicolor</h1>
<main class="w-full h-full flex flex-col justify-center items-center">
  {#if userColor}
    <span class="text-3xl text-center font-tw drop-shadow mb-2">your musicolor is:</span>
  {/if}
  <div
    class="rounded-lg shadow-lg aspect-square{isLoggedIn ? '' : ' frame'}"
    bind:this={frame}
    style="width: 33vh; background: {userColor
      ? `linear-gradient(238deg, ${userColor.color}, ${userColor.gradient})`
      : 'linear-gradient(238deg, #9700fd, #003dfd)'};"
  />
  {#if loading}
    <span>loading... wait a minute &lt;3</span>
  {:else if isLoggedIn}
    <span class="text-2xl text-center font-tw">{userColor.color}</span>
  {:else}
    <a
      href={logInURL}
      target="_blank"
      class="cursor-pointer text-xl text-center font-tw group"
      style="width: 33vh"
      >log in with <span class="group-hover:text-green-600 group-hover:font-bold">spotify</span> to see
      your musicolors :)</a
    >
  {/if}
</main>
{#if musicStyle}
  <span class="absolute bottom-5 w-full text-center"
    >your style is {musicStyle.dancable}, {musicStyle.energetic} and {musicStyle.happiness} :)</span
  >
{/if}

<style>
  @import url('https://fonts.googleapis.com/css2?family=Titillium+Web&display=swap');

  .frame {
    background: linear-gradient(#9700fd, rgb(88, 42, 255));
  }

  .font-tw {
    font-family: 'Titillium Web', sans-serif;
  }
</style>
