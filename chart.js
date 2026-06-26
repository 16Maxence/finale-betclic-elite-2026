// ======================================================
// CHART.JS — DASHBOARD PARIS vs MONACO
// ======================================================

// Dégradé dynamique
function createGradient(ctx, color1, color2) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
}

// ======================================================
// 1. Graphique : Évolution des probabilités QT
// ======================================================
function renderProbChart(pred) {
    const canvas = document.getElementById("probChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const labels = ["Avant match", "QT1", "QT2", "QT3", "QT4"];

    const paris = [
        pred.before_match.paris_win_prob,
        pred.after_q1.paris_win_prob,
        pred.after_q2.paris_win_prob,
        pred.after_q3.paris_win_prob,
        pred.after_q4.paris_win_prob
    ];

    const monaco = [
        pred.before_match.monaco_win_prob,
        pred.after_q1.monaco_win_prob,
        pred.after_q2.monaco_win_prob,
        pred.after_q3.monaco_win_prob,
        pred.after_q4.monaco_win_prob
    ];

    new Chart(ctx, {
        type: "line",
        data: {
            labels,
            datasets: [
                {
                    label: "Paris",
                    data: paris,
                    borderColor: "#00c3ff",
                    backgroundColor: "rgba(0,195,255,0.25)",
                    borderWidth: 4,
                    tension: 0.3,
                    fill: true
                },
                {
                    label: "Monaco",
                    data: monaco,
                    borderColor: "#ff004c",
                    backgroundColor: "rgba(255,0,76,0.25)",
                    borderWidth: 4,
                    tension: 0.3,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            plugins: { legend: { labels: { color: "white" } } },
            scales: {
                y: { min: 0, max: 100, ticks: { color: "white" } },
                x: { ticks: { color: "white" } }
            }
        }
    });
}

// ======================================================
// 2. Graphique : Donut Monte‑Carlo H2H
// ======================================================
function renderMonteCarloChart(pred) {
    const canvas = document.getElementById("mcChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const mc = pred.montecarlo_h2h;

    new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Paris", "Monaco"],
            datasets: [{
                data: [mc.paris, mc.monaco],
                backgroundColor: ["#00c3ff", "#ff004c"],
                borderWidth: 0
            }]
        },
        options: {
            cutout: "65%",
            plugins: { legend: { labels: { color: "white" } } }
        }
    });
}

// ======================================================
// 3. Graphique : Histogramme Monte‑Carlo
// ======================================================
function renderMonteCarloDistribution(mcData) {
    const canvas = document.getElementById("mcDistChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Paris", "Monaco"],
            datasets: [{
                label: "Probabilité de victoire (%)",
                data: [mcData.paris, mcData.monaco],
                backgroundColor: ["#00c3ff", "#ff004c"],
                borderRadius: 8
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            scales: {
                y: { min: 0, max: 100, ticks: { color: "white" } },
                x: { ticks: { color: "white" } }
            }
        }
    });
}

// ======================================================
// 4. Graphique : H2H global (barres)
// ======================================================
function renderH2HChart(h2h) {
    const canvas = document.getElementById("h2hChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Paris", "Monaco"],
            datasets: [{
                label: "Victoires",
                data: [h2h.global.paris_wins, h2h.global.monaco_wins],
                backgroundColor: ["#00c3ff", "#ff004c"],
                borderRadius: 8
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            scales: {
                y: { ticks: { color: "white" } },
                x: { ticks: { color: "white" } }
            }
        }
    });
}

// ======================================================
// 5. Graphique : Historique des scores (line chart)
// ======================================================
function renderH2HHistory(h2h) {
    const canvas = document.getElementById("h2hHistoryChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const labels = h2h.last_matches.map(m => m.date);
    const parisScores = h2h.last_matches.map(m => m.paris);
    const monacoScores = h2h.last_matches.map(m => m.monaco);

    new Chart(ctx, {
        type: "line",
        data: {
            labels,
            datasets: [
                {
                    label: "Paris",
                    data: parisScores,
                    borderColor: "#00c3ff",
                    backgroundColor: "rgba(0,195,255,0.25)",
                    borderWidth: 3,
                    tension: 0.3
                },
                {
                    label: "Monaco",
                    data: monacoScores,
                    borderColor: "#ff004c",
                    backgroundColor: "rgba(255,0,76,0.25)",
                    borderWidth: 3,
                    tension: 0.3
                }
            ]
        },
        options: {
            plugins: { legend: { labels: { color: "white" } } },
            scales: {
                y: { ticks: { color: "white" } },
                x: { ticks: { color: "white" } }
            }
        }
    });
}

// ======================================================
// 6. Graphique : Stats moyennes (bar chart)
// ======================================================
function renderH2HAverages(h2h) {
    const canvas = document.getElementById("h2hAvgChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const labels = ["PPG", "Opp PPG", "%2pts", "%3pts", "Reb", "TO"];

    const paris = [
        h2h.averages.paris.ppg,
        h2h.averages.paris.opp_ppg,
        h2h.averages.paris.fg2_pct,
        h2h.averages.paris.fg3_pct,
        h2h.averages.paris.reb,
        h2h.averages.paris.to
    ];

    const monaco = [
        h2h.averages.monaco.ppg,
        h2h.averages.monaco.opp_ppg,
        h2h.averages.monaco.fg2_pct,
        h2h.averages.monaco.fg3_pct,
        h2h.averages.monaco.reb,
        h2h.averages.monaco.to
    ];

    new Chart(ctx, {
        type: "bar",
        data: {
            labels,
            datasets: [
                {
                    label: "Paris",
                    data: paris,
                    backgroundColor: "#00c3ff",
                    borderRadius: 6
                },
                {
                    label: "Monaco",
                    data: monaco,
                    backgroundColor: "#ff004c",
                    borderRadius: 6
                }
            ]
        },
        options: {
            plugins: { legend: { labels: { color: "white" } } },
            scales: {
                y: { ticks: { color: "white" } },
                x: { ticks: { color: "white" } }
            }
        }
    });
}

// ======================================================
// 7. Graphique : Cumul des victoires (line chart)
// ======================================================
function renderH2HCumulative(h2h) {
    const canvas = document.getElementById("h2hCumulativeChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    new Chart(ctx, {
        type: "line",
        data: {
            labels: h2h.cumulative.labels,
            datasets: [
                {
                    label: "Paris",
                    data: h2h.cumulative.paris,
                    borderColor: "#00c3ff",
                    borderWidth: 3,
                    tension: 0.3
                },
                {
                    label: "Monaco",
                    data: h2h.cumulative.monaco,
                    borderColor: "#ff004c",
                    borderWidth: 3,
                    tension: 0.3
                }
            ]
        },
        options: {
            plugins: { legend: { labels: { color: "white" } } },
            scales: {
                y: { ticks: { color: "white" } },
                x: { ticks: { color: "white" } }
            }
        }
    });
}

// ======================================================
// 8. Graphique : Stats des 5 derniers matchs
// ======================================================
function renderStatsChart(stats) {
    const canvas = document.getElementById("statsChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Victoires", "Défaites"],
            datasets: [
                {
                    label: "Paris",
                    data: [stats.paris_last5.wins, stats.paris_last5.losses],
                    backgroundColor: "#00c3ff",
                    borderRadius: 6
                },
                {
                    label: "Monaco",
                    data: [stats.monaco_last5.wins, stats.monaco_last5.losses],
                    backgroundColor: "#ff004c",
                    borderRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            plugins: { legend: { labels: { color: "white" } } },
            scales: {
                y: { 
                    beginAtZero: true,
                    ticks: { color: "white", stepSize: 1 } 
                },
                x: { ticks: { color: "white" } }
            }
        }
    });
}
