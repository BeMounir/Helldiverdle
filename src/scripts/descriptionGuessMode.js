function getDailyStratagem() {
    const startDateUTC = new Date(Date.UTC(2025, 9, 13));
    const now = new Date();
    const nowUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const diffDays = Math.floor((nowUTC - startDateUTC) / (1000 * 60 * 60 * 24));

    function seededRandom(seed) {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    }

    const randomIndex = Math.floor(seededRandom(diffDays * 37 + 9999) * stratagems.length);
    return stratagems[randomIndex];
}

function seededShuffle(array, seed) {
    let result = array.slice();
    let m = result.length, i;
    while (m) {
        i = Math.floor(Math.abs(Math.sin(seed++) * 10000) % m--);
        [result[m], result[i]] = [result[i], result[m]];
    }
    return result;
}

const todaySeed = Math.floor((new Date().setUTCHours(0,0,0,0) - Date.UTC(2025,9,13)) / (1000*60*60*24));
let secret = getDailyStratagem();
let revealedWords = 1;
let guessCount = 0;
const guessedStratagems = new Set();

let words = secret.description.split(" ");
let hidden = words.map(() => "█".repeat(5));
let revealOrder = seededShuffle([...Array(words.length).keys()], todaySeed * 1337 + secret.name.length);

function renderDescription() {
    const shown = words.map((word, i) => (hidden[i] === "█".repeat(5) ? hidden[i] : word));
    document.getElementById("redacted-text").textContent = shown.join(" ");
}

function revealWord() {
    if (revealedWords > words.length) return;
    const index = revealOrder[revealedWords - 1];
    hidden[index] = words[index];
    revealedWords++;
    renderDescription();
}

function revealAllWords() {
    for (let i = 0; i < words.length; i++) {
        hidden[i] = words[i];
    }
    revealedWords = words.length;
    renderDescription();
}

revealWord();

function submitGuess() {
    const input = document.getElementById("guess");
    const val = input.value.trim().toLowerCase();
    if (!val) return;
    if (guessedStratagems.has(val)) return;
    guessedStratagems.add(val);
    guessCount++;
    document.getElementById("tries").textContent = guessCount;
    if (val === secret.name.toLowerCase()) {
        revealAllWords()
        document.querySelector(".win").click();
        input.readOnly = true;
        confetti({particleCount: 50, spread: 0, origin: {x: 0.2, y: -0.2}, angle: 60, zIndex: 9999});
        confetti({particleCount: 50, spread: 70, origin: {x: 0.8, y: -0.2}, angle: 200, zIndex: 9999});
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
        return;
    }

    if (revealedWords <= words.length) {
        revealWord();
    }
    input.value = "";
}