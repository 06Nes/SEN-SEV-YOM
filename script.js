<script>

// kalpler
const hearts = document.getElementById("hearts");

for(let i=0;i<60;i++){
    const h = document.createElement("div");
    h.className = "heart";
    h.innerHTML = "❤";
    h.style.left = Math.random()*100+"%";
    h.style.top = Math.random()*100+"%";
    h.style.animationDelay = Math.random()*5+"s";
    hearts.appendChild(h);
}

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const area = document.getElementById("area");
const card = document.querySelector(".card");
const result = document.getElementById("result");

/* =========================
   HAYIR BUTONU AI KAÇIŞ
========================= */

function moveNo(){

    const areaRect = area.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    const yesRect = yesBtn.getBoundingClientRect();

    let x, y;
    let safe = false;

    let attempts = 0;

    while(!safe && attempts < 50){

        attempts++;

        x = Math.random() * (areaRect.width - btnRect.width);
        y = Math.random() * (areaRect.height - btnRect.height);

        const noCenterX = x + btnRect.width/2;
        const noCenterY = y + btnRect.height/2;

        const yesCenterX = yesRect.left - areaRect.left + yesRect.width/2;
        const yesCenterY = yesRect.top - areaRect.top + yesRect.height/2;

        const distance = Math.hypot(noCenterX - yesCenterX, noCenterY - yesCenterY);

        // Evet’e çok yaklaşmasın
        if(distance > 120){
            safe = true;
        }
    }

    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
    noBtn.style.bottom = "auto";
}

/* daha agresif kaçış */
noBtn.addEventListener("mouseenter", moveNo);
noBtn.addEventListener("click", moveNo);
noBtn.addEventListener("touchstart", moveNo);

area.addEventListener("mousemove", (e)=>{

    const yesRect = yesBtn.getBoundingClientRect();
    const dx = e.clientX - (yesRect.left + yesRect.width/2);
    const dy = e.clientY - (yesRect.top + yesRect.height/2);
    const dist = Math.hypot(dx, dy);

    if(dist < 120){
        moveNo();
    }
});


/* =========================
   EVET = KALP PATLAMASI
========================= */

function heartBurst(){

    for(let i=0;i<25;i++){

        const span = document.createElement("div");
        span.innerHTML = "❤";
        span.style.position = "absolute";
        span.style.left = "50%";
        span.style.top = "50%";
        span.style.fontSize = "20px";
        span.style.color = "#ff4d6d";
        span.style.zIndex = "999";

        document.body.appendChild(span);

        const angle = Math.random()*Math.PI*2;
        const radius = Math.random()*200;

        const x = Math.cos(angle)*radius;
        const y = Math.sin(angle)*radius;

        span.animate([
            {transform:"translate(0,0)", opacity:1},
            {transform:`translate(${x}px, ${y}px)`, opacity:0}
        ],{
            duration:800,
            easing:"ease-out"
        });

        setTimeout(()=>span.remove(),800);
    }
}

yesBtn.addEventListener("click", () => {

    heartBurst();

    setTimeout(()=>{
        card.style.display = "none";
        result.style.display = "block";
    },300);
});

</script>
