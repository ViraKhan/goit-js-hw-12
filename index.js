import{a as P,S as B,i as a}from"./assets/vendor-9md0t_4N.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&l(s)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();const M="https://pixabay.com/api/",R="51416080-d2904871fd7ba0d85f04cdd30",$=15;async function f(r,t){try{return(await P.get(M,{params:{key:R,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:$}})).data}catch{throw new Error("Failed to fetch images")}}const p=document.querySelector(".gallery"),h=document.querySelector(".loader"),y=document.querySelector(".btn-load");let d=null;function m(r){const t=r.map(({webformatURL:i,largeImageURL:l,tags:e,likes:o,views:s,comments:v,downloads:q})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${l}">
          <img
            class="gallery-image"
            src="${i}"
            alt="${e.split(",").slice(0,3).join(", ")}"
            loading="lazy"
          />
        </a>
        <div class="info">
          <p><b>Likes:</b> ${o}</p>
          <p><b>Views:</b> ${s}</p>
          <p><b>Comments:</b> ${v}</p>
          <p><b>Downloads:</b> ${q}</p>
        </div>
      </li>
    `).join("");p.insertAdjacentHTML("beforeend",t),d?d.refresh():d=new B(".gallery a",{captionsData:"alt",captionDelay:250})}function E(){p.innerHTML=""}function g(){h.classList.remove("is-hidden")}function b(){h.classList.add("is-hidden")}function L(){y.classList.remove("is-hidden")}function c(){y.classList.add("is-hidden")}const w=document.querySelector(".form"),H=w.elements["search-text"],O=document.querySelector(".btn-load");let u="",n=1,S=0;w.addEventListener("submit",_);O.addEventListener("click",x);async function _(r){r.preventDefault();const t=H.value.trim();if(!t){a.warning({message:"Введіть назву зображення!",position:"topRight"});return}u=t,n=1,E(),c(),g();try{const i=await f(u,n);if(S=i.totalHits,!i.hits.length){a.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"#ef4040",color:"#ffffff"});return}m(i.hits),n+=1,i.hits.length<15||i.totalHits<=15?c():L()}catch{a.error({message:"Сталася помилка при завантаженні зображень!",position:"topRight"})}finally{b()}}async function x(){c(),g();try{const r=await f(u,n);m(r.hits),n++,(n-1)*15>=S?(a.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),c()):L(),A()}catch{a.error({message:"Помилка при завантаженні наступної сторінки!",position:"topRight"})}finally{b()}}function A(){const r=document.querySelector(".gallery__item"),t=(r==null?void 0:r.getBoundingClientRect().height)||0;window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
