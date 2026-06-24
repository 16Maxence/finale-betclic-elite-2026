"""
helpers.py
Fonctions utilitaires utilisées dans tout le pipeline :
- calculs cumulés
- validation des données
- formatage des scores
- extraction des QT
"""

def cumulative_scores(qt_list):
    """
    Reçoit une liste de quart-temps :
    [
        {"paris": 24, "monaco": 27},
        {"paris": 28, "monaco": 28},
        ...
    ]

    Retourne les scores cumulés QT par QT :
    [
        {"paris": 24, "monaco": 27},
        {"paris": 52, "monaco": 55},
        ...
    ]
    """
    paris = 0
    monaco = 0
    out = []

    for q in qt_list:
        paris += q["paris"]
        monaco += q["monaco"]
        out.append({"paris": paris, "monaco": monaco})

    return out


def validate_qt(q):
    """
    Vérifie qu'un quart-temps contient bien les clés 'paris' et 'monaco'
    et que les valeurs sont des entiers.
    """
    if "paris" not in q or "monaco" not in q:
        raise ValueError("Le quart-temps doit contenir 'paris' et 'monaco'.")

    if not isinstance(q["paris"], int) or not isinstance(q["monaco"], int):
        raise ValueError("Les scores doivent être des entiers.")

    return True


def format_score(paris, monaco):
    """
    Retourne un score formaté proprement.
    Exemple : format_score(92, 101) → 'Paris 92 - 101 Monaco'
    """
    return f"Paris {paris} - {monaco} Monaco"
