// ======================================================
// CHART.JS — DASHBOARD PARIS vs MONACO
// ======================================================

// Création d’un dégradé dynamique (World Cup style)
function createGradient(ctx, color1, color2) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
}

// ======================================================
// 1. Graphique : Évolution des probabilités QT
// ======================================================
export function renderProbChart(data) {
    const ctx = document.getElementById("probChart").getContext("2d");

    const labels = ["Avant match", "QT1", "QT2", "QT3", "QT4"];
    const paris = [
        data.before_match.paris_win_prob,
        data.after_q1.paris_win_prob,
        data.after_q2.paris_win_prob,
        data.after_q3.paris_win_prob,
        data.after_q4.paris_win_prob
    ];

    const monaco = paris.map(v => 100 - v);

    const gradientParis = createGradient(ctx, "#0055A4", "#E1000F");
    const gradientMonaco = createGradient(ctx, "#C8102E", "#FFFFFF");

    new Chart(ctx, {
        type: "line",
        data: {
            labels,
            datasets: [
                {
                    label: "Paris",
                    data: paris,
                    borderColor: "#0055A4",
                    backgroundColor: gradientParis,
                    borderWidth: 3,
                    tension: 0.3,
                    fill: true
                },
                {
                    label: "Monaco",
                    data: monaco,
                    borderColor: "#C8102E",
                    backgroundColor: gradientMonaco,
                    borderWidth: 3,
                    tension: 0.3,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: "#e8eef6",
                        font: { size: 14 }
                    }
                }
            },
            scales: {
                y: {
                    min: 0,
                    max: 100,
                    ticks: { color: "#7a90a8" },
                    grid: { color: "rgba(255,255,255,0.05)" }
                },
                x: {
                    ticks: { color: "#7a90a8" },
                    grid: { color: "rgba(255,255,255,0.05)" }
                }
            }
        }
    });
}

// ======================================================
// 2. Graphique : Distribution Monte‑Carlo
// ======================================================
export function renderMonteCarloChart(mcValue) {
    const ctx = document.getElementById("mcChart").getContext("2d");

    new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Paris", "Monaco"],
            datasets: [{
                data: [mcValue, 100 - mcValue],
                backgroundColor: ["#0055A4", "#C8102E"],
                borderWidth: 0
            }]
        },
        options: {
            cutout: "65%",
            plugins: {
                legend: {
                    labels: {
                        color: "#e8eef6",
                        font: { size: 14 }
                    }
                }
            }
        }
    });
}

// ======================================================
// 3. Graphique : H2H (barres comparatives)
// ======================================================
export function renderH2HChart(h2h) {
    const ctx = document.getElementById("h2hChart").getContext("2d");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Paris", "Monaco"],
            datasets: [{
                label: "Victoires",
                data: [h2h.paris_wins, h2h.monaco_wins],
                backgroundColor: ["#0055A4", "#C8102E"],
                borderRadius: 8
            }]
        },
        options: {
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    ticks: { color: "#7a90a8" },
                    grid: { color: "rgba(255,255,255,0.05)" }
                },
                x: {
                    ticks: { color: "#7a90a8" },
                    grid: { display: false }
                }
            }
        }
    });
}

// ======================================================
// 4. Graphique : Stats avancées (ratings)
// ======================================================
export function renderStatsChart(stats) {
    const ctx = document.getElementById("statsChart").getContext("2d");

    new Chart(ctx, {
        type: "radar",
        data: {
            labels: ["Rating global", "Forme", "PPG", "OPPG"],
            datasets: [
                {
                    label: "Paris",
                    data: [
                        stats.paris_rating,
                        stats.paris_rating * 0.8,
                        stats.paris_rating * 0.6,
                        stats.paris_rating * 0.4
                    ],
                    borderColor: "#0055A4",
                    backgroundColor: "rgba(0,85,164,0.3)",
                    borderWidth: 2
                },
                {
                    label: "Monaco",
                    data: [
                        stats.monaco_rating,
                        stats.monaco_rating * 0.8,
                        stats.monaco_rating * 0.6,
                        stats.monaco_rating * 0.4
                    ],
                    borderColor: "#C8102E",
                    backgroundColor: "rgba(200,16,46,0.3)",
                    borderWidth: 2
                }
            ]
        },
        options: {
            scales: {
                r: {
                    angleLines: { color: "rgba(255,255,255,0.1)" },
                    grid: { color: "rgba(255,255,255,0.1)" },
                    pointLabels: { color: "#e8eef6" },
                    ticks: { display: false }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: "#e8eef6",
                        font: { size: 14 }
                    }
                }
            }
        }
    });
}
