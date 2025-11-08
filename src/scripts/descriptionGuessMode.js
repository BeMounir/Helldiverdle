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
        document.querySelector(".win").click();
        input.readOnly = true;
        confetti({particleCount: 50, spread: 0, origin: {x: 0.2, y: -0.2}, angle: 60, zIndex: 9999});
        confetti({particleCount: 50, spread: 70, origin: {x: 0.8, y: -0.2}, angle: 200, zIndex: 9999});
        return;
    }

    if (revealedWords <= words.length) {
        revealWord();
    }
    input.value = "";
}

function showSuggestions(input) {
    const suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = '';
    if (!input) {
        suggestions.style.display = 'none';
        return;
    }
    const matches = stratagems.filter(s => s.name.toLowerCase().includes(input.toLowerCase())).filter(s => !guessedStratagems.has(s.name.toLowerCase()));
    if (matches.length > 0) suggestions.style.display = 'block';
    else suggestions.style.display = 'none';
    matches.forEach(m => {
        const div = document.createElement('div');
        div.className = 'suggestion';
        const img = document.createElement('img');
        img.src = m.img;
        img.alt = m.name;
        img.style.width = '40px';
        img.style.height = '40px';
        img.style.marginRight = '8px';
        img.style.verticalAlign = 'middle';
        const span = document.createElement('span');
        span.textContent = m.name;
        div.appendChild(img);
        div.appendChild(span);
        div.onclick = () => {
            document.getElementById('guess').value = m.name;
            suggestions.style.display = 'none';
        };
        suggestions.appendChild(div);
    });
}
