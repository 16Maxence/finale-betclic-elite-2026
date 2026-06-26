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

    // Inverser l'ordre pour afficher chronologiquement du plus ancien au plus récent sur le graphique
    const matchesChronological = [...h2h.last_matches].reverse();

    new Chart(ctx, {
        type: "line",
        data: {
            labels: matchesChronological.map(m => m.date),
            datasets: [
                {
                    label: "Paris",
                    data: matchesChronological.map(m => m.paris),
                    borderColor: "#00c3ff",
                    backgroundColor: "rgba(0,195,255,0.05)",
                    borderWidth: 2,
                    tension: 0.2,
                    pointRadius: 2
                },
                {
                    label: "Monaco",
                    data: matchesChronological.map(m => m.monaco),
                    borderColor: "#ff004c",
                    backgroundColor: "rgba(255,0,76,0.05)",
                    borderWidth: 2,
                    tension: 0.2,
                    pointRadius: 2
                }
            ]
        },
        options: {
            responsive: true,
            plugins: { legend: { labels: { color: "white" } } },
            scales: {
                y: { ticks: { color: "white" } },
                x: { ticks: { color: "white", display: false } } // Masqué pour éviter la surcharge des 29 dates textuelles
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
            labels: ["Points marqués (PPG)", "Points encaissés (Opp PPG)"],
            datasets: [
                {
                    label: "Paris",
                    data: [h2h.averages.paris.ppg, h2h.averages.paris.opp_ppg],
                    backgroundColor: "#00c3ff",
                    borderRadius: 6
                },
                {
                    label: "Monaco",
                    data: [h2h.averages.monaco.ppg, h2h.averages.monaco.opp_ppg],
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
            labels: ["Points Marqués", "Points Encaissés"],
            datasets: [
                {
                    label: "Paris",
                    data: [h2h.averages.paris.ppg, h2h.averages.paris.opp_ppg],
                    borderColor: "#00c3ff",
                    backgroundColor: "rgba(0,195,255,0.25)",
                    borderWidth: 2
                },
                {
                    label: "Monaco",
                    data: [h2h.averages.monaco.ppg, h2h.averages.monaco.opp_ppg],
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
                    pointLabels: { color: "white" },
                    ticks: { color: "white", backdropColor: "transparent" }
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
                { label: "Paris", data: h2h.cumulative.paris, borderColor: "#00c3ff", borderWidth: 3, tension: 0.1, pointRadius: 2 },
                { label: "Monaco", data: h2h.cumulative.monaco, borderColor: "#ff004c", borderWidth: 3, tension: 0.1, pointRadius: 2 }
            ]
        },
        options: {
            plugins: { legend: { labels: { color: "white" } } },
            scales: {
                y: { ticks: { color: "white" } },
                x: { ticks: { color: "white", display: false } }
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
