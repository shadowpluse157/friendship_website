// Wait 3 seconds then show website

setTimeout(() => {

document.querySelector(".loader").style.display = "none";

document.querySelector("#home").style.display = "block";

},3000);


// Button animation

const btn = document.getElementById("enterBtn");

btn.addEventListener("click",()=>{

alert("Welcome to our little universe 🤍❤️");

});


// Floating Hearts

const hearts = document.getElementById("hearts");

setInterval(()=>{

const heart=document.createElement("div");

heart.innerHTML="🤍";

heart.style.position="absolute";

heart.style.left=Math.random()*100+"vw";

heart.style.top="100vh";

heart.style.fontSize=(20+Math.random()*25)+"px";

heart.style.opacity=Math.random();

heart.style.transition="all 6s linear";

hearts.appendChild(heart);

setTimeout(()=>{

heart.style.top="-10vh";

},50);

setTimeout(()=>{

heart.remove();

},6000);

},350);
