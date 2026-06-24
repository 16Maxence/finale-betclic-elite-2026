"""
monte_carlo.py
Module de simulation Monte-Carlo pour estimer la probabilité réelle
de victoire à partir du score actuel.

Méthode :
- On simule 10 000 fins de match
- Chaque équipe marque un score aléatoire basé sur une distribution normale
- On compte le nombre de victoires de Paris
- Probabilité = paris_wins / runs
"""

import random
import math


def random_normal(mean, std):
    """
    Génère un nombre aléatoire selon une distribution normale
    en utilisant la transformation de Box-Muller.

    mean : moyenne des points par QT (≈ 22)
    std  : écart-type (≈ 6)
    """
    u = random.random()
    v = random.random()
    z = math.sqrt(-2 * math.log(u)) * math.cos(2 * math.pi * v)
    return mean + z * std


def monte_carlo(paris_score, monaco_score, runs=10000):
    """
    Simule 'runs' fins de match pour estimer la probabilité
    que Paris gagne le match.

    paris_score  : score actuel de Paris
    monaco_score : score actuel de Monaco
    runs         : nombre de simulations (par défaut 10 000)

    Retourne :
        probabilité de victoire de Paris (0–100)
    """

    paris_wins = 0

    for _ in range(runs):
        # Simulation d'un dernier QT / fin de match
        p = paris_score + random_normal(22, 6)
        m = monaco_score + random_normal(22, 6)

        if p > m:
            paris_wins += 1

    return (paris_wins / runs) * 100
