const menuButton=document.querySelector(".menu-toggle");
const nav=document.querySelector(".nav-links");
menuButton?.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuButton.setAttribute("aria-expanded",String(open));menuButton.textContent=open?"×":"☰";});
nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menuButton?.setAttribute("aria-expanded","false");if(menuButton)menuButton.textContent="☰";}));
const year=document.getElementById("year");
if(year)year.textContent=new Date().getFullYear();

// Corner notifications rotate through owner-supplied customer feedback and factual
// product details. They are not represented as live or recent purchases.
const toast=document.querySelector(".promo-toast");
const toastCopy=toast?.querySelector(".toast-copy");
const dismiss=toast?.querySelector("button");
const messages=[
 {name:"Rohith",text:"Great quality, highly recommend for anyone getting started."},
 {name:"Abhi",text:"Excellent quality videos and nice content."},
 {name:"Vishal M",text:"Everything perfect! I recommend it to everyone."},
 {name:"Ishaan",text:"Incredible, truly incredible, it's too good!"},
 {name:"Vihaan",text:"Bundle is exactly what I expected."},
 {name:"Karan",text:"Great value for the price! Huge collection of reels and very useful for faceless content."},
 {label:"Inside the bundle",text:"2000+ cartoon videos in one digital collection."},
 {label:"Video formats",text:"Short and long formats for Reels and YouTube."},
 {label:"Instant access",text:"Google Drive download link after successful payment."},
 {label:"One-time price",text:"Get the bundle for ₹99. No monthly subscription."}
];
let closed=false,idx=0,hideTimer=null;
function showNotification(){
 if(closed||!toast||!toastCopy)return;
 const item=messages[idx%messages.length];
 toastCopy.innerHTML=item.name
   ? `<b>${item.name}</b><small class="toast-label">Customer feedback</small><span>“${item.text}”</span>`
   : `<b>${item.label}</b><span>${item.text}</span>`;
 toast.classList.remove("bottom-left","top-left","show");
 toast.classList.add(["","bottom-left","top-left"][idx%3]);
 idx++;
 // Force layout before adding the visible state so the transition always starts.
 toast.style.display="flex";
 void toast.offsetWidth;
 toast.classList.add("show");
 if(hideTimer)clearTimeout(hideTimer);
 hideTimer=window.setTimeout(()=>toast.classList.remove("show"),7000);
}
dismiss?.addEventListener("click",()=>{closed=true;toast?.classList.remove("show");if(hideTimer)clearTimeout(hideTimer);});
if(toast&&toastCopy){
 window.setTimeout(showNotification,1800);
 window.setInterval(showNotification,12000);
}

// Popup appears after the visitor scrolls approximately 32% down the page, once per tab session.
const popupBackdrop=document.getElementById("bundlePopupBackdrop");
const popupClose=document.getElementById("bundlePopupClose");
const popupTimer=document.getElementById("bundlePopupTimer");
const popupCheckout=popupBackdrop?.querySelector(".bundle-popup-cta");
let popupShown=false,popupCountdownInterval=null,popupSecondsRemaining=600;
function updatePopupTimer(){if(!popupTimer)return;const mins=Math.floor(popupSecondsRemaining/60),secs=popupSecondsRemaining%60;popupTimer.textContent=`${String(mins).padStart(2,"0")}:${String(secs).padStart(2,"0")}`;}
function isPopupAlreadyShown(){try{return sessionStorage.getItem("skillkartBundlePopupShown")==="1";}catch(error){return false;}}
function markPopupShown(){try{sessionStorage.setItem("skillkartBundlePopupShown","1");}catch(error){}}
function openBundlePopup(){
 if(!popupBackdrop||popupShown||isPopupAlreadyShown())return;
 popupShown=true;markPopupShown();popupBackdrop.hidden=false;popupBackdrop.style.display="";popupBackdrop.classList.add("show");popupBackdrop.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";updatePopupTimer();popupClose?.focus();
 popupCountdownInterval=window.setInterval(()=>{popupSecondsRemaining=Math.max(0,popupSecondsRemaining-1);updatePopupTimer();if(popupSecondsRemaining===0)window.clearInterval(popupCountdownInterval);},1000);
}
function closeBundlePopup(){
 if(!popupBackdrop)return;
 popupBackdrop.classList.remove("show");
 popupBackdrop.setAttribute("aria-hidden","true");
 popupBackdrop.hidden=true;
 popupBackdrop.style.display="none";
 document.body.style.overflow="";
 document.body.style.position="";
 if(popupCountdownInterval){window.clearInterval(popupCountdownInterval);popupCountdownInterval=null;}
}
popupClose?.addEventListener("click",closeBundlePopup);
const popupCancel=document.getElementById("bundlePopupCancel");
popupCancel?.addEventListener("click",event=>{
 event.preventDefault();
 closeBundlePopup();
});
popupBackdrop?.addEventListener("click",event=>{if(event.target===popupBackdrop)closeBundlePopup();});
document.addEventListener("keydown",event=>{if(event.key==="Escape"&&popupBackdrop?.classList.contains("show"))closeBundlePopup();});

window.addEventListener("scroll",()=>{if(popupShown||isPopupAlreadyShown())return;const total=document.documentElement.scrollHeight-window.innerHeight;if(total>0&&window.scrollY/total>=.32)openBundlePopup();},{passive:true});

// Countdown banner clock: counts down to the next midnight in the visitor's local time.
(function initMidnightBannerCountdown(){
 const hoursEl=document.getElementById("midnightHours");
 const minutesEl=document.getElementById("midnightMinutes");
 const secondsEl=document.getElementById("midnightSeconds");
 if(!hoursEl||!minutesEl||!secondsEl)return;
 function tick(){
   const now=new Date();
   const midnight=new Date(now);
   midnight.setHours(24,0,0,0);
   let remaining=Math.max(0,Math.floor((midnight.getTime()-now.getTime())/1000));
   const hours=Math.floor(remaining/3600);
   remaining%=3600;
   const minutes=Math.floor(remaining/60);
   const seconds=remaining%60;
   hoursEl.textContent=String(hours).padStart(2,"0");
   minutesEl.textContent=String(minutes).padStart(2,"0");
   secondsEl.textContent=String(seconds).padStart(2,"0");
 }
 tick();
 window.setInterval(tick,1000);
})();



// Mobile tap feedback for the countdown banner CTA (touch devices have no hover state).
(function enableMidnightCtaTouchFeedback(){
 const cta=document.querySelector(".midnight-cta-button");
 if(!cta)return;
 let clearFeedbackTimer=null;
 const showFeedback=()=>{
   cta.classList.add("touch-hover");
   if(clearFeedbackTimer)window.clearTimeout(clearFeedbackTimer);
   clearFeedbackTimer=window.setTimeout(()=>cta.classList.remove("touch-hover"),1100);
 };
 cta.addEventListener("pointerdown",event=>{
   if(event.pointerType==="touch"||event.pointerType==="pen")showFeedback();
 },{passive:true});
 cta.addEventListener("touchstart",showFeedback,{passive:true});
})();
