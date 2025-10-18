function getDailyStratagem() {
    const startDateUTC = new Date(Date.UTC(2025, 9, 13));
    const now = new Date();
    const nowUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const diffDays = Math.floor((nowUTC - startDateUTC) / (1000 * 60 * 60 * 24));
    const index = diffDays % stratagems.length;
    return stratagems[index];
}

function timeUntilNextStratagem() {
    const now = new Date();
    const nextUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
    const diffMs = nextUTC - now;

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
    const seconds = Math.floor((diffMs / 1000) % 60);

    return `${hours}h ${minutes}m ${seconds}s until next stratagem`;
}

const timerElement = document.getElementById('timer');
timerElement.textContent = timeUntilNextStratagem();
let guessCount = 0;
setInterval(() => {
    document.getElementById('timer').textContent = timeUntilNextStratagem();
}, 1000);

console.log(stratagems.length + " Stratagems")
// let secret = stratagems[31];
let secret = getDailyStratagem();
// let secret = stratagems[Math.floor(Math.random() * stratagems.length)];

console.log(secret.name)


function submitGuess() {
    const val = document.getElementById('guess').value.trim();
    const found = stratagems.find(s => s.name.toLowerCase() === val.toLowerCase());
    if (!found) {
        alert('Not a known stratagem');
        return;
    }


    guessCount++;

    const template = document.getElementById('template-row');
    const row = template.cloneNode(true);
    row.classList.remove('template-row');
    row.style.display = 'flex';

    row.querySelector('.name').textContent = found.name;
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
        if (Array.isArray(found.traits)) {
            traitsBox.textContent = found.traits.join(', ');
        } else {
            traitsBox.textContent = String(found.traits || '');
        }
        const traitStatus = checkTraits(found.traits, secret.traits);
        traitsBox.className = 'result-box';
        if (traitStatus === 'perfect') traitsBox.classList.add('correct');
        else if (traitStatus === 'partial') traitsBox.classList.add('partial');
        else traitsBox.classList.add('incorrect');
    }

    const feedback = document.getElementById('feedback');
    feedback.insertBefore(row, feedback.firstChild);

    if (found.name === secret.name) {
        if (guessCount <= 1) {
            alert('Correct! You got it first try!.');
        } else {
            alert('Correct! It took you ' + guessCount + ' tries.');
        }
        document.getElementById('guess').readOnly = true;
        console.log('Correct! It took you ' + guessCount + ' tries.')
    }
    document.getElementById('suggestions').innerHTML = '';
}

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
    for (const trait of gArr) {
        if (sSet.includes(trait)) matches++;
    }

    if (matches > 0 && matches === sSet.length && gArr.length === sSet.length) return 'perfect';
    if (matches > 0) return 'partial';
    return 'none';
}

function showSuggestions(input) {
    const suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = '';

    if (!input) {
        suggestions.style.display = 'none';
        return;
    }

    const matches = stratagems.filter(s => s.name.toLowerCase().includes(input.toLowerCase()));

    if (matches.length > 0) {
        suggestions.style.display = 'block';
    } else {
        suggestions.style.display = 'none';
    }

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

document.getElementById("guess").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        submitGuess();
    }
});