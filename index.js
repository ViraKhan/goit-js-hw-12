import{a as m,S as g,i as a}from"./assets/vendor-Cip_4kvj.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const y="https://pixabay.com/api/",h="51416080-d2904871fd7ba0d85f04cdd30";function b(o){return m.get(y,{params:{key:h,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(r=>r.data)}const u=document.querySelector(".gallery"),f=document.querySelector(".loader");let l=null;function L(o){const r=o.map(({webformatURL:i,largeImageURL:n,tags:e,likes:t,views:s,comments:d,downloads:p})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${n}">
          <img
            class="gallery-image"
            src="${i}"
            alt="${e.split(",").slice(0,3).join(", ")}"
            loading="lazy"
          />
        </a>
        <div class="info">
          <p><b>Likes:</b> ${t}</p>
          <p><b>Views:</b> ${s}</p>
          <p><b>Comments:</b> ${d}</p>
          <p><b>Downloads:</b> ${p}</p>
        </div>
      </li>
    `).join("");u.innerHTML=r,l?l.refresh():l=new g(".gallery a",{captionsData:"alt",captionDelay:250})}function S(){u.innerHTML=""}function v(){f.classList.remove("is-hidden")}function q(){f.classList.add("is-hidden")}const c=document.querySelector(".form"),$=c.elements["search-text"];c.addEventListener("submit",w);function w(o){o.preventDefault();const r=$.value.trim();if(!r){a.warning({message:"Введіть назву зображення!",position:"topRight"});return}S(),v(),b(r).then(i=>{if(!i.hits.length){a.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"#ef4040",color:"#ffffff"});return}L(i.hits)}).catch(()=>{a.error({message:"Сталася помилка при завантаженні зображень!",position:"topRight"})}).finally(()=>{q(),c.reset()})}
//# sourceMappingURL=index.js.map
