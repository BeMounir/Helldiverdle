function getDailyStratagem() {
    const startDateUTC = new Date(Date.UTC(2025, 9, 13));
    const now = new Date();
    const nowUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const diffDays = Math.floor((nowUTC - startDateUTC) / (1000 * 60 * 60 * 24));

    function seededRandom(seed) {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    }

    const randomIndex = Math.floor(seededRandom(diffDays * 37 + 38748) * stratagems.length);
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

    const found = stratagems.find(s => s.name.toLowerCase() === val);
    if (!found) {
        console.warn("No stratagem found for guess:", val);
        return;
    }

    guessCount++;
    document.getElementById("tries").textContent = guessCount;

    const template = document.getElementById('template-row');
    const row = template.cloneNode(true);
    row.classList.remove('template-row');
    row.style.display = 'flex';
    const codeBox = row.querySelector('.code .result-box');
    if (codeBox) {
        if (Array.isArray(found.code)) {
            codeBox.innerHTML = '';

            found.code.forEach(symbol => {
                const img = document.createElement('img');
                img.src = arrowMap[symbol];
                img.alt = symbol;
                img.classList.add('arrow-icon');
                codeBox.appendChild(img);
            });
        } else {
            codeBox.textContent = String(found.code || '');
        }
        const codeStatus = checkCode(found.code, secret.code);
        codeBox.className = 'result-box';
        if (codeStatus === 'perfect') codeBox.classList.add('correct');
        else if (codeStatus === 'partial') codeBox.classList.add('partial');
        else codeBox.classList.add('incorrect');
    }

    document.getElementById("feedback").prepend(row);

    if (val === secret.name.toLowerCase()) {
        document.querySelector(".win").click();
        input.readOnly = true;
        var winAudio = new Audio('../../../public/audio/winAudio.mp3');
        winAudio.play();
        let stars = 0;
        let xp = 0;
        let req = 0;
        let quote = "quote";
        if (guessCount <= 3) {
            stars = 5;
            xp = 100;
            req = 100;
            quote = "Outstanding Patriotism";
        } else if (guessCount <= 6) {
            stars = 4;
            xp = 75;
            req = 75;
            quote = "Superior Valor";
        } else if (guessCount <= 9) {
            stars = 3;
            xp = 50;
            req = 50;
            quote = "Honorable Duty";
        } else if (guessCount <= 12) {
            stars = 2;
            xp = 25;
            req = 25;
            quote = "Unremarkable Performance";
        } else {
            stars = 1;
            xp = 10;
            req = 10;
            quote = "Disappointing Service";
        }
        const totalStars = 5;
        const filledStar = "../../../public/images/icons/StarFilled.png";
        const emptyStar = "../../../public/images/icons/StarEmpty.png";
        const ratingEl = document.querySelector('.rating');
        if (ratingEl) {
            ratingEl.innerHTML = '';
            for (let i = 0; i < totalStars; i++) {
                const img = document.createElement('img');
                img.src = i < stars ? filledStar : emptyStar;
                img.alt = i < stars ? 'Filled star' : 'Empty star';
                img.classList.add('star-icon');
                ratingEl.appendChild(img);
            }
        }
        const xpText = document.querySelector('.xp-text');
        const reqText = document.querySelector('.req-text');
        const subText = document.querySelector('.win-subtitle');
        if (subText) subText.textContent = quote;
        if (xpText) xpText.textContent = `${xp}`;
        if (reqText) reqText.textContent = `${req}`;

        const jsConfetti = new JSConfetti();
        jsConfetti.addConfetti()
        return;
    }
    input.value = "";
}

function checkCode(guessCode = [], secretCode = []) {
    if (!Array.isArray(guessCode)) guessCode = [];
    if (!Array.isArray(secretCode)) secretCode = [];

    const exactMatch = guessCode.length === secretCode.length &&
        guessCode.every((val, idx) => val === secretCode[idx]);

    if (exactMatch) return 'perfect';

    const common = guessCode.filter(arrow => secretCode.includes(arrow));
    if (common.length > 0) return 'partial';

    return 'none';
}