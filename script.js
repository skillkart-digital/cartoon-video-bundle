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
