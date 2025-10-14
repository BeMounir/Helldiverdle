function getDailyStratagem() {
    const startDateUTC = new Date(Date.UTC(2025, 9, 13));
    const now = new Date();
    const nowUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const diffDays = Math.floor((nowUTC - startDateUTC) / (1000*60*60*24));
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
setInterval(() => {
    document.getElementById('timer').textContent = timeUntilNextStratagem();
}, 1000);

let secret = getDailyStratagem();
// let secret = stratagems[Math.floor(Math.random() * stratagems.length)];

console.log(secret.name)


function submitGuess() {
    const val = document.getElementById('guess').value.trim();
    const found = stratagems.find(s => s.name.toLowerCase() === val.toLowerCase());
    if (!found) { alert('Not a known stratagem'); return; }

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
    arrowsBox.textContent = found.arrows;
    arrowsBox.className = 'result-box ' + (found.arrows === secret.arrows ? 'correct' : 'incorrect');

    const levelBox = row.querySelector('.level .result-box');
    const levelHint = check(found.level, secret.level);
    levelBox.textContent = levelHint === '✅' ? found.level : `${found.level} ${levelHint}`;
    levelBox.className = 'result-box ' + (levelHint === '✅' ? 'correct' : 'incorrect');

    const cdBox = row.querySelector('.cooldown .result-box');
    const cdHint = check(found.cooldown, secret.cooldown);
    cdBox.textContent = cdHint === '✅' ? found.cooldown : `${found.cooldown} ${cdHint}`;
    cdBox.className = 'result-box ' + (cdHint === '✅' ? 'correct' : 'incorrect');

    const ctBox = row.querySelector('.calltime .result-box');
    const ctHint = check(found.calltime, secret.calltime);
    ctBox.textContent = ctHint === '✅' ? found.calltime : `${found.calltime} ${ctHint}`;
    ctBox.className = 'result-box ' + (ctHint === '✅' ? 'correct' : 'incorrect');

    const usesBox = row.querySelector('.uses .result-box');
    usesBox.textContent = found.uses;
    usesBox.className = 'result-box ' + (found.uses === secret.uses ? 'correct' : 'incorrect');

    const feedback = document.getElementById('feedback');
    feedback.insertBefore(row, feedback.firstChild);

    if (found.name === secret.name) alert('Correct!');
    document.getElementById('suggestions').innerHTML = '';
}

function check(a, b) {
    const numA = Number(a.replace(/\D/g, ''));
    const numB = Number(b.replace(/\D/g, ''));
    const isNumeric = !isNaN(numA) && !isNaN(numB) && a.match(/\d/) && b.match(/\d/);

    if (isNumeric) {
        if (numA === numB) return '✅';
        return numA < numB ? '⬆️' : '⬇️';
    }
    return a.toLowerCase() === b.toLowerCase() ? '✅' : '❌';
}

function showSuggestions(input) {
    const suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = '';
    if (!input) return;
    const matches = stratagems.filter(s => s.name.toLowerCase().includes(input.toLowerCase()));
    matches.forEach(m => {
        const div = document.createElement('div');
        div.className = 'suggestion';
        div.textContent = m.name;
        div.onclick = () => {
            document.getElementById('guess').value = m.name;
            suggestions.innerHTML = '';
        };
        suggestions.appendChild(div);
    });
}