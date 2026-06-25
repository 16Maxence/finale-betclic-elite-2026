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
    const ctx = document.getElementById("probChart").getContext("2d");

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
                    fill: true,
                    shadowColor: "#00c3ff",
                    shadowBlur: 18
                },
                {
                    label: "Monaco",
                    data: monaco,
                    borderColor: "#ff004c",
                    backgroundColor: "rgba(255,0,76,0.25)",
                    borderWidth: 4,
                    tension: 0.3,
                    fill: true,
                    shadowColor: "#ff004c",
                    shadowBlur: 18
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { labels: { color: "white" } }
            },
            scales: {
                y: {
                    min: 0,
                    max: 100,
                    ticks: { color: "white" },
                    grid: { color: "rgba(255,255,255,0.05)" }
                },
                x: {
                    ticks: { color: "white" },
                    grid: { color: "rgba(255,255,255,0.05)" }
                }
            }
        }
    });
}

// ======================================================
// 2. Graphique : Monte‑Carlo H2H
// ======================================================
function renderMonteCarloChart(pred) {
    const ctx = document.getElementById("mcChart").getContext("2d");
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
            plugins: {
                legend: { labels: { color: "white" } }
            }
        }
    });
}

// ======================================================
// 3. Graphique : H2H global
// ======================================================
function renderH2HChart(h2h) {
    const ctx = document.getElementById("h2hChart").getContext("2d");

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
                y: {
                    ticks: { color: "white" },
                    grid: { color: "rgba(255,255,255,0.05)" }
                },
                x: {
                    ticks: { color: "white" },
                    grid: { display: false }
                }
            }
        }
    });
}

// ======================================================
// 4. Graphique : Stats (radar)
// ======================================================
function renderStatsChart(stats) {
    const ctx = document.getElementById("statsChart").getContext("2d");

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
                    backgroundColor: "rgba(0,195,255,0.3)",
                    borderWidth: 2
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
                    backgroundColor: "rgba(255,0,76,0.3)",
                    borderWidth: 2
                }
            ]
        },
        options: {
            scales: {
                r: {
                    angleLines: { color: "rgba(255,255,255,0.1)" },
                    grid: { color: "rgba(255,255,255,0.1)" },
                    pointLabels: { color: "white" },
                    ticks: { display: false }
                }
            },
            plugins: {
                legend: { labels: { color: "white" } }
            }
        }
    });
}
