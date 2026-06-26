// Enregistrement du plugin pour afficher les chiffres directement sur les graphiques
Chart.register(ChartDataLabels);

// Configuration globale des étiquettes (Datalabels)
Chart.defaults.plugins.datalabels.color = '#ffffff';
Chart.defaults.plugins.datalabels.font = { weight: 'bold', size: 11 };
Chart.defaults.plugins.datalabels.align = 'top';

// ======================================================
// 1. GRAPHÈQUE DES PROBABILITÉS (ONGLET 1)
// ======================================================
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
                    backgroundColor: "rgba(0,195,255,0.15)",
                    borderWidth: 4,
                    tension: 0.3,
                    fill: true
                },
                {
                    label: "Monaco",
                    data: [pred.before_match.monaco_win_prob, pred.after_q1.monaco_win_prob, pred.after_q2.monaco_win_prob, pred.after_q3.monaco_win_prob, pred.after_q4.monaco_win_prob],
                    borderColor: "#ff004c",
                    backgroundColor: "rgba(255,0,76,0.15)",
                    borderWidth: 4,
                    tension: 0.3,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            plugins: { 
                legend: { labels: { color: "white" } },
                datalabels: { formatter: (value) => value + "%", display: true }
            },
            scales: {
                y: { min: 0, max: 100, ticks: { color: "white" } },
                x: { ticks: { color: "white" } }
            }
        }
    });
}

// ======================================================
// 2. GRAPHÈQUE MONTE-CARLO (ONGLET 2)
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
            cutout: "60%",
            plugins: { 
                legend: { labels: { color: "white" } },
                datalabels: { formatter: (value) => value + "%", display: true, font: { size: 14 } }
            }
        }
    });
}

// ======================================================
// 3. GRAPHÈQUES H2H (ONGLET 3)
// ======================================================
function renderH2HHistory(h2h) {
    const canvas = document.getElementById("h2hHistoryChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
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
                    borderWidth: 2,
                    pointRadius: 4,
                    tension: 0.1
                },
                {
                    label: "Monaco",
                    data: matchesChronological.map(m => m.monaco),
                    borderColor: "#ff004c",
                    borderWidth: 2,
                    pointRadius: 4,
                    tension: 0.1
                }
            ]
        },
        options: {
            responsive: true,
            plugins: { 
                legend: { labels: { color: "white" } },
                datalabels: { display: false } 
            },
            scales: {
                y: { ticks: { color: "white" } },
                x: { ticks: { color: "white", display: false } }
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
                { label: "Paris", data: [h2h.averages.paris.ppg, h2h.averages.paris.opp_ppg], backgroundColor: "#00c3ff", borderRadius: 6 },
                { label: "Monaco", data: [h2h.averages.monaco.ppg, h2h.averages.monaco.opp_ppg], backgroundColor: "#ff004c", borderRadius: 6 }
            ]
        },
        options: {
            plugins: { 
                legend: { labels: { color: "white" } },
                datalabels: { display: true, anchor: 'end', align: 'top' }
            },
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

    const existingChart = Chart.getChart(canvas);
    if (existingChart) { existingChart.destroy(); }

    new Chart(ctx, {
        type: "radar",
        data: {
            labels: ["Tirs à 2 pts (%)", "Tirs à 3 pts (%)", "Lancers Francs (%)"],
            datasets: [
                {
                    label: "Paris",
                    data: [h2h.averages.paris.pct_2pts, h2h.averages.paris.pct_3pts, h2h.averages.paris.pct_lf],
                    borderColor: "#00c3ff",
                    backgroundColor: "rgba(0, 195, 255, 0.15)",
                    borderWidth: 3,
                    pointBackgroundColor: "#00c3ff",
                    pointRadius: 4
                },
                {
                    label: "Monaco",
                    data: [h2h.averages.monaco.pct_2pts, h2h.averages.monaco.pct_3pts, h2h.averages.monaco.pct_lf],
                    borderColor: "#ff004c",
                    backgroundColor: "rgba(255, 0, 76, 0.15)",
                    borderWidth: 3,
                    pointBackgroundColor: "#ff004c",
                    pointRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { 
                legend: { labels: { color: "#ffffff", font: { size: 13 } } },
                datalabels: { 
                    formatter: (value) => value + "%", 
                    display: true,
                    color: "#ffffff",
                    font: { weight: "bold", size: 11 }
                }
            },
            scales: {
                r: {
                    min: 0,
                    max: 100,
                    ticks: { color: "rgba(255, 255, 255, 0.6)", backdropColor: "transparent", stepSize: 20 },
                    angleLines: { color: "rgba(255, 255, 255, 0.2)" },
                    grid: { color: "rgba(255, 255, 255, 0.15)" },
                    pointLabels: { color: "#ffffff", font: { size: 13, weight: "bold" } }
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
                { label: "Paris", data: h2h.cumulative.paris, borderColor: "#00c3ff", borderWidth: 3, pointRadius: 3 },
                { label: "Monaco", data: h2h.cumulative.monaco, borderColor: "#ff004c", borderWidth: 3, pointRadius: 3 }
            ]
        },
        options: {
            plugins: { 
                legend: { labels: { color: "white" } },
                datalabels: { align: 'right', display: (context) => context.dataIndex === context.dataset.data.length - 1 }
            },
            scales: {
                y: { ticks: { color: "white" } },
                x: { ticks: { display: false } }
            }
        }
    });
}

// ======================================================
// 4. GRAPHÈQUE DES STATS RECENTES (ONGLET 4)
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
                { label: "Paris", data: [stats.paris_last5.wins, stats.paris_last5.losses], backgroundColor: "#00c3ff", borderRadius: 6 },
                { label: "Monaco", data: [stats.monaco_last5.wins, stats.monaco_last5.losses], backgroundColor: "#ff004c", borderRadius: 6 }
            ]
        },
        options: {
            responsive: true,
            plugins: { 
                legend: { labels: { color: "white" } },
                datalabels: { display: true, anchor: 'end', align: 'top' }
            },
            scales: {
                y: { beginAtZero: true, ticks: { color: "white", stepSize: 5 } },
                x: { ticks: { color: "white" } }
            }
        }
    });
}
