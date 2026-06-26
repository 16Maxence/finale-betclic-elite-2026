// ======================================================
// Chargement générique JSON
// ======================================================
async function loadJSON(path) {
    const response = await fetch(path);
    return await response.json();
}

// Variables globales pour stocker les données une fois chargées
let appData = {};
// Objet pour mémoriser si un graphique a déjà été dessiné (évite de le recréer en boucle)
let renderedCharts = {};

// ======================================================
// Initialisation du dashboard
// ======================================================
async function init() {
    // Chargement de toutes les données en tâche de fond
    appData.pred = await loadJSON("data/predictions.json");
    appData.h2h = await loadJSON("data/h2h.json");
    appData.stats = await loadJSON("data/stats.json");
    appData.injuries = await loadJSON("data/injuries.json");

    // Remplissage des éléments textuels et HTML de base
    updateHeader(appData.pred);
    updateQT(appData.pred);
    updateMonteCarlo(appData.pred);
    updateH2HGlobal(appData.h2h);
    updateH2HTable(appData.h2h);
    updateStats(appData.stats);
    updateInjuries(appData.injuries);

    // On affiche la section par défaut (qui va générer le premier graphique)
    showSection("prob");
}

// Lancement automatique au chargement
window.addEventListener("DOMContentLoaded", init);

// ======================================================
// FONCTIONS DE REMPLISSAGE HTML
// ======================================================
function updateHeader(pred) {
    document.getElementById("header-paris-prob").textContent = pred.before_match.paris_win_prob + "%";
    document.getElementById("header-monaco-prob").textContent = pred.before_match.monaco_win_prob + "%";
}

function updateQT(pred) {
    document.getElementById("before_match").innerHTML = `<div class="qt-card"><b>Avant match :</b> Paris ${pred.before_match.paris_win_prob}% — Monaco ${pred.before_match.monaco_win_prob}%</div>`;
    document.getElementById("after_q1").innerHTML = `<div class="qt-card"><b>Après Q1 :</b> Paris ${pred.after_q1.paris_win_prob}% — Monaco ${pred.after_q1.monaco_win_prob}%<br>${pred.after_q1.score}</div>`;
    document.getElementById("after_q2").innerHTML = `<div class="qt-card"><b>Mi-temps :</b> Paris ${pred.after_q2.paris_win_prob}% — Monaco ${pred.after_q2.monaco_win_prob}%<br>${pred.after_q2.score}</div>`;
    document.getElementById("after_q3").innerHTML = `<div class="qt-card"><b>Après Q3 :</b> Paris ${pred.after_q3.paris_win_prob}% — Monaco ${pred.after_q3.monaco_win_prob}%<br>${pred.after_q3.score}</div>`;
    document.getElementById("after_q4").innerHTML = `<div class="qt-card"><b>Fin match :</b> Paris ${pred.after_q4.paris_win_prob}% — Monaco ${pred.after_q4.monaco_win_prob}%<br>${pred.after_q4.score}</div>`;
}

function updateMonteCarlo(pred) {
    const mc = pred.montecarlo_h2h;
    document.getElementById("mc-result").innerHTML = `
        <div class="info-box">
            <b>Monte-Carlo H2H (10 000 simulations)</b><br>
            Paris : ${mc.paris}%<br>
            Monaco : ${mc.monaco}%
        </div>`;
}

function updateH2HGlobal(h2h) {
    const g = h2h.global;
    document.getElementById("h2h-global").innerHTML = `
        <div class="info-box">
            <b>Face-à-face global :</b><br>
            ${g.total_matches} matchs<br>
            Paris : ${g.paris_wins} victoires<br>
            Monaco : ${g.monaco_wins} victoires
        </div>`;
}

function updateH2HTable(h2h) {
    const container = document.getElementById("h2h-table");
    if (!container) return;
    let html = `<table class="h2h-table"><tr><th>Date</th><th>Paris</th><th>Monaco</th><th>Salle</th></tr>`;
    h2h.last_matches.forEach(m => {
        html += `<tr><td>${m.date}</td><td>${m.paris}</td><td>${m.monaco}</td><td>${m.arena}</td></tr>`;
    });
    html += `</table>`;
    container.innerHTML = html;
}

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
        </div>`;
}

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
        </div>`;
}

// ======================================================
// GESTION DES ONGLETS ET RENDU DES GRAPHIKES
// ======================================================
function showSection(name) {
    // 1. Masquer les sections et désactiver les boutons
    document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
    document.querySelectorAll(".nav-buttons button").forEach(btn => btn.classList.remove("active"));

    // 2. Afficher la section demandée
    const targetSection = document.querySelector(`[data-section="${name}"]`);
    if (targetSection) targetSection.classList.add("active");

    const targetBtn = document.querySelector(`.nav-buttons button[onclick="showSection('${name}')"]`);
    if (targetBtn) targetBtn.classList.add("active");

    // 3. Déclencher le rendu des graphiques UNIQUEMENT quand la section devient visible
    if (name === "prob" && !renderedCharts["prob"]) {
        renderProbChart(appData.pred);
        renderedCharts["prob"] = true;
    } 
    else if (name === "mc" && !renderedCharts["mc"]) {
        renderMonteCarloChart(appData.pred);
        renderMonteCarloDistribution(appData.pred.montecarlo_h2h);
        renderedCharts["mc"] = true;
    } 
    else if (name === "h2h" && !renderedCharts["h2h"]) {
        renderH2HHistory(appData.h2h);
        renderH2HAverages(appData.h2h);
        renderH2HRadar(appData.h2h);
        renderH2HCumulative(appData.h2h);
        renderedCharts["h2h"] = true;
    } 
    else if (name === "stats" && !renderedCharts["stats"]) {
        renderStatsChart(appData.stats);
        renderedCharts["stats"] = true;
    }
}
