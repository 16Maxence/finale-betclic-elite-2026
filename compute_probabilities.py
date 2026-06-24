"""
compute_probabilities.py
Module central du modèle de prédiction QT par QT.

Ce fichier calcule :
- la probabilité de base avant match
- la probabilité après chaque quart-temps
- l'impact des blessures
- l'effet de l'avantage terrain
- le clamp entre 1% et 99%
"""

def compute_base_probabilities(injuries, home_advantage=7):
    """
    Calcule la probabilité de base avant le début du match.
    Formule :
        base = 50 + home_advantage + impact_paris - impact_monaco

    Dans ton modèle :
    - home_advantage = 7 (match à Paris)
    - impact blessure Monaco :
        Strazel OUT → -6
        Theis OUT → -10
        Mike James IN → +15
    """

    impact_monaco = 0
    impact_paris = 0  # si un jour tu veux ajouter des blessés Paris

    # Blessures Monaco
    if "Strazel" in injuries["monaco"]["out"]:
        impact_monaco -= 6
    if "Daniel Theis" in injuries["monaco"]["out"]:
        impact_monaco -= 10
    if "Mike James" in injuries["monaco"]["in"]:
        impact_monaco += 15

    # Formule finale
    base = 50 + home_advantage + impact_paris - impact_monaco

    return base


def compute_qt_probability(base, paris_score, monaco_score):
    """
    Calcule la probabilité de victoire de Paris après un QT donné.

    Formule :
        diff = paris_score - monaco_score
        prob = base + diff * 1.8

    Puis clamp :
        prob = min(99, max(1, prob))

    Exemple :
        base = 58
        diff = -3
        prob = 58 + (-3 * 1.8) = 52.6
    """

    diff = paris_score - monaco_score
    prob = base + diff * 1.8

    # Clamp entre 1% et 99%
    prob = max(1, min(99, prob))

    return prob
