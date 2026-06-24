# 🏀 Dashboard Prédictif — Paris vs Monaco (Finale Betclic Élite 2026)

Un projet complet de **data-science sportive**, combinant backend Python, simulation Monte‑Carlo, modèle probabiliste dynamique, et un dashboard frontend premium.

Le site est **automatiquement mis à jour toutes les 6 heures** grâce à GitHub Actions.

---

## 🚀 Fonctionnalités

### 🔢 Modèle probabiliste dynamique
- Calcul des probabilités de victoire **avant match**
- Mise à jour après chaque QT : Q1, Q2, Q3, Q4
- Ajustement basé sur :
  - score
  - momentum
  - blessures / absences
  - rating des équipes

### 🎲 Simulation Monte‑Carlo
- 10 000 simulations de fin de match
- Probabilité finale de victoire
- Détermination du “champion” projeté

### 📊 Dashboard World Cup 2026
- Graphiques Chart.js premium
- Dégradés dynamiques Paris / Monaco
- Mode sombre natif
- Sections :
  - Évolution QT
  - Monte‑Carlo
  - H2H
  - Stats avancées

### 🔄 Mise à jour automatique
- GitHub Actions exécute `update_predictions.py`
- Mise à jour du fichier `data/predictions.json`
- Le site se met à jo
- JavaScript ES6 modules
