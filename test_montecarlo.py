"""
test_montecarlo.py
Tests unitaires pour le module monte_carlo.py

On vérifie :
- que la fonction retourne bien un float
- que la probabilité est entre 0 et 100
- que Paris a une probabilité élevée quand il mène largement
- que Paris a une probabilité faible quand il perd largement
"""

import unittest
from utils.monte_carlo import monte_carlo


class TestMonteCarlo(unittest.TestCase):

    def test_return_type(self):
        """
        La fonction doit retourner un float.
        """
        prob = monte_carlo(80, 80, runs=500)
        self.assertIsInstance(prob, float)

    def test_range(self):
        """
        La probabilité doit être entre 0 et 100.
        """
        prob = monte_carlo(80, 80, runs=500)
        self.assertGreaterEqual(prob, 0)
        self.assertLessEqual(prob, 100)

    def test_paris_leads(self):
        """
        Si Paris mène largement, la probabilité doit être élevée.
        """
        prob = monte_carlo(100, 50, runs=500)
        self.assertGreater(prob, 70)

    def test_paris_losing(self):
        """
        Si Paris perd largement, la probabilité doit être faible.
        """
        prob = monte_carlo(50, 100, runs=500)
        self.assertLess(prob, 30)


if __name__ == "__main__":
    unittest.main()
