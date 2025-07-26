import{a as R,S as B,i as n}from"./assets/vendor-9md0t_4N.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&d(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function d(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const M="https://pixabay.com/api/",_="51416080-d2904871fd7ba0d85f04cdd30",$=15;async function g(t,r){try{return(await R.get(M,{params:{key:_,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:$}})).data}catch{throw new Error("Failed to fetch images")}}const m=document.querySelector(".gallery"),y=document.querySelector(".loader"),b=document.querySelector(".btn-load");let u=null;function L(t){const r=t.map(({webformatURL:s,largeImageURL:d,tags:e,likes:o,views:i,comments:P,downloads:E})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${d}">
          <img
            class="gallery-image"
            src="${s}"
            alt="${e.split(",").slice(0,3).join(", ")}"
            loading="lazy"
          />
        </a>
        <div class="info">
          <p><b>Likes:</b> ${o}</p>
          <p><b>Views:</b> ${i}</p>
          <p><b>Comments:</b> ${P}</p>
          <p><b>Downloads:</b> ${E}</p>
        </div>
      </li>
    `).join("");m.insertAdjacentHTML("beforeend",r),u?u.refresh():u=new B(".gallery a",{captionsData:"alt",captionDelay:250})}function O(){m.innerHTML=""}function w(){y.classList.remove("is-hidden")}function S(){y.classList.add("is-hidden")}function v(){b.classList.remove("is-hidden")}function f(){b.classList.add("is-hidden")}const q=document.querySelector(".form"),x=q.elements["search-text"],c=document.querySelector(".btn-load");let h="",a=1;const A=15;let p=0,l=0;q.addEventListener("submit",H);c.addEventListener("click",C);async function H(t){t.preventDefault();const r=x.value.trim();if(h=r,a=1,l=0,r===""){n.warning({message:"Введіть назву зображення!",position:"topRight"});return}O(),f(),w(),c.disabled=!0;try{const s=await g(h,a);if(p=s.totalHits,!s.hits.length){n.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"#ef4040",color:"#ffffff"});return}L(s.hits),l=s.hits.length,p>l?v():f(),a+=1}catch{n.error({message:"Сталася помилка при завантаженні зображень!",position:"topRight"})}finally{c.disabled=!1,S()}}async function C(){w(),c.disabled=!0;try{const t=await g(h,a);L(t.hits),l+=t.hits.length,l>=p||t.hits.length<A?(n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),f()):v(),a+=1,D()}catch{n.error({message:"Помилка при завантаженні наступної сторінки!",position:"topRight"})}finally{c.disabled=!1,S()}}function D(){const t=document.querySelector(".gallery__item"),r=(t==null?void 0:t.getBoundingClientRect().height)||0;window.scrollBy({top:r*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
