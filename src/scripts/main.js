const streakKey = 'stratagemGame_streak';
let streakData = JSON.parse(localStorage.getItem(streakKey)) || {count: 0, lastWinDate: null};
let streak = streakData.count;

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

const timerElement = document.getElementById('timer');
timerElement.textContent = timeUntilNextStratagem();
let guessCount = 0;
const guessedStratagems = new Set();
const todayKey = new Date().toISOString().split('T')[0];
const storageKey = `stratagemGame_${todayKey}`;
for (let key in localStorage) {
    if (key.startsWith('stratagemGame_') && key !== storageKey) {
        localStorage.removeItem(key);
    }
}

let secret = getDailyStratagem();

function submitGuess() {
    const val = document.getElementById('guess').value.trim();
    if (guessedStratagems.has(val.toLowerCase())) return;
    const found = stratagems.find(s => s.name.toLowerCase() === val.toLowerCase());
    if (!found) return;
    guessedStratagems.add(val.toLowerCase());
    guessCount++;
    const triesElement = document.getElementById('tries');
    if (triesElement) triesElement.innerHTML = guessCount;
    const template = document.getElementById('template-row');
    const row = template.cloneNode(true);
    row.classList.remove('template-row');
    row.style.display = 'flex';
    row.querySelector('img').src = found.img;
    row.querySelector('img').alt = found.name;
    const deptBox = row.querySelector('.dept .result-box');
    deptBox.textContent = found.department;
    deptBox.className = 'result-box ' + (found.department.toLowerCase() === secret.department.toLowerCase() ? 'correct' : 'incorrect');
    const typeBox = row.querySelector('.type .result-box');
    typeBox.textContent = found.type;
    typeBox.className = 'result-box ' + (found.type.toLowerCase() === secret.type.toLowerCase() ? 'correct' : 'incorrect');
    const arrowsBox = row.querySelector('.arrows .result-box');
    const arrowsHint = check(found.arrows, secret.arrows);
    arrowsBox.textContent = arrowsHint === 'correct' ? found.arrows : `${found.arrows} ${arrowsHint}`;
    arrowsBox.className = 'result-box ' + (arrowsHint === 'correct' ? 'correct' : 'incorrect');
    const levelBox = row.querySelector('.level .result-box');
    const levelHint = check(found.level, secret.level);
    levelBox.textContent = levelHint === 'correct' ? found.level : `${found.level} ${levelHint}`;
    levelBox.className = 'result-box ' + (levelHint === 'correct' ? 'correct' : 'incorrect');
    const cdBox = row.querySelector('.cooldown .result-box');
    const cdHint = check(found.cooldown, secret.cooldown);
    cdBox.textContent = cdHint === 'correct' ? found.cooldown : `${found.cooldown} ${cdHint}`;
    cdBox.className = 'result-box ' + (cdHint === 'correct' ? 'correct' : 'incorrect');
    const ctBox = row.querySelector('.calltime .result-box');
    const ctHint = check(found.calltime, secret.calltime);
    ctBox.textContent = ctHint === 'correct' ? found.calltime : `${found.calltime} ${ctHint}`;
    ctBox.className = 'result-box ' + (ctHint === 'correct' ? 'correct' : 'incorrect');
    const traitsBox = row.querySelector('.traits .result-box');
    if (traitsBox) {
        if (Array.isArray(found.traits)) traitsBox.textContent = found.traits.join(', ');
        else traitsBox.textContent = String(found.traits || '');
        const traitStatus = checkTraits(found.traits, secret.traits);
        traitsBox.className = 'result-box';
        if (traitStatus === 'perfect') traitsBox.classList.add('correct');
        else if (traitStatus === 'partial') traitsBox.classList.add('partial');
        else traitsBox.classList.add('incorrect');
    }
    const feedback = document.getElementById('feedback');
    feedback.insertBefore(row, feedback.firstChild);
    const boxes = row.querySelectorAll('.result-box');
    boxes.forEach((box, index) => {
        setTimeout(() => {
            box.classList.add('show');
        }, index * 400);
    });
    if (found.name === secret.name) {
        document.getElementById('guess').readOnly = true;
        document.querySelector('.win').click();
        document.getElementById('tries').innerHTML = guessCount;
        const today = new Date().toISOString().split('T')[0];
        if (streakData.lastWinDate) {
            const last = new Date(streakData.lastWinDate);
            const diffDays = Math.floor((new Date(today) - last) / (1000 * 60 * 60 * 24));
            if (diffDays === 1) streakData.count++;
            else if (diffDays > 1) streakData.count = 1;
        } else streakData.count = 1;
        streakData.lastWinDate = today;
        localStorage.setItem(streakKey, JSON.stringify(streakData));
        streak = streakData.count;
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
        const streakEl = document.getElementById('streak');
        if (streakEl) streakEl.textContent = streak;
        confetti({particleCount: 50, spread: 0, origin: {x: 0.2, y: -0.2}, angle: 60, zIndex: 9999});
        confetti({particleCount: 50, spread: 70, origin: {x: 0.8, y: -0.2}, angle: 200, zIndex: 9999});
    }
    document.getElementById('suggestions').innerHTML = '';
    saveGameState();
}

function saveGameState() {
    const ratingEl = document.querySelector('.rating');
    const xpText = document.querySelector('.xp-text');
    const reqText = document.querySelector('.req-text');
    const subText = document.querySelector('.win-subtitle');
    const state = {
        guessedStratagems: Array.from(guessedStratagems),
        guessCount,
        feedbackHTML: document.getElementById('feedback').innerHTML,
        win: document.getElementById('guess').readOnly,
        ratingHTML: ratingEl ? ratingEl.innerHTML : '',
        xpText: xpText ? xpText.textContent : '',
        reqText: reqText ? reqText.textContent : '',
        subText: subText ? subText.textContent : ''
    };
    localStorage.setItem(storageKey, JSON.stringify(state));
}

function loadGameState() {
    const saved = localStorage.getItem(storageKey);
    if (!saved) return;
    try {
        const state = JSON.parse(saved);
        guessCount = state.guessCount || 0;
        (state.guessedStratagems || []).forEach(g => guessedStratagems.add(g));
        document.getElementById('feedback').innerHTML = state.feedbackHTML || '';
        document.getElementById('guess').readOnly = !!state.guessReadOnly;
        const boxes = document.querySelectorAll('#feedback .result-box');
        boxes.forEach(box => box.classList.add('show'));
        const triesElement = document.getElementById('tries');
        if (triesElement) triesElement.innerHTML = guessCount;
        const ratingEl = document.querySelector('.rating');
        const xpText = document.querySelector('.xp-text');
        const reqText = document.querySelector('.req-text');
        const subText = document.querySelector('.win-subtitle');
        if (ratingEl && state.ratingHTML) ratingEl.innerHTML = state.ratingHTML;
        if (xpText && state.xpText) xpText.textContent = state.xpText;
        if (reqText && state.reqText) reqText.textContent = state.reqText;
        if (subText && state.subText) subText.textContent = state.subText;
        if (state.win) document.querySelector('.win').click();
    } catch (e) {
        console.error("Failed to load saved game:", e);
        localStorage.removeItem(storageKey);
    }
    const streakEl = document.getElementById('streak');
    if (streakEl) streakEl.textContent = streakData.count || 0;
}

loadGameState();

function check(a, b) {
    const numA = Number(a.replace(/\D/g, ''));
    const numB = Number(b.replace(/\D/g, ''));
    const isNumeric = !isNaN(numA) && !isNaN(numB) && a.match(/\d/) && b.match(/\d/);
    if (isNumeric) {
        if (numA === numB) return 'correct';
        return numA < numB ? '⬆️' : '⬇️';
    }
    return a.toLowerCase() === b.toLowerCase() ? 'correct' : 'incorrect';
}

function checkTraits(guessTraits = [], secretTraits = []) {
    if (!Array.isArray(guessTraits)) guessTraits = [];
    if (!Array.isArray(secretTraits)) secretTraits = [];
    const sSet = secretTraits.map(t => String(t).trim()).filter(Boolean);
    const gArr = guessTraits.map(t => String(t).trim()).filter(Boolean);
    let matches = 0;
    for (const trait of gArr) if (sSet.includes(trait)) matches++;
    if (matches > 0 && matches === sSet.length && gArr.length === sSet.length) return 'perfect';
    if (matches > 0) return 'partial';
    return 'none';
}



function copy() {
    const copyText = "I just won in helldiverdle with " + guessCount + " guesses!\nhttps://bemounir.github.io/Helldiverdle/";
    navigator.clipboard.writeText(copyText);
    document.querySelector('.share').innerHTML = "Copied";
    setTimeout(function () {
        document.querySelector('.share').innerHTML = "Share";
    }, 2000);
}

document.getElementById("guess").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        submitGuess();
    }
});

document.getElementById('reset').addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});
