// ======================================================
// CHART.JS — DASHBOARD PARIS vs MONACO
// ======================================================

function createGradient(ctx, color1, color2) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
}

function renderProbChart(pred) {
    const canvas = document.getElementById("probChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const labels = ["Avant match", "QT1", "QT2", "QT3", "QT4"];

    new Chart(ctx, {
        type: "line",
        data: {
            labels,
            datasets: [
                {
                    label: "Paris",
                    data: [pred.before_match.paris_win_prob, pred.after_q1.paris_win_prob, pred.after_q2.paris_win_prob, pred.after_q3.paris_win_prob, pred.after_q4.paris_win_prob],
                    borderColor: "#00c3ff",
                    backgroundColor: "rgba(0,195,255,0.25)",
                    borderWidth: 4,
                    tension: 0.3,
                    fill: true
                },
                {
                    label: "Monaco",
                    data: [pred.before_match.monaco_win_prob, pred.after_q1.monaco_win_prob, pred.after_q2.monaco_win_prob, pred.after_q3.monaco_win_prob, pred.after_q4.monaco_win_prob],
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

function renderH2HHistory(h2h) {
    const canvas = document.getElementById("h2hHistoryChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    new Chart(ctx, {
        type: "line",
        data: {
            labels: h2h.last_matches.map(m => m.date),
            datasets: [
                {
                    label: "Paris",
                    data: h2h.last_matches.map(m => m.paris),
                    borderColor: "#00c3ff",
                    backgroundColor: "rgba(0,195,255,0.25)",
                    borderWidth: 3,
                    tension: 0.3
                },
                {
                    label: "Monaco",
                    data: h2h.last_matches.map(m => m.monaco),
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

function renderH2HAverages(h2h) {
    const canvas = document.getElementById("h2hAvgChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["PPG", "Opp PPG", "%2pts", "%3pts", "Reb", "TO"],
            datasets: [
                {
                    label: "Paris",
                    data: [h2h.averages.paris.ppg, h2h.averages.paris.opp_ppg, h2h.averages.paris.fg2_pct, h2h.averages.paris.fg3_pct, h2h.averages.paris.reb, h2h.averages.paris.to],
                    backgroundColor: "#00c3ff",
                    borderRadius: 6
                },
                {
                    label: "Monaco",
                    data: [h2h.averages.monaco.ppg, h2h.averages.monaco.opp_ppg, h2h.averages.monaco.fg2_pct, h2h.averages.monaco.fg3_pct, h2h.averages.monaco.reb, h2h.averages.monaco.to],
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

function renderH2HRadar(h2h) {
    const canvas = document.getElementById("h2hRadarChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    new Chart(ctx, {
        type: "radar",
        data: {
            labels: ["PPG", "Opp PPG", "%2pts", "%3pts", "Reb", "TO"],
            datasets: [
                {
                    label: "Paris",
                    data: [h2h.averages.paris.ppg, h2h.averages.paris.opp_ppg, h2h.averages.paris.fg2_pct, h2h.averages.paris.fg3_pct, h2h.averages.paris.reb, h2h.averages.paris.to],
                    borderColor: "#00c3ff",
                    backgroundColor: "rgba(0,195,255,0.25)",
                    borderWidth: 2
                },
                {
                    label: "Monaco",
                    data: [h2h.averages.monaco.ppg, h2h.averages.monaco.opp_ppg, h2h.averages.monaco.fg2_pct, h2h.averages.monaco.fg3_pct, h2h.averages.monaco.reb, h2h.averages.monaco.to],
                    borderColor: "#ff004c",
                    backgroundColor: "rgba(255,0,76,0.25)",
                    borderWidth: 2
                }
            ]
        },
        options: {
            plugins: { legend: { labels: { color: "white" } } },
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

function renderH2HCumulative(h2h) {
    const canvas = document.getElementById("h2hCumulativeChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    new Chart(ctx, {
        type: "line",
        data: {
            labels: h2h.cumulative.labels,
            datasets: [
                { label: "Paris", data: h2h.cumulative.paris, borderColor: "#00c3ff", borderWidth: 3, tension: 0.3 },
                { label: "Monaco", data: h2h.cumulative.monaco, borderColor: "#ff004c", borderWidth: 3, tension: 0.3 }
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

function renderStatsChart(stats) {
    const canvas = document.getElementById("statsChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Victoires", "Défaites"],
            datasets: [
                { label: "Paris", data: [stats.paris_last5.wins, stats.paris_last5.losses], backgroundColor: "#00c3ff", borderRadius: 6 },
                { label: "Monaco", data: [stats.monaco_last5.wins, stats.monaco_last5.losses], backgroundColor: "#ff004c", borderRadius: 6 }
            ]
        },
        options: {
            responsive: true,
            plugins: { legend: { labels: { color: "white" } } },
            scales: {
                y: { beginAtZero: true, ticks: { color: "white", stepSize: 1 } },
                x: { ticks: { color: "white" } }
            }
        }
    });
}
