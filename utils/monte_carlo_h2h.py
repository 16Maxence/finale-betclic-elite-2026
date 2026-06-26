import random

def monte_carlo_h2h(paris_ppg: float, monaco_ppg: float, simulations: int = 10000) -> dict:
    paris_wins = 0
    monaco_wins = 0

    # Match 5 décisif à Paris : on ajoute un avantage du terrain (+3 points pour Paris)
    avantage_terrain_paris = 3.0
    paris_base_rating = paris_ppg + avantage_terrain_paris
    
    # Monaco récupère Mike James mais perd Strazel, on garde leur moyenne stable
    monaco_base_rating = monaco_ppg 

    for _ in range(simulations):
        paris_simulated_score = random.gauss(paris_base_rating, 8)
        monaco_simulated_score = random.gauss(monaco_base_rating, 8)

        if abs(paris_simulated_score - monaco_simulated_score) < 0.1:
            paris_simulated_score += random.uniform(1, 5)
            monaco_simulated_score += random.uniform(1, 5)

        if paris_simulated_score > monaco_simulated_score:
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
    # Exécutez ce code pour obtenir vos pourcentages exacts
    res = monte_carlo_h2h(86.1, 92.0, simulations=10000)
    print("--- RÉSULTATS À COPIER DANS PREDICTIONS.JSON ---")
    print(res)
