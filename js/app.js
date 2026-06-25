// Chargement des données JSON
async function loadJSON(path) {
    const response = await fetch(path);
    return await response.json();
}

async function init() {
    const predictions = await loadJSON("data/predictions.json");
    const h2h = await loadJSON("data/h2h.json");
    const stats = await loadJSON("data/stats.json");
    const injuries = await loadJSON("data/injuries.json");

    updateHeader(predictions);
    updateQT(predictions);
    renderProbChart(predictions);
    renderMonteCarlo(predictions);
    renderH2H(h2h);
    renderStats(stats);
}

init();


// -----------------------------
// HEADER
// -----------------------------
function updateHeader(pred) {
    document.getElementById("header-paris-prob").textContent =
        pred.current.paris + "%";

    document.getElementById("header-monaco-prob").textContent =
        pred.current.monaco + "%";
}


// -----------------------------
// QT DETAILS
// -----------------------------
function updateQT(pred) {
    const qt = pred.qt;

    document.getElementById("before_match").innerHTML =
        `<div class="qt-card"><b>Avant match :</b> Paris ${qt.before.paris}% — Monaco ${qt.before.monaco}%</div>`;

    document.getElementById("after_q1").innerHTML =
        `<div class="qt-card"><b>Après Q1 :</b> Paris ${qt.q1.paris}% — Monaco ${qt.q1.monaco}%</div>`;

    document.getElementById("after_q2").innerHTML =
        `<div class="qt-card"><b>Mi-temps :</b> Paris ${qt.q2.paris}% — Monaco ${qt.q2.monaco}%</div>`;

    document.getElementById("after_q3").innerHTML =
        `<div class="qt-card"><b>Après Q3 :</b> Paris ${qt.q3.paris}% — Monaco ${qt.q3.monaco}%</div>`;

    document.getElementById("after_q4").innerHTML =
        `<div class="qt-card"><b>Fin match :</b> Paris ${qt.q4.paris}% — Monaco ${qt.q4.monaco}%</div>`;
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
                        pred.qt.before.paris,
                        pred.qt.q1.paris,
                        pred.qt.q2.paris,
                        pred.qt.q3.paris,
                        pred.qt.q4.paris
                    ],
                    borderColor: "#00c3ff",
                    tension: 0.3
                },
                {
                    label: "Monaco",
                    data: [
                        pred.qt.before.monaco,
                        pred.qt.q1.monaco,
                        pred.qt.q2.monaco,
                        pred.qt.q3.monaco,
                        pred.qt.q4.monaco
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
// MONTE CARLO
// -----------------------------
function renderMonteCarlo(pred) {
    const ctx = document.getElementById("mcChart");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Paris", "Monaco"],
            datasets: [{
                label: "Probabilités (%)",
                data: [pred.montecarlo.paris, pred.montecarlo.monaco],
                backgroundColor: ["#00c3ff", "#ff004c"]
            }]
        },
        options: {
            plugins: { legend: { labels: { color: "white" } } },
            scales: {
                x: { ticks: { color: "white" } },
                y: { ticks: { color: "white" } }
            }
        }
    });
}


// -----------------------------
// H2H
// -----------------------------
function renderH2H(h2h) {
    const ctx = document.getElementById("h2hChart");

    new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Paris", "Monaco"],
            datasets: [{
                data: [h2h.paris_wins, h2h.monaco_wins],
                backgroundColor: ["#00c3ff", "#ff004c"]
            }]
        }
    });
}


// -----------------------------
// STATS
// -----------------------------
function renderStats(stats) {
    const ctx = document.getElementById("statsChart");

    new Chart(ctx, {
        type: "radar",
        data: {
            labels: ["Points", "Rebonds", "Passes", "Interceptions", "Évaluation"],
            datasets: [
                {
                    label: "Paris",
                    data: stats.paris,
                    borderColor: "#00c3ff",
                    backgroundColor: "rgba(0,195,255,0.3)"
                },
                {
                    label: "Monaco",
                    data: stats.monaco,
                    borderColor: "#ff004c",
                    backgroundColor: "rgba(255,0,76,0.3)"
                }
            ]
        },
        options: {
            scales: {
                r: {
                    angleLines: { color: "white" },
                    grid: { color: "white" },
                    pointLabels: { color: "white" }
                }
            }
        }
    });
}
