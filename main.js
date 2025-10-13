let secret = stratagems[Math.floor(Math.random() * stratagems.length)];
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

    row.querySelector('.dept .cat-value').textContent = found.department;
    row.querySelector('.dept .cat-hint').textContent = check(found.department, secret.department);

    row.querySelector('.arrows .cat-value').textContent = found.arrows;
    row.querySelector('.arrows .cat-hint').textContent = check(found.arrows, secret.arrows);

    row.querySelector('.type .cat-value').textContent = found.type;
    row.querySelector('.type .cat-hint').textContent = check(found.type, secret.type);

    row.querySelector('.cost .cat-value').textContent = found.cost;
    row.querySelector('.cost .cat-hint').textContent = check(found.cost, secret.cost);

    row.querySelector('.cooldown .cat-value').textContent = found.cooldown;
    row.querySelector('.cooldown .cat-hint').textContent = check(found.cooldown, secret.cooldown);


    document.getElementById('feedback').appendChild(row);

    if (found.name === secret.name) alert('Correct!');
    document.getElementById('suggestions').innerHTML = '';

    val.reset()
}

function check(a, b) {
    const numA = Number(a.replace(/\D/g, ''));
    const numB = Number(b.replace(/\D/g, ''));
    if (!isNaN(numA) && !isNaN(numB)) {
        if (numA === numB) return '✅';
        return numA < numB ? '⬆' : '⬇';
    }
    return a === b ? '✅' : '❌';
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
        div.onclick = () => { document.getElementById('guess').value = m.name; suggestions.innerHTML = ''; };
        suggestions.appendChild(div);
    });
}