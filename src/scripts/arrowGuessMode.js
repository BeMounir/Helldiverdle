function getDailyStratagem() {
    const startDateUTC = new Date(Date.UTC(2025, 9, 13));
    const now = new Date();
    const nowUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const diffDays = Math.floor((nowUTC - startDateUTC) / (1000 * 60 * 60 * 24));

    function seededRandom(seed) {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    }

    const randomIndex = Math.floor(seededRandom(diffDays * 37 + 12345) * stratagems.length);
    return stratagems[randomIndex];
}

let secret = getDailyStratagem();
console.log(secret)
let guessCount = 0;
const guessedStratagems = new Set();
const arrowLeft = "../../../public/images/icons/Left_Arrow.webp";
const arrowUp = "../../../public/images/icons/Up_Arrow.webp";
const arrowRight = "../../../public/images/icons/Right_Arrow.webp";
const arrowDown = "../../../public/images/icons/Down_Arrow.webp";

const arrowMap = {
    "↑": arrowUp,
    "→": arrowRight,
    "↓": arrowDown,
    "←": arrowLeft
};

const arrowContainer = document.getElementById("arrow-combination");

arrowContainer.innerHTML = "";

secret.code.forEach(symbol => {
    const img = document.createElement("img");
    img.src = arrowMap[symbol];
    img.alt = symbol;
    img.classList.add("arrow-icon");
    arrowContainer.appendChild(img);
});

function submitGuess() {
    const input = document.getElementById("guess");
    const val = input.value.trim().toLowerCase();
    if (!val) return;
    if (guessedStratagems.has(val)) return;
    guessedStratagems.add(val);
    guessCount++;
    document.getElementById("tries").textContent = guessCount;
    if (val === secret.name.toLowerCase()) {
        document.querySelector(".win").click();
        return;
    }
}