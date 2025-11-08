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

let secret = getDailyStratagem();
let revealedWords = 1;
let guessCount = 0;

let words = secret.description.split(" ");
let hidden = words.map(() => "█".repeat(5));
let revealOrder = [...Array(words.length).keys()];

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
    guessCount++;
    document.getElementById("tries").textContent = guessCount;

    if (val === secret.name.toLowerCase()) {
        document.querySelector(".win").click();
        var winAudio = new Audio("../../../public/audio/winAudio.mp3");
        winAudio.play();
        document.getElementById("feedback").textContent = `MISSION SUCCESS: It was ${secret.name}!`;
        input.readOnly = true;
        return;
    }

    if (revealedWords <= words.length) {
        revealWord();
    } else {
        document.getElementById("feedback").textContent =
            `MISSION FAILED: It was ${secret.name}!`;
        input.readOnly = true;
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
