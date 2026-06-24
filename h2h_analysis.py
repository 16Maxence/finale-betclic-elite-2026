"""
h2h_analysis.py
Analyse des confrontations directes (Head-to-Head) entre Paris et Monaco.

Ce module permet :
- de calculer le nombre total de victoires
- de calculer les moyennes de points
- d'analyser les confrontations par compétition
- d'extraire les tendances récentes
"""

def compute_h2h_global(matches):
    """
    Calcule les statistiques globales Paris vs Monaco.

    matches : liste de dictionnaires :
        { "date": "2026-06-21", "paris": 84, "monaco": 96 }

    Retourne :
        {
            "total_matches": X,
            "paris_wins": Y,
            "monaco_wins": Z,
            "avg_paris": ...,
            "avg_monaco": ...
        }
    """

    total = len(matches)
    paris_wins = sum(1 for m in matches if m["paris"] > m["monaco"])
    monaco_wins = total - paris_wins

    avg_paris = sum(m["paris"] for m in matches) / total
    avg_monaco = sum(m["monaco"] for m in matches) / total

    return {
        "total_matches": total,
        "paris_wins": paris_wins,
        "monaco_wins": monaco_wins,
        "avg_paris": round(avg_paris, 1),
        "avg_monaco": round(avg_monaco, 1)
    }


def compute_h2h_last_n(matches, n=5):
    """
    Analyse les N derniers matchs.

    Retourne :
        {
            "paris_wins": ...,
            "monaco_wins": ...,
            "avg_paris": ...,
            "avg_monaco": ...
        }
    """

    last = matches[-n:]  # les N derniers matchs

    return compute_h2h_global(last)


def compute_h2h_by_competition(competitions):
    """
    Analyse les confrontations par compétition.

    competitions : dictionnaire :
        {
            "ligue_nationale": { "matches": 23, "paris": 8, "monaco": 15 },
            "euroligue": { ... }
        }

    Retourne le même dictionnaire, mais avec les ratios ajoutés.
    """

    out = {}

    for comp, data in competitions.items():
        total = data["matches"]
        paris = data["paris"]
        monaco = data["monaco"]

        out[comp] = {
            "matches": total,
            "paris": paris,
            "monaco": monaco,
            "paris_pct": round(paris / total * 100, 1),
            "monaco_pct": round(monaco / total * 100, 1)
        }

    return out
