"""
test_probabilities.py
Tests unitaires pour le module compute_probabilities.py

On vérifie :
- le calcul de la base
- le calcul QT
- le clamp 1–99%
"""

import unittest
from utils.compute_probabilities import compute_base_probabilities, compute_qt_probability


class TestProbabilities(unittest.TestCase):

    def setUp(self):
        # Données de test (simples)
        self.injuries = {
            "monaco": {
                "out": ["Strazel", "Daniel Theis"],
                "in": ["Mike James"]
            },
            "paris": {
                "out": [],
                "in": []
            }
        }

    def test_base_probability(self):
        """
        Test du calcul de la base :
        Strazel OUT (-6)
        Theis OUT (-10)
        Mike James IN (+15)
        impact_monaco = -6 -10 +15 = -1
        base = 50 + 7 - (-1) = 58
        """
        base = compute_base_probabilities(self.injuries)
        self.assertEqual(base, 58)

    def test_qt_probability_positive_diff(self):
        """
        Paris mène → prob augmente
        """
        base = 58
        prob = compute_qt_probability(base, paris_score=80, monaco_score=70)
        self.assertGreater(prob, base)

    def test_qt_probability_negative_diff(self):
        """
        Paris perd → prob diminue
        """
        base = 58
        prob = compute_qt_probability(base, paris_score=70, monaco_score=80)
        self.assertLess(prob, base)

    def test_qt_probability_clamp_low(self):
        """
        Clamp minimum = 1%
        """
        base = 10
        prob = compute_qt_probability(base, paris_score=0, monaco_score=200)
        self.assertEqual(prob, 1)

    def test_qt_probability_clamp_high(self):
        """
        Clamp maximum = 99%
        """
        base = 90
        prob = compute_qt_probability(base, paris_score=200, monaco_score=0)
        self.assertEqual(prob, 99)


if __name__ == "__main__":
    unittest.main()
