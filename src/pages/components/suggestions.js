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