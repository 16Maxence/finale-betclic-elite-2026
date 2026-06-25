"""
update_predictions.py
Script simplifié qui met à jour uniquement le Monte-Carlo H2H
dans predictions.json.

Ce script :
- charge h2h.json
- calcule le Monte-Carlo H2H (10 000 simulations)
- met à jour predictions.json en ajoutant le bloc "montecarlo_h2h"
"""

import json
from utils.monte_carlo_h2h import monte_carlo_h2h


def load_json(path):
    with open(path, "r") as f:
        return json.load(f)


def save_json(path, data):
    with open(path, "w") as f:
        json.dump(data, f, indent=4)


def main():
    # Charger les données H2H
    h2h = load_json("data/h2h.json")

    # Charger predictions.json existant
    predictions = load_json("data/predictions.json")

    # Calcul Monte-Carlo H2H
    mc = monte_carlo_h2h(h2h)

    # Mise à jour du fichier
    predictions["montecarlo_h2h"] = mc

    # Sauvegarde
    save_json("data/predictions.json", predictions)

    print("Monte-Carlo H2H mis à jour dans predictions.json.")


if __name__ == "__main__":
    main()
