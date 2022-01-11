<script lang="ts">
  import { fade } from "svelte/transition";
  import { Buffer } from 'buffer';
  import axios from 'axios';

  let copiedTooltip: HTMLSpanElement;
  let userColor: { color: string; gradient: string };
  let musicStyle: { instrumental: string | null; energetic: string; happiness: string };
  let songs = new Array<string>();
  let isLoggedIn = false;
  let token: string;
  let logInURL = 'https://accounts.spotify.com/authorize';
  logInURL += '?response_type=token';
  logInURL += '&client_id=' + encodeURIComponent('e069de3022af4a738e103dfa452c80a2');
  logInURL += '&scope=user-top-read';
  logInURL +=
    '&redirect_uri=' + encodeURIComponent('https://euromoon.github.io/musicolor/callback');

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

  // roubei do stackoverflow ou algo assim, mínima ideia de como funciona
  function hslToHex(h: number, s: number, l: number): string {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n: number) => {
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
        // 25 ~ short term
        .get('https://api.spotify.com/v1/me/top/tracks?limit=15&time_range=short_term', {
          headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
        })
        .then((response) => {
          songs = response.data.items.slice(0, 10).map(m => m.name.toLowerCase());
          let ids: string[] = response.data.items.map((m) => m.id);
          axios
            .get(`https://api.spotify.com/v1/audio-features?ids=${ids.join(',')}`, {
              headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
            })
            .then((fResponse) => {
              let features = fResponse.data.audio_features;

              let sadnessArray: number[] = features.map((a) => 1 - a.valence);
              let sadness = sadnessArray.reduce((a, b) => a + b, 0) / sadnessArray.length;
              
              let energies: number[] = features.map((a) => a.energy);
              let energy = energies.reduce((a, b) => a + b, 0) / energies.length;

              let loudnessArray: number[] = features.map((a) => (a.loudness + 60) / 60);
              let loudness = loudnessArray.reduce((a, b) => a + b, 0) / loudnessArray.length;
              console.log(loudness);
              
              let hue = Math.round(energy * 360);
              let sat = Math.round(loudness * 100);
              let light = Math.round((1 - sadness) * 100);

              musicStyle = {
                instrumental: loudness >= 0.5 ? 'loud' : 'quiet',
                energetic: sadness <= 0.5 ? 'happy' : 'melancholic',
                happiness: energy >= 0.5 ? 'energetic' : 'chill'
              };

              resolve({
                color: hslToHex(hue, sat, light),
                gradient: hslToHex(hue, sat, light * 0.6),
              });
            });
        });
    });
  }

  function copyColor(): void {
    copiedTooltip.classList.remove('invisible');
    navigator.clipboard.writeText(userColor.color);
    copiedTooltip.style.opacity = '0%';
    let translate = { x : Math.random() * 100, y: (Math.random() * 1.5 - 1) * 100 };
    let gravity = 0.1;
    copiedTooltip.style.transform = `translate(${translate.x}%, ${translate.y}%)`;
    let fallOutInterval = setInterval(() => {
      translate.y += gravity;
      gravity += 0.1;
      copiedTooltip.style.transform = `translate(${translate.x}%, ${translate.y}%)`;
    }, 10);
    setTimeout(() => {
      copiedTooltip.classList.add('invisible');
      copiedTooltip.style.opacity = '100%';
      clearInterval(fallOutInterval);
    }, 500);
  }

  // check for tokens and change isLoggedIn accordlingly
  setUpIsLoggedIn();
  // and do it every time the localStorage changes
  window.addEventListener('storage', setUpIsLoggedIn);

  $: if (isLoggedIn) {
    getUserColor().then((hex) => { userColor = hex; });
  }
</script>

<svelte:head>
  <title>musicolor</title>
</svelte:head>

<main class="w-full h-full flex flex-col justify-center items-center">
  {#if isLoggedIn}
    <span class="text-3xl text-center font-tw drop-shadow mb-2">
      {#if userColor}
        your musicolor is <span on:click={copyColor}
        class="font-bold relaive group cursor-pointer"
        style="color: {userColor.color}; -webkit-tap-highlight-color: transparent;"
        ><span class="transition-opacity ease-in-out duration-500 invisible text-sm rounded font-normal absolute p-1 bg-white text-black"
        bind:this={copiedTooltip}>copied!</span>{userColor.color}</span>
      {:else}
        getting your musicolors &lt;3
      {/if}
    </span>
  {/if}
  <div
    class="overflow-hidden font-tw p-5 rounded-lg shadow-lg aspect-square{isLoggedIn ? '' : ' frame'}"
    style="width: 33vh; background: {userColor
      ? `linear-gradient(238deg, ${userColor.color}, ${userColor.gradient})`
      : 'linear-gradient(238deg, #9700fd, #003dfd)'};"
  >
    {#each songs as song, i}
      <span transition:fade class="text-2xl w-full opacity-20 text-white block {i % 2 == 0 ? 'text-left' : 'text-right'}">{song}</span>
    {/each}
  </div>
  {#if !isLoggedIn}
    <a
      href={logInURL}
      target="_blank"
      class="cursor-pointer text-xl text-center font-tw group"
      style="width: 33vh"
      >log in with <span class="text-green-600 font-bold">spotify</span> to see
      your musicolors :)</a
    >
  {/if}
</main>
{#if musicStyle}
  <span class="absolute bottom-5 w-full text-center"
    >your style is {musicStyle.energetic}, {musicStyle.instrumental} and {musicStyle.happiness} :)</span
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
