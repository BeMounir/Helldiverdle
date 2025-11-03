const imageUrls = [
    "images/support/Machine_Gun_Stratagem_Icon.webp",
    "images/support/Anti-Materiel_Rifle_Stratagem_Icon.webp",
    "images/support/Stalwart_Stratagem_Icon.webp",
    "images/support/Machine_Gun_Stratagem_Icon.webp",
    "images/support/Expendable_Anti-Tank_Stratagem_Icon.webp",
    "images/support/Recoilless_Rifle_Stratagem_Icon.webp",
    "images/support/Flamethrower_Stratagem_Icon.webp",
    "images/support/Autocannon_Stratagem_Icon.webp",
    "images/support/Heavy_Machine_Gun_Stratagem_Icon.webp",
    "images/support/RL-77_Airburst_Rocket_Launcher_Stratagem_Icon.webp",
    "images/support/Commando_Stratagem_Icon.webp",
    "images/support/Railgun_Stratagem_Icon.webp",
    "images/support/Spear_Stratagem_Icon.webp",
    "images/support/Commando_Stratagem_Icon.webp",
    "images/offense/Orbital_Gatling_Barrage_Stratagem_Icon.png",
    "images/offense/Orbital_Airburst_Strike_Stratagem_Icon.webp",
    "images/offense/Orbital_120mm_HE_Barrage_Stratagem_Icon.webp",
    "images/offense/Orbital_380mm_HE_Barrage_Stratagem_Icon.webp",
    "images/offense/Orbital_Walking_Barrage_Stratagem_Icon.webp",
    "images/offense/Orbital_Laser_Stratagem_Icon.webp",
    "images/offense/Orbital_Napalm_Barrage_Stratagem_Icon.webp",
    "images/offense/Orbital_Railcannon_Strike_Stratagem_Icon.webp",
    "images/offense/Eagle_Strafing_Run_Stratagem_Icon.webp",
    "images/offense/Eagle_Airstrike_Stratagem_Icon.webp",
    "images/offense/Eagle_Cluster_Bomb_Stratagem_Icon.webp",
    "images/offense/Eagle_Napalm_Airstrike_Stratagem_Icon.webp",
    "images/support/Jump_Pack_Stratagem_Icon.webp",
    "images/offense/Eagle_Smoke_Strike_Stratagem_Icon.webp",
    "images/offense/Eagle_110mm_Rocket_Pods_Stratagem_Icon.webp",
    "images/offense/Eagle_500kg_Bomb_Stratagem_Icon.webp",
    "images/support/M-102_Fast_Recon_Vehicle_Stratagem_Icon.webp",
    "images/offense/Orbital_Precision_Strike_Stratagem_Icon.webp",
    "images/offense/Orbital_Gas_Strike_Stratagem_Icon.webp",
    "images/offense/Orbital_EMS_Strike_Stratagem_Icon.webp",
    "images/offense/Orbital_Smoke_Strike_Stratagem_Icon.webp",
    "images/defense/HMG_Emplacement_Stratagem_Icon.webp",
    "images/defense/Shield_Generator_Relay_Stratagem_Icon.webp",
    "images/defense/Tesla_Tower_Stratagem_Icon.webp",
    "images/defense/GL-21_Grenadier_Battlement_Stratagem_Icon.webp",
    "images/defense/Anti-Personnel_Minefield_Stratagem_Icon.webp",
    "images/support/Supply_Pack_Stratagem_Icon.webp",
    "images/support/Grenade_Launcher_Stratagem_Icon.webp",
    "images/support/Laser_Cannon_Stratagem_Icon.webp",
    "images/defense/Incendiary_Mines_Stratagem_Icon.webp",
    "images/support/Guard_Dog_Rover_Stratagem_Icon.webp",
    "images/support/Ballistic_Shield_Backpack_Stratagem_Icon.webp",
    "images/support/Arc_Thrower_Stratagem_Icon.webp",
    "images/defense/MD-17_Anti-Tank_Mines_Stratagem_Icon.webp",
    "images/support/Quasar_Cannon_Stratagem_Icon.webp",
    "images/support/Shield_Generator_Pack_Stratagem_Icon.webp",
    "images/defense/Gas_Minefield_Stratagem_Icon.webp",
    "images/defense/Machine_Gun_Sentry_Stratagem_Icon.webp",
    "images/defense/Gatling_Sentry_Stratagem_Icon.webp",
    "images/defense/Mortar_Sentry_Stratagem_Icon.webp",
    "images/support/Guard_Dog_Stratagem_Icon.webp",
    "images/defense/Autocannon_Sentry_Stratagem_Icon.webp",
    "images/defense/Rocket_Sentry_Stratagem_Icon.webp",
    "images/defense/AM-23_EMS_Mortar_Sentry_Stratagem_Icon.webp",
    "images/support/EXO-45_Patriot_Exosuit_Stratagem_Icon.webp",
    "images/support/EXO-49_Emancipator_Exosuit_Stratagem_Icon.webp",
    "images/support/Sterilizer_Stratagem_Icon.webp",
    "images/support/Guard_Dog_Dog_Breath_Stratagem_Icon.webp",
    "images/support/SH-51_Directional_Shield_Stratagem_Icon.webp",
    "images/defense/E_AT-12_Anti-Tank_Emplacement_Stratagem_Icon.webp",
    "images/defense/A_FLAM-40_Flame_Sentry_Stratagem_Icon.webp",
    "images/support/Portable_Hellbomb_Stratagem_Icon.webp",
    "images/support/Hover_Pack_Stratagem_Icon.webp",
    "images/support/CQC-1_One_True_Flag_Stratagem_Icon.webp",
    "images/support/GL-52_De-Escalator_Stratagem_Icon.webp",
    "images/support/AX_ARC-3__Guard_Dog__K-9_Stratagem_Icon.webp",
    "images/support/PLAS-45_Epoch_Stratagem_Icon.webp",
    "images/defense/A_LAS-98_Laser_Sentry_Stratagem_Icon.webp",
    "images/support/LIFT-182_Warp_Pack_Stratagem_Icon.webp",
    "images/support/S-11_Speargun_Stratagem_Icon.webp",
    "images/support/EAT-700_Expendable_Napalm_Stratagem_Icon.webp",
    "images/support/MS-11_Stratagem_Icon.webp",
    "images/common/Reinforce_Stratagem_Icon.webp",
    "images/common/SOS_Beacon_Stratagem_Icon.webp",
    "images/objective/Hellbomb_Stratagem_Icon.webp",
    "images/objective/Dark_Fluid_Vessel_Stratagem_Icon.webp",
];

function preloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = url;
    });
}

Promise.all(imageUrls.map(preloadImage))
    .then(() => console.log("All images preloaded"))
    .catch(err => console.error("Image failed to load:", err));

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
const guessedStratagems = new Set();
setInterval(() => {
    document.getElementById('timer').textContent = timeUntilNextStratagem();
}, 1000);

const todayKey = new Date().toISOString().split('T')[0];
const storageKey = `stratagemGame_${todayKey}`;
for (let key in localStorage) {
    if (key.startsWith('stratagemGame_') && key !== storageKey) {
        localStorage.removeItem(key);
    }
}

console.log(stratagems.length + " Stratagems");
let secret = getDailyStratagem();
console.log(secret.name);

function submitGuess() {
    const val = document.getElementById('guess').value.trim();

    if (guessedStratagems.has(val.toLowerCase())) {
        return;
    }

    const found = stratagems.find(s => s.name.toLowerCase() === val.toLowerCase());
    if (!found) {
        return;
    }

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

    const boxes = row.querySelectorAll('.result-box');
    boxes.forEach((box, index) => {
        setTimeout(() => {
            box.classList.add('show');
        }, index * 400);
    });

    if (found.name === secret.name) {
        if (guessCount <= 1) {
        } else {
        }
        document.getElementById('guess').readOnly = true;
        console.log('Correct! It took you ' + guessCount + ' tries.')
        document.querySelector('.win').click();
        document.getElementById('tries').innerHTML = guessCount
    }
    document.getElementById('suggestions').innerHTML = '';
    saveGameState();
}

function saveGameState() {
    const state = {
        guessedStratagems: Array.from(guessedStratagems),
        guessCount,
        feedbackHTML: document.getElementById('feedback').innerHTML,
        guessReadOnly: document.getElementById('guess').readOnly
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

    } catch (e) {
        console.error("Failed to load saved game:", e);
        localStorage.removeItem(storageKey);
    }
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

    const matches = stratagems
        .filter(s => s.name.toLowerCase().includes(input.toLowerCase()))
        .filter(s => !guessedStratagems.has(s.name.toLowerCase()));
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

function copy() {
    const copyText = "test"
    copyText.select();
    copyText.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(copyText.value);

    alert("Copied the text: " + copyText.value);
}

document.getElementById("guess").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        submitGuess();
    }
});
