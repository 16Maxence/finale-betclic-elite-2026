import json
import os

def load_json(path):
    """
    Charge un fichier JSON et renvoie son contenu sous forme de dictionnaire Python.
    Utilisé par tous les modules : probabilités, Monte-Carlo, H2H, etc.
    """
    if not os.path.exists(path):
        raise FileNotFoundError(f"Fichier introuvable : {path}")

    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def save_json(path, data):
    """
    Sauvegarde un dictionnaire Python dans un fichier JSON.
    Utilisé pour mettre à jour predictions.json automatiquement.
    """
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
