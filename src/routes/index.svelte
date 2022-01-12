<script lang="ts">
  import { fade } from "svelte/transition";
  import { Buffer } from 'buffer';
  import Download from '../components/download.svelte';
  import chroma from 'chroma-js';
  import axios from 'axios';

  let rangeData = new Array<{
    colorData: { color: string; gradient: string; };
    songs: string[],
    musicStyle: { loudness: string, energetic: string, happiness: string }
  }>();

  let userColor: { color: string; gradient: string };
  let musicStyle: { loudness: string | null; energetic: string; happiness: string };
  let songs = new Array<string>();
  let isLoggedIn = false;
  let token: string;
  let username: string;
  let range = 2;
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

  function getRangeFromIndex(index: number): string
  {
    switch (index)
    {
      case 0:
        return 'short_term';
      case 1:
        return 'medium_term';
      case 2:
        return 'long_term';
    }
  }

  async function getUserColor(term: number): Promise<{ color: string; gradient: string }> {
    return new Promise((resolve) => {
      axios.get('https://api.spotify.com/v1/me', {
          headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
        })
        .then(response => {
          username = response.data.display_name + '\'';
          if (!username.endsWith('s')) username += 's';
        });
      // 15 ~ short term
      axios
        .get(`https://api.spotify.com/v1/me/top/tracks?limit=15&time_range=${getRangeFromIndex(term)}`, {
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
              
              let energies: number[] = features.map((a) => a.energy);
              let energy = energies.reduce((a, b) => a + b, 0) / energies.length;
              
              let loudnessArray: number[] = features.map((a) => (a.loudness + 60) / 60);
              let loudness = loudnessArray.reduce((a, b) => a + b, 0) / loudnessArray.length;

              let sadnessArray: number[] = features.map((a) => 1 - a.valence);
              let sadness = sadnessArray.reduce((a, b) => a + b, 0) / sadnessArray.length;
              
              let hue = Math.round((1 - energy) * 360);

              let colorData = {
                color: chroma.hsl(hue, loudness, sadness).hex(),
                gradient: chroma.hsl(hue, loudness, sadness * 0.6).hex(),
              };

              musicStyle = {
                loudness: loudness >= 0.5 ? 'loud' : 'quiet',
                energetic: sadness <= 0.5 ? 'happy' : 'melancholic',
                happiness: energy >= 0.5 ? 'energetic' : 'chill'
              };

              rangeData[term] = { colorData, songs, musicStyle };

              resolve(colorData);
            });
        });
    });
  }

  function copyColor(event: MouseEvent): void {
    navigator.clipboard.writeText(userColor.color);

    let target = event.target as HTMLSpanElement;
    let span = document.createElement('span');
    let translate = { x : Math.random() * 100, y: (Math.random() * 1.5 - 1) * 100 };
    span.classList.add(
      'text-xl',
      'rounded',
      'absolute',
      'p-1',
      'text-white',
      'left-1/2'
    );
    span.textContent = 'copied!';
    target.appendChild(span);
    let animation = span.animate([
      {
        opacity: 1,
        transform: `translate(${translate.x}%, ${translate.y}%)`,
      },
      {
        opacity: 0,
        transform: `translate(${translate.x}%, ${translate.y + 10}%)`,
      },
    ], {
      duration: 500,
      easing: 'ease-in-out',
    });
    animation.addEventListener('finish', () => span.remove());
  }

  function setRange(event: MouseEvent)
  {
    let el = event.target as HTMLSpanElement;
    range = parseInt(el.getAttribute('data-range'));
  }

  // check for tokens and change isLoggedIn accordlingly
  setUpIsLoggedIn();
  // and do it every time the localStorage changes
  window.addEventListener('storage', setUpIsLoggedIn);

  $: if (isLoggedIn && range != null) {
    if (rangeData[range] != null)
    {
      userColor = rangeData[range].colorData;
      songs = rangeData[range].songs;
      musicStyle = rangeData[range].musicStyle;
    } else
    {  
      getUserColor(range).then((hex) => { userColor = hex; });
    }
  }
</script>

<svelte:head>
  <title>musicolor</title>
</svelte:head>

<main class="w-full h-full flex flex-col justify-center items-center font-ttw">
  {#if userColor}
    <div class="absolute top-5">
      <span
        on:click={setRange}
        data-range=0
        class="transition-colors py-1 px-3{ range == 0 ? ' bg-white text-slate-900': '' } rounded-l cursor-pointer">last month</span>
      <span
        on:click={setRange}
        data-range=1
        class="transition-colors py-1 px-3{ range == 1 ? ' bg-white text-slate-900': '' } cursor-pointer">last 6 months</span>
      <span
        on:click={setRange}
        data-range=2
        class="transition-colors py-1 px-3{ range == 2 ? ' bg-white text-slate-900': '' } rounded-r cursor-pointer">all time</span>
    </div>
  {/if}

  <div
    class="group relative mb-5 overflow-hidden font-tw p-5 rounded-lg shadow-lg aspect-square{isLoggedIn ? '' : ' frame'}"
    style="width: 33vh; background: {userColor
      ? `linear-gradient(238deg, ${userColor.color}, ${userColor.gradient})`
      : 'linear-gradient(238deg, #9700fd, #003dfd)'};"
    >
      <div class="absolute top-2 right-2 cursor-pointer transition-opacity opacity-0 group-hover:opacity-100">
        <Download />
      </div>
      {#each songs as song, i}
        <span transition:fade class="text-2xl w-full opacity-20 text-white block {i % 2 == 0 ? 'text-left' : 'text-right'}">{song}</span>
      {/each}
  </div>
  {#if isLoggedIn}
    <span class="text-3xl text-center font-tw drop-shadow mb-2" style="width: 33vh;">
      {#if userColor}
        the color of {username} music is <span on:click={copyColor}
        class="font-bold relaive group cursor-pointer"
        style="color: {userColor.color};"
        >{userColor.color}</span>
      {:else}
        getting your musicolors &lt;3
      {/if}
    </span>
  {:else}
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
    >your style is {musicStyle.energetic}, {musicStyle.loudness} and {musicStyle.happiness} :)</span
  >
{/if}

<style>
  /* create an animation */
  @keyframes fade {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  .frame {
    background: linear-gradient(#9700fd, rgb(88, 42, 255));
  }
</style>
