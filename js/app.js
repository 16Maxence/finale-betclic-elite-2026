// -----------------------------
// Chargement générique JSON
// -----------------------------
async function loadJSON(path) {
    const response = await fetch(path);
    return await response.json();
}

async function init() {
    const pred = await loadJSON("data/predictions.json");
    const h2h = await loadJSON("data/h2h.json");
    const stats = await loadJSON("data/stats.json");
    const injuries = await loadJSON("data/injuries.json");

    updateHeader(pred);
    updateQT(pred);
    renderProbChart(pred);

    updateH2H(h2h);
    updateStats(stats);
    updateInjuries(injuries);
}

init();


// -----------------------------
// HEADER
// -----------------------------
function updateHeader(pred) {
    const paris = pred.before_match.paris_win_prob;
    const monaco = pred.before_match.monaco_win_prob;

    document.getElementById("header-paris-prob").textContent = paris + "%";
    document.getElementById("header-monaco-prob").textContent = monaco + "%";
}


// -----------------------------
// QT DETAILS
// -----------------------------
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


// -----------------------------
// GRAPHIQUE — Évolution QT
// -----------------------------
function renderProbChart(pred) {
    const ctx = document.getElementById("probChart");

    new Chart(ctx, {
        type: "line",
        data: {
            labels: ["Avant", "Q1", "Q2", "Q3", "Q4"],
            datasets: [
                {
                    label: "Paris",
                    data: [
                        pred.before_match.paris_win_prob,
                        pred.after_q1.paris_win_prob,
                        pred.after_q2.paris_win_prob,
                        pred.after_q3.paris_win_prob,
                        pred.after_q4.paris_win_prob
                    ],
                    borderColor: "#00c3ff",
                    tension: 0.3
                },
                {
                    label: "Monaco",
                    data: [
                        pred.before_match.monaco_win_prob,
                        pred.after_q1.monaco_win_prob,
                        pred.after_q2.monaco_win_prob,
                        pred.after_q3.monaco_win_prob,
                        pred.after_q4.monaco_win_prob
                    ],
                    borderColor: "#ff004c",
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            plugins: { legend: { labels: { color: "white" } } },
            scales: {
                x: { ticks: { color: "white" } },
                y: { ticks: { color: "white" } }
            }
        }
    });
}


// -----------------------------
// H2H GLOBAL
// -----------------------------
function updateH2H(h2h) {
    const g = h2h.global;

    const container = document.getElementById("h2h-global");
    if (!container) return;

    container.innerHTML = `
        <div class="info-box">
            <b>Face-à-face global :</b><br>
            ${g.total_matches} matchs<br>
            Paris : ${g.paris_wins} victoires<br>
            Monaco : ${g.monaco_wins} victoires
        </div>
    `;
}


// -----------------------------
// STATS LAST 5
// -----------------------------
function updateStats(stats) {
    const container = document.getElementById("stats-compare");
    if (!container) return;

    container.innerHTML = `
        <div class="info-box">
            <b>5 derniers matchs — Paris</b><br>
            ${stats.paris_last5.wins}V - ${stats.paris_last5.losses}D<br>
            Pts marqués : ${stats.paris_last5.ppg}<br>
            Pts encaissés : ${stats.paris_last5.opp_ppg}
        </div>

        <div class="info-box">
            <b>5 derniers matchs — Monaco</b><br>
            ${stats.monaco_last5.wins}V - ${stats.monaco_last5.losses}D<br>
            Pts marqués : ${stats.monaco_last5.ppg}<br>
            Pts encaissés : ${stats.monaco_last5.opp_ppg}
        </div>
    `;
}


// -----------------------------
// INJURIES
// -----------------------------
function updateInjuries(inj) {
    const container = document.getElementById("injuries");
    if (!container) return;

    container.innerHTML = `
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
