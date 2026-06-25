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

    updateMonteCarlo(pred);
    renderMonteCarloChart(pred);

    updateH2H(h2h);
    renderH2HChart(h2h);

    updateStats(stats);
    renderStatsChart(stats);

    updateInjuries(injuries);
}

init();


// -----------------------------
// HEADER
// -----------------------------
function updateHeader(pred) {
    document.getElementById("header-paris-prob").textContent =
        pred.before_match.paris_win_prob + "%";

    document.getElementById("header-monaco-prob").textContent =
        pred.before_match.monaco_win_prob + "%";
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
// MONTE CARLO H2H (NOUVEAU)
// -----------------------------
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

function renderMonteCarloChart(pred) {
    const mc = pred.montecarlo_h2h;
    const ctx = document.getElementById("mcChart");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Paris", "Monaco"],
            datasets: [{
                label: "Probabilités (%)",
                data: [mc.paris, mc.monaco],
                backgroundColor: ["#00c3ff", "#ff004c"]
            }]
        }
    });
}


// -----------------------------
// H2H
// -----------------------------
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

function renderH2HChart(h2h) {
    const ctx = document.getElementById("h2hChart");

    new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Paris", "Monaco"],
            datasets: [{
                data: [
                    h2h.global.paris_wins,
                    h2h.global.monaco_wins
                ],
                backgroundColor: ["#00c3ff", "#ff004c"]
            }]
        }
    });
}


// -----------------------------
// STATS
// -----------------------------
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

function renderStatsChart(stats) {
    const ctx = document.getElementById("statsChart");

    new Chart(ctx, {
        type: "radar",
        data: {
            labels: ["PPG", "Opp PPG", "Wins", "Losses"],
            datasets: [
                {
                    label: "Paris",
                    data: [
                        stats.paris_last5.ppg,
                        stats.paris_last5.opp_ppg,
                        stats.paris_last5.wins,
                        stats.paris_last5.losses
                    ],
                    borderColor: "#00c3ff",
                    backgroundColor: "rgba(0,195,255,0.3)"
                },
                {
                    label: "Monaco",
                    data: [
                        stats.monaco_last5.ppg,
                        stats.monaco_last5.opp_ppg,
                        stats.monaco_last5.wins,
                        stats.monaco_last5.losses
                    ],
                    borderColor: "#ff004c",
                    backgroundColor: "rgba(255,0,76,0.3)"
                }
            ]
        }
    });
}


// -----------------------------
// INJURIES
// -----------------------------
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
