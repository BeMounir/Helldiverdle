function timeUntilNextStratagem() {
    const now = new Date();
    const nextUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
    const diffMs = nextUTC - now;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
    const seconds = Math.floor((diffMs / 1000) % 60);
    return `${hours}h ${minutes}m ${seconds}s until next stratagem`;
}

setInterval(() => {
    document.getElementById('timer').textContent = timeUntilNextStratagem();
}, 1000);