import{S as le,i as se,s as ae,e as M,c as N,a as T,d as p,b as E,f as A,t as w,g as k,I as b,h as R,K as z,j as U,k as F,L as oe,l as q,J as D,M as ne,N as ie,O as x,P as re,Q as G}from"../chunks/vendor-a8219b39.js";function W(n,t,l){const a=n.slice();return a[12]=t[l],a[14]=l,a}function X(n){let t;function l(e,o){return e[2]?fe:ce}let a=l(n),i=a(n);return{c(){t=M("span"),i.c(),this.h()},l(e){t=N(e,"SPAN",{class:!0});var o=T(t);i.l(o),o.forEach(p),this.h()},h(){E(t,"class","text-3xl text-center font-tw drop-shadow mb-2 svelte-efzwv")},m(e,o){A(e,t,o),i.m(t,null)},p(e,o){a===(a=l(e))&&i?i.p(e,o):(i.d(1),i=a(e),i&&(i.c(),i.m(t,null)))},d(e){e&&p(t),i.d()}}}function ce(n){let t;return{c(){t=w("getting your musicolors <3")},l(l){t=k(l,"getting your musicolors <3")},m(l,a){A(l,t,a)},p:D,d(l){l&&p(t)}}}function fe(n){let t,l,a,i,e=n[2].color+"",o,r,v;return{c(){t=w("your musicolor is "),l=M("span"),a=M("span"),i=w("copied!"),o=w(e),this.h()},l(f){t=k(f,"your musicolor is "),l=N(f,"SPAN",{class:!0,style:!0});var m=T(l);a=N(m,"SPAN",{class:!0});var S=T(a);i=k(S,"copied!"),S.forEach(p),o=k(m,e),m.forEach(p),this.h()},h(){E(a,"class","invisible text-sm rounded font-normal absolute -right-1 translate-x-full p-1 bg-white text-black"),E(l,"class","font-bold relaive group cursor-pointer"),z(l,"color",n[2].color)},m(f,m){A(f,t,m),A(f,l,m),b(l,a),b(a,i),n[7](a),b(l,o),r||(v=ie(l,"click",n[6]),r=!0)},p(f,m){m&4&&e!==(e=f[2].color+"")&&R(o,e),m&4&&z(l,"color",f[2].color)},d(f){f&&p(t),f&&p(l),n[7](null),r=!1,v()}}}function Y(n){let t,l=n[12]+"",a,i;return{c(){t=M("span"),a=w(l),this.h()},l(e){t=N(e,"SPAN",{class:!0});var o=T(t);a=k(o,l),o.forEach(p),this.h()},h(){E(t,"class",i="text-2xl w-full opacity-20 text-white block "+(n[14]%2==0?"text-left":"text-right"))},m(e,o){A(e,t,o),b(t,a)},p(e,o){o&16&&l!==(l=e[12]+"")&&R(a,l)},d(e){e&&p(t)}}}function Z(n){let t,l,a,i,e;return{c(){t=M("a"),l=w("log in with "),a=M("span"),i=w("spotify"),e=w(` to see
      your musicolors :)`),this.h()},l(o){t=N(o,"A",{href:!0,target:!0,class:!0,style:!0});var r=T(t);l=k(r,"log in with "),a=N(r,"SPAN",{class:!0});var v=T(a);i=k(v,"spotify"),v.forEach(p),e=k(r,` to see
      your musicolors :)`),r.forEach(p),this.h()},h(){E(a,"class","text-green-600 font-bold"),E(t,"href",n[5]),E(t,"target","_blank"),E(t,"class","cursor-pointer text-xl text-center font-tw group svelte-efzwv"),z(t,"width","33vh")},m(o,r){A(o,t,r),b(t,l),b(t,a),b(a,i),b(t,e)},p(o,r){r&32&&E(t,"href",o[5])},d(o){o&&p(t)}}}function $(n){let t,l,a=n[3].dancable+"",i,e,o=n[3].energetic+"",r,v,f=n[3].happiness+"",m,S;return{c(){t=M("span"),l=w("your style is "),i=w(a),e=w(", "),r=w(o),v=w(" and "),m=w(f),S=w(" :)"),this.h()},l(c){t=N(c,"SPAN",{class:!0});var d=T(t);l=k(d,"your style is "),i=k(d,a),e=k(d,", "),r=k(d,o),v=k(d," and "),m=k(d,f),S=k(d," :)"),d.forEach(p),this.h()},h(){E(t,"class","absolute bottom-5 w-full text-center")},m(c,d){A(c,t,d),b(t,l),b(t,i),b(t,e),b(t,r),b(t,v),b(t,m),b(t,S)},p(c,d){d&8&&a!==(a=c[3].dancable+"")&&R(i,a),d&8&&o!==(o=c[3].energetic+"")&&R(r,o),d&8&&f!==(f=c[3].happiness+"")&&R(m,f)},d(c){c&&p(t)}}}function ue(n){let t,l,a,i,e,o,r,v,f,m,S,c=n[0]&&X(n),d=n[4],u=[];for(let s=0;s<d.length;s+=1)u[s]=Y(W(n,d,s));let h=!n[0]&&Z(n),y=n[3]&&$(n);return{c(){t=U(),l=M("h1"),a=w("musicolor"),i=U(),e=M("main"),c&&c.c(),o=U(),r=M("div");for(let s=0;s<u.length;s+=1)u[s].c();f=U(),h&&h.c(),m=U(),y&&y.c(),S=F(),this.h()},l(s){oe('[data-svelte="svelte-7uar8o"]',document.head).forEach(p),t=q(s),l=N(s,"H1",{class:!0});var _=T(l);a=k(_,"musicolor"),_.forEach(p),i=q(s),e=N(s,"MAIN",{class:!0});var C=T(e);c&&c.l(C),o=q(C),r=N(C,"DIV",{class:!0,style:!0});var B=T(r);for(let L=0;L<u.length;L+=1)u[L].l(B);B.forEach(p),f=q(C),h&&h.l(C),C.forEach(p),m=q(s),y&&y.l(s),S=F(),this.h()},h(){document.title="musicolor",E(l,"class","text-3xl m-5 self-start justify-self-start absolute"),E(r,"class",v="overflow-hidden font-tw p-5 rounded-lg shadow-lg aspect-square"+(n[0]?"":" frame")+" svelte-efzwv"),z(r,"width","33vh"),z(r,"background",n[2]?`linear-gradient(238deg, ${n[2].color}, ${n[2].gradient})`:"linear-gradient(238deg, #9700fd, #003dfd)"),E(e,"class","w-full h-full flex flex-col justify-center items-center")},m(s,g){A(s,t,g),A(s,l,g),b(l,a),A(s,i,g),A(s,e,g),c&&c.m(e,null),b(e,o),b(e,r);for(let _=0;_<u.length;_+=1)u[_].m(r,null);b(e,f),h&&h.m(e,null),A(s,m,g),y&&y.m(s,g),A(s,S,g)},p(s,[g]){if(s[0]?c?c.p(s,g):(c=X(s),c.c(),c.m(e,o)):c&&(c.d(1),c=null),g&16){d=s[4];let _;for(_=0;_<d.length;_+=1){const C=W(s,d,_);u[_]?u[_].p(C,g):(u[_]=Y(C),u[_].c(),u[_].m(r,null))}for(;_<u.length;_+=1)u[_].d(1);u.length=d.length}g&1&&v!==(v="overflow-hidden font-tw p-5 rounded-lg shadow-lg aspect-square"+(s[0]?"":" frame")+" svelte-efzwv")&&E(r,"class",v),g&4&&z(r,"background",s[2]?`linear-gradient(238deg, ${s[2].color}, ${s[2].gradient})`:"linear-gradient(238deg, #9700fd, #003dfd)"),s[0]?h&&(h.d(1),h=null):h?h.p(s,g):(h=Z(s),h.c(),h.m(e,null)),s[3]?y?y.p(s,g):(y=$(s),y.c(),y.m(S.parentNode,S)):y&&(y.d(1),y=null)},i:D,o:D,d(s){s&&p(t),s&&p(l),s&&p(i),s&&p(e),c&&c.d(),ne(u,s),h&&h.d(),s&&p(m),y&&y.d(s),s&&p(S)}}}function ee(n,t,l){l/=100;const a=t*Math.min(l,1-l)/100,i=e=>{const o=(e+n/30)%12,r=l-a*Math.max(Math.min(o-3,9-o,1),-1);return Math.round(255*r).toString(16).padStart(2,"0")};return`#${i(0)}${i(8)}${i(4)}`}function pe(n,t,l){let a,i,e,o=new Array,r=!1,v,f="https://accounts.spotify.com/authorize";f+="?response_type=token",f+="&client_id="+encodeURIComponent("e069de3022af4a738e103dfa452c80a2"),f+="&scope=user-top-read",f+="&redirect_uri="+encodeURIComponent("https://euromoon.github.io/musicolor/callback");function m(){let u=localStorage.getItem("token"),h=localStorage.getItem("expireTime");u&&h&&(console.log(Date.now(),parseInt(x.Buffer.from(h,"base64").toString())),Date.now()>parseInt(x.Buffer.from(h,"base64").toString())?localStorage.clear():(v=x.Buffer.from(u,"base64").toString(),l(0,r=!0)))}async function S(){return new Promise(u=>{G.get("https://api.spotify.com/v1/me/top/tracks?limit=25&time_range=short_term",{headers:{Authorization:"Bearer "+v,"Content-Type":"application/json"}}).then(h=>{l(4,o=h.data.items.slice(0,10).map(s=>s.name.toLowerCase()));let y=h.data.items.map(s=>s.id);G.get(`https://api.spotify.com/v1/audio-features?ids=${y.join(",")}`,{headers:{Authorization:"Bearer "+v,"Content-Type":"application/json"}}).then(s=>{let g=s.data.audio_features,_=g.map(I=>I.danceability),C=_.reduce((I,P)=>I+P,0)/_.length,B=g.map(I=>1-I.valence),L=B.reduce((I,P)=>I+P,0)/B.length;l(3,e={dancable:"",energetic:"",happiness:""});let j;C>.5&&L<.5?(j={min:40,max:115},l(3,e.dancable="dancable",e),l(3,e.happiness="happy",e)):C>.5&&L>.5?(l(3,e.dancable="dancable",e),l(3,e.happiness="emotional",e),j={min:180,max:270}):(l(3,e.dancable="calming",e),l(3,e.happiness="emotional",e),j={min:0,max:30});let H=g.map(I=>I.energy),J=H.reduce((I,P)=>I+P,0)/H.length;J>=.5?l(3,e.energetic="energetic",e):l(3,e.energetic="relaxing",e);let K=Math.round(J*(j.max-j.min)+j.min),O=g.map(I=>1-I.instrumentalness),te=O.reduce((I,P)=>I+P,0)/O.length,Q=Math.round(te*100),V=Math.round((1-L)*100);u({color:ee(K,Q,V),gradient:ee(K,Q,V*.6)})})})})}function c(){a.classList.remove("invisible"),navigator.clipboard.writeText(i.color),setTimeout(()=>{a.classList.add("invisible")},500)}m(),window.addEventListener("storage",m);function d(u){re[u?"unshift":"push"](()=>{a=u,l(1,a)})}return n.$$.update=()=>{n.$$.dirty&1&&r&&S().then(u=>{l(2,i=u)})},[r,a,i,e,o,f,c,d]}class he extends le{constructor(t){super();se(this,t,pe,ue,ae,{})}}export{he as default};