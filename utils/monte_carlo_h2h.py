import json
import random
import math

def random_normal(mean, std):
    """
    Génère un nombre aléatoire selon une distribution normale
    via la transformation de Box-Muller.
    """
    u = random.random()
    v = random.random()
    z = math.sqrt(-2 * math.log(u)) * math.cos(2 * math.pi * v)
    return mean + z * std


def monte_carlo_h2h(h2h_data, runs=10000):
    """
    Monte-Carlo basé sur l'historique Paris–Monaco.
    Simule 10 000 matchs complets en utilisant les moyennes et écarts-types
    des scores historiques.

    Retourne :
        {
            "paris": probabilité de victoire Paris (%),
            "monaco": probabilité de victoire Monaco (%)
        }
    """

    # Extraction des scores historiques
    paris_scores = [m["paris"] for m in h2h_data["matches"]]
    monaco_scores = [m["monaco"] for m in h2h_data["matches"]]

    # Moyennes
    mean_paris = sum(paris_scores) / len(paris_scores)
    mean_monaco = sum(monaco_scores) / len(monaco_scores)

    # Écarts-types
    std_paris = (sum((x - mean_paris)**2 for x in paris_scores) / len(paris_scores))**0.5
    std_monaco = (sum((x - mean_monaco)**2 for x in monaco_scores) / len(monaco_scores))**0.5

    paris_wins = 0

    for _ in range(runs):
        p = random_normal(mean_paris, std_paris)
        m = random_normal(mean_monaco, std_monaco)

        if p > m:
            paris_wins += 1

    paris_prob = round((paris_wins / runs) * 100, 1)
    monaco_prob = round(100 - paris_prob, 1)

    return {
        "paris": paris_prob,
        "monaco": monaco_prob
    }


if __name__ == "__main__":
    # Test manuel si tu l'exécutes directement
    with open("data/h2h.json", "r") as f:
        h2h = json.load(f)

    result = monte_carlo_h2h(h2h)
    print(result)
