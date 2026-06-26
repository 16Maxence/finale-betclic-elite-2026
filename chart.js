function renderH2HRadar(h2h) {
    const canvas = document.getElementById("h2hRadarChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // On détruit l'ancienne instance si elle existe pour éviter les conflits d'affichage
    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
        existingChart.destroy();
    }

    new Chart(ctx, {
        type: "radar",
        data: {
            // C'est ici qu'on définit explicitement les 3 axes d'adresses
            labels: ["Tirs à 2 pts (%)", "Tirs à 3 pts (%)", "Lancers Francs (%)"],
            datasets: [
                {
                    label: "Paris",
                    data: [
                        h2h.averages.paris.pct_2pts, 
                        h2h.averages.paris.pct_3pts, 
                        h2h.averages.paris.pct_lf
                    ],
                    borderColor: "#00c3ff",
                    backgroundColor: "rgba(0, 195, 255, 0.15)",
                    borderWidth: 3,
                    pointBackgroundColor: "#00c3ff",
                    pointRadius: 4
                },
                {
                    label: "Monaco",
                    data: [
                        h2h.averages.monaco.pct_2pts, 
                        h2h.averages.monaco.pct_3pts, 
                        h2h.averages.monaco.pct_lf
                    ],
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
            maintainAspectRatio: false, // Permet de lui redonner une belle forme géométrique
            plugins: { 
                legend: { 
                    labels: { color: "#ffffff", font: { size: 13 } } 
                },
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
                    max: 100, // On force une échelle fixe de 0 à 100% pour la clarté des adresses
                    ticks: { 
                        color: "rgba(255, 255, 255, 0.6)", 
                        backdropColor: "transparent",
                        stepSize: 20
                    },
                    angleLines: { color: "rgba(255, 255, 255, 0.2)" },
                    grid: { color: "rgba(255, 255, 255, 0.15)" },
                    pointLabels: { 
                        color: "#ffffff", 
                        font: { size: 13, weight: "bold" } 
                    }
                }
            }
        }
    });
}
