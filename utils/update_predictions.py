import json
from monte_carlo_h2h import monte_carlo_h2h

# ======================================================
# Chargement des données existantes
# ======================================================
def load_predictions():
    with open("data/predictions.json", "r", encoding="utf-8") as f:
        return json.load(f)

# ======================================================
# Sauvegarde des données mises à jour
# ======================================================
def save_predictions(data):
    with open("data/predictions.json", "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

# ======================================================
# Mise à jour Monte-Carlo + autres champs si besoin
# ======================================================
def update_all_predictions():
    pred = load_predictions()

    # Récupération des ratings (ici : probas avant match)
    paris_rating = pred["before_match"]["paris_win_prob"]
    monaco_rating = pred["before_match"]["monaco_win_prob"]

    # Calcul Monte-Carlo H2H
    pred["montecarlo_h2h"] = monte_carlo_h2h(
        paris_rating=paris_rating,
        monaco_rating=monaco_rating,
        simulations=10000
    )

    print("Monte-Carlo mis à jour :", pred["montecarlo_h2h"])

    # Sauvegarde
    save_predictions(pred)
    print("predictions.json mis à jour avec succès !")

# ======================================================
# Exécution directe
# ======================================================
if __name__ == "__main__":
    update_all_predictions()
