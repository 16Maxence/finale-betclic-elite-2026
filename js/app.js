// ======================================================
// Chargement générique JSON
// ======================================================
async function loadJSON(path) {
    const response = await fetch(path);
    return await response.json();
}

// ======================================================
// Initialisation du dashboard
// ======================================================
async function init() {
    const pred = await loadJSON("data/predictions.json");
    const h2h = await loadJSON("data/h2h.json");
    const stats = await loadJSON("data/stats.json");
    const injuries = await loadJSON("data/injuries.json");

    // Header
    updateHeader(pred);

    // Probabilités QT
    updateQT(pred);
    renderProbChart(pred);

    // Monte-Carlo
    updateMonteCarlo(pred);
    renderMonteCarloChart(pred);
    renderMonteCarloDistribution(pred.montecarlo_h2h);

    // H2H
    updateH2H(h2h);
    renderH2HChart(h2h);

    // Stats
    updateStats(stats);
    renderStatsChart(stats);

    // Blessures
    updateInjuries(injuries);

    // Section par défaut
    showSection("prob");
}

init();

// ======================================================
// HEADER
// ======================================================
function updateHeader(pred) {
    document.getElementById("header-paris-prob").textContent =
        pred.before_match.paris_win_prob + "%";

    document.getElementById("header-monaco-prob").textContent =
        pred.before_match.monaco_win_prob + "%";
}

// ======================================================
// QT DETAILS
// ======================================================
function updateQT(pred) {

    document.getElementById("before_match").innerHTML =
        `<div class="qt-card"><b>Avant match :</b> Paris ${pred.before_match.paris_win_prob}% — Monaco ${pred.before_match.monaco_win_prob}%</div>`;

    document.getElementById("after_q1").innerHTML =
        `<div class="qt-card"><b>Après Q1 :</b> Paris ${pred.after_q1.paris_win_prob}% — Monaco ${pred.after_q1.monaco_win_prob}%<br>${pred.after_q1.score}</div>`;

    document.getElementById("after_q2").innerHTML =
        `<div class="qt-card"><b>Mi-temps :</b> Paris ${pred.after_q2.paris_win_prob}% — Monaco ${pred.after_q2.monaco_win_prob}%<br>${pred.after_q2.score}</div>`;

    document.getElementById("after_q3").innerHTML =
        `<div class="qt-card"><b>Après Q3 :</b> Paris ${pred.after_q3.paris_win_prob}% — Monaco ${pred.after_q3.monaco_win_prob}%<br>${pred.after_q3.score}</div>`;

    document.getElementById("after_q4").innerHTML =
        `<div class="qt-card"><b>Fin match :</b> Paris ${pred.after_q4.paris_win_prob}% — Monaco ${pred.after_q4.monaco_win_prob}%<br>${pred.after_q4.score}</div>`;
}

// ======================================================
// MONTE CARLO H2H
// ======================================================
function updateMonteCarlo(pred) {
    const mc = pred.montecarlo_h2h;

    document.getElementById("mc-result").innerHTML = `
        <div class="info-box">
            <b>Monte-Carlo H2H (10 000 simulations)</b><br>
            Paris : ${mc.paris}%<br>
            Monaco : ${mc.monaco}%
        </div>
    `;
}

// ======================================================
// H2H
// ======================================================
function updateH2H(h2h) {
    const g = h2h.global;

    document.getElementById("h2h-global").innerHTML = `
        <div class="info-box">
            <b>Face-à-face global :</b><br>
            ${g.total_matches} matchs<br>
            Paris : ${g.paris_wins} victoires<br>
            Monaco : ${g.monaco_wins} victoires
        </div>
    `;
}

// ======================================================
// STATS
// ======================================================
function updateStats(stats) {
    document.getElementById("stats-compare").innerHTML = `
        <div class="info-box">
            <b>Paris — 5 derniers matchs</b><br>
            ${stats.paris_last5.wins}V - ${stats.paris_last5.losses}D<br>
            Pts marqués : ${stats.paris_last5.ppg}<br>
            Pts encaissés : ${stats.paris_last5.opp_ppg}
        </div>

        <div class="info-box">
            <b>Monaco — 5 derniers matchs</b><br>
            ${stats.monaco_last5.wins}V - ${stats.monaco_last5.losses}D<br>
            Pts marqués : ${stats.monaco_last5.ppg}<br>
            Pts encaissés : ${stats.monaco_last5.opp_ppg}
        </div>
    `;
}

// ======================================================
// INJURIES
// ======================================================
function updateInjuries(inj) {
    document.getElementById("injuries").innerHTML = `
        <div class="info-box">
            <b>Paris</b><br>
            Blessés : ${inj.paris.out.join(", ") || "Aucun"}<br>
            Retours : ${inj.paris.in.join(", ") || "Aucun"}
        </div>

        <div class="info-box">
            <b>Monaco</b><br>
            Blessés : ${inj.monaco.out.join(", ") || "Aucun"}<br>
            Retours : ${inj.monaco.in.join(", ") || "Aucun"}
        </div>
    `;
}

// ======================================================
// ONGLET : AFFICHER UNE SECTION
// ======================================================
function showSection(name) {

    // cacher toutes les sections
    document.querySelectorAll(".section").forEach(sec => {
        sec.classList.remove("active");
    });

    // afficher la bonne section
    document.querySelector(`[data-section="${name}"]`).classList.add("active");

    // bouton actif néon
    document.querySelectorAll(".nav-buttons button").forEach(btn => {
        btn.classList.remove("active");
    });

    document.querySelector(`.nav-buttons button[onclick="showSection('${name}')"]`)
        .classList.add("active");
}
