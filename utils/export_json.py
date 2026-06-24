"""
export_json.py
Module responsable de l'export propre des fichiers JSON.

Ce module sert principalement à :
- écrire predictions.json
- écrire d'autres fichiers générés automatiquement
- garantir un format propre, indenté, UTF-8
"""

from loader import save_json


def export_predictions(path, predictions):
    """
    Exporte le dictionnaire 'predictions' dans un fichier JSON.

    path : chemin du fichier (ex : 'data/predictions.json')
    predictions : dictionnaire contenant les données à écrire
    """
    save_json(path, predictions)
    return True
