import { 
    renderProbChart, 
    renderMonteCarloChart, 
    renderH2HChart, 
    renderStatsChart 
} from "./chart.js";

// Chargement du JSON principal
async function loadPredictions() {
    const response = await fetch("../data/predictions.json");
    return await response.json();
}

// Fonction utilitaire pour insérer du HTML
function setHTML(id, html) {
    document.getElementById(id).innerHTML = html;
}

// Applique une classe selon l'équipe
function teamClass(prob) {
    return prob >= 50 ? "paris" : "monaco";
}

// Applique une classe de couleur pour les pourcentages
function probClass(prob) {
    return prob >= 50 ? "prob-paris" : "prob-monaco";
}

// Applique une classe champion
function championClass(team) {
    return team === "Paris" ? "champion-paris" : "champion-monaco";
}

// Affichage des cartes QT
function renderQTCard(id, data) {
    const probParis = data.paris_win_prob;
    const probMonaco = data.monaco_win_prob;

    const html = `
        <div class="qt-card ${teamClass(probParis)}">
            <h3>${id.replace("_", " ").toUpperCase()}</h3>
            ${data.score ? `<p><strong>Score :</strong> ${data.score}</p>` : ""}
            <p class="${probClass(probParis)}">Paris : ${probParis}%</p>
            <p class="${probClass(probMonaco)}">Monaco : ${probMonaco}%</p>
        </div>
    `;

    setHTML(id, html);
}

// Affichage Monte‑Carlo
function renderMonteCarlo(mc, champion) {
    const html = `
        <div class="champion-card ${championClass(champion)}">
            <div class="champion-trophies">🏆</div>
            <div>
                <div class="champion-name">${champion}</div>
                <div class="champion-meta">Probabilité finale : ${mc}%</div>
            </div>
        </div>
    `;
    setHTML("montecarlo", html);
}

// Affichage H2H
function renderH2H(global, last5) {
    setHTML("h2h-global", `
        <div class="info-box">
            <strong>Global :</strong><br>
            Paris : ${global.paris_wins}<br>
            Monaco : ${global.monaco_wins}<br>
            Moyenne Paris : ${global.avg_paris}<br>
            Moyenne Monaco : ${global.avg_monaco}
        </div>
    `);

    setHTML("h2h-last5", `
        <div class="info-box">
            <strong>5 derniers matchs :</strong><br>
            Paris : ${last5.paris_wins}<br>
            Monaco : ${last5.monaco_wins}<br>
            Moyenne Paris : ${last5.avg_paris}<br>
            Moyenne Monaco : ${last5.avg_monaco}
        </div>
    `);
}

// Affichage Stats
function renderStats(stats) {
    setHTML("stats-compare", `
        <div class="info-box">
            Rating Paris : ${stats.paris_rating}<br>
            Rating Monaco : ${stats.monaco_rating}<br>
            Avantage : <strong>${stats.advantage}</strong>
        </div>
    `);
}

// Mise à jour du header
function updateHeader(beforeMatch) {
    document.getElementById("header-paris-prob").textContent = beforeMatch.paris_win_prob + "%";
    document.getElementById("header-monaco-prob").textContent = beforeMatch.monaco_win_prob + "%";
}

// Initialisation du dashboard
async function initDashboard() {
    const data = await loadPredictions();

    // Header
    updateHeader(data.before_match);

    // QT
    renderQTCard("before_match", data.before_match);
    renderQTCard("after_q1", data.after_q1);
    renderQTCard("after_q2", data.after_q2);
    renderQTCard("after_q3", data.after_q3);
    renderQTCard("after_q4", data.after_q4);

    // Monte‑Carlo
    renderMonteCarlo(data.after_q4.monte_carlo, data.after_q4.champion);

    // H2H
    renderH2H(data.h2h.global, data.h2h.last5);

    // Stats
    renderStats(data.stats);

    // Graphiques Chart.js
    renderProbChart(data);
    renderMonteCarloChart(data.after_q4.monte_carlo);
    renderH2HChart(data.h2h.global);
    renderStatsChart(data.stats);
}

initDashboard();
