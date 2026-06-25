import random

def monte_carlo_h2h(paris_rating: float, monaco_rating: float, simulations: int = 10000) -> dict:
    """
    Simule un H2H Paris vs Monaco avec Monte-Carlo.
    paris_rating / monaco_rating : typiquement les probas avant match (ou un rating Elo, etc.)
    simulations : nombre de matchs simulés.
    Retourne un dict avec % de victoire Paris / Monaco.
    """

    paris_wins = 0
    monaco_wins = 0

    for _ in range(simulations):
        # On simule un "score" autour du rating
        paris_score = random.gauss(paris_rating, 8)
        monaco_score = random.gauss(monaco_rating, 8)

        if paris_score > monaco_score:
            paris_wins += 1
        else:
            monaco_wins += 1

    paris_prob = round((paris_wins / simulations) * 100)
    monaco_prob = 100 - paris_prob

    return {
        "paris": paris_prob,
        "monaco": monaco_prob
    }


if __name__ == "__main__":
    # Petit test rapide
    res = monte_carlo_h2h(56, 44, simulations=10000)
    print("Monte-Carlo H2H test :", res)
