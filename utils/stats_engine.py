"""
stats_engine.py
Analyse des statistiques avancées pour Paris et Monaco.

Ce module permet :
- de calculer un rating basé sur PPG / OPPG
- d'évaluer la forme récente
- de générer un score de puissance (power rating)
- de comparer les deux équipes
"""

def compute_team_rating(stats):
    """
    Calcule un rating simple basé sur :
    - PPG (points marqués)
    - OPPG (points encaissés)
    - forme récente (wins / losses)

    stats : dictionnaire :
        {
            "wins": 3,
            "losses": 2,
            "ppg": 90.2,
            "opp_ppg": 91.4
        }

    Retourne un rating entre 0 et 100.
    """

    # Ratio victoires
    total = stats["wins"] + stats["losses"]
    winrate = stats["wins"] / total if total > 0 else 0.5

    # Offensive rating
    off = stats["ppg"]

    # Defensive rating (plus bas = meilleur)
    def_rating = max(1, 120 - stats["opp_ppg"])

    # Score final
    rating = (winrate * 40) + (off * 0.3) + (def_rating * 0.3)

    # Clamp entre 0 et 100
    return max(0, min(100, round(rating, 1)))


def compare_teams(paris_stats, monaco_stats):
    """
    Compare Paris et Monaco selon leur rating.

    Retourne :
        {
            "paris_rating": ...,
            "monaco_rating": ...,
            "advantage": "Paris" ou "Monaco" ou "Équilibré"
        }
    """

    paris_rating = compute_team_rating(paris_stats)
    monaco_rating = compute_team_rating(monaco_stats)

    if paris_rating > monaco_rating + 3:
        adv = "Paris"
    elif monaco_rating > paris_rating + 3:
        adv = "Monaco"
    else:
        adv = "Équilibré"

    return {
        "paris_rating": paris_rating,
        "monaco_rating": monaco_rating,
        "advantage": adv
    }
