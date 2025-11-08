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

let guessCount = 0;

function submitGuess() {
    const val = input.value.trim().toLowerCase();

    if (val === secret.name) {

    }
}