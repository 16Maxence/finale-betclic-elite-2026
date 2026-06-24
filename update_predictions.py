"""
update_predictions.py
Script principal qui génère automatiquement predictions.json

Ce script :
- charge les données (blessures, H2H, stats)
- calcule la probabilité de base
- calcule les probabilités QT par QT
- lance le Monte-Carlo
- génère un fichier predictions.json propre
- sera exécuté automatiquement par GitHub Actions
"""

from loader import load_json, save_json
from compute_probabilities import compute_base_probabilities, compute_qt_probability
from monte_carlo import monte_carlo
from helpers import format_score, cumulative_scores
from h2h_analysis import compute_h2h_global, compute_h2h_last_n
from stats_engine import compare_teams


def main():
    # -----------------------------
    # 1. Charger les données
    # -----------------------------
    injuries = load_json("data/injuries.json")
    h2h = load_json("data/h2h.json")
    stats = load_json("data/stats.json")

    # -----------------------------
    # 2. Calculer la base du modèle
    # -----------------------------
    base = compute_base_probabilities(injuries)

    # -----------------------------
    # 3. Définir les scores QT (exemple Paris–Monaco)
    #    → plus tard tu pourras les automatiser
    # -----------------------------
    qt = [
        {"paris": 24, "monaco": 27},
        {"paris": 28, "monaco": 28},
        {"paris": 29, "monaco": 18},
        {"paris": 11, "monaco": 28}
    ]

    # Scores cumulés
    cumul = cumulative_scores(qt)

    # -----------------------------
    # 4. Calculer les probabilités QT par QT
    # -----------------------------
    after_q1 = compute_qt_probability(base, cumul[0]["paris"], cumul[0]["monaco"])
    after_q2 = compute_qt_probability(base, cumul[1]["paris"], cumul[1]["monaco"])
    after_q3 = compute_qt_probability(base, cumul[2]["paris"], cumul[2]["monaco"])
    after_q4 = compute_qt_probability(base, cumul[3]["paris"], cumul[3]["monaco"])

    # -----------------------------
    # 5. Monte-Carlo final
    # -----------------------------
    mc = monte_carlo(cumul[3]["paris"], cumul[3]["monaco"])

    # -----------------------------
    # 6. Analyse H2H et stats
    # -----------------------------
    h2h_global = compute_h2h_global(h2h["matches"])
    h2h_last5 = compute_h2h_last_n(h2h["matches"], n=5)
    stats_compare = compare_teams(stats["paris_last5"], stats["monaco_last5"])

    # -----------------------------
    # 7. Générer predictions.json
    # -----------------------------
    predictions = {
        "before_match": {
            "paris_win_prob": round(base, 2),
            "monaco_win_prob": round(100 - base, 2)
        },
        "after_q1": {
            "score": format_score(cumul[0]["paris"], cumul[0]["monaco"]),
            "paris_win_prob": round(after_q1, 2),
            "monaco_win_prob": round(100 - after_q1, 2)
        },
        "after_q2": {
            "score": format_score(cumul[1]["paris"], cumul[1]["monaco"]),
            "paris_win_prob": round(after_q2, 2),
            "monaco_win_prob": round(100 - after_q2, 2)
        },
        "after_q3": {
            "score": format_score(cumul[2]["paris"], cumul[2]["monaco"]),
            "paris_win_prob": round(after_q3, 2),
            "monaco_win_prob": round(100 - after_q3, 2)
        },
        "after_q4": {
            "score": format_score(cumul[3]["paris"], cumul[3]["monaco"]),
            "paris_win_prob": round(after_q4, 2),
            "monaco_win_prob": round(100 - after_q4, 2),
            "monte_carlo": round(mc, 2),
            "champion": "Monaco" if mc == 0 else "Paris"
        },
        "h2h": {
            "global": h2h_global,
            "last5": h2h_last5
        },
        "stats": stats_compare
    }

    # Sauvegarde finale
    save_json("data/predictions.json", predictions)
    print("predictions.json mis à jour avec succès.")


if __name__ == "__main__":
    main()
