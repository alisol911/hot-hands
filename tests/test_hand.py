import unittest
from server.models import *

class HandTests(unittest.TestCase):

    def test_hand(self):
        h = Hand()
        t = h.Throw()
        self.assertTrue(t >= MinHand and t <= MaxHand)
        t = h.Throw()
        self.assertTrue(t >= MinHand and t <= MaxHand)
        t = h.Throw()
        self.assertTrue(t >= MinHand and t <= MaxHand)
        t = h.Throw()
        self.assertTrue(t >= MinHand and t <= MaxHand)
        t = h.Throw()
        self.assertTrue(t >= MinHand and t <= MaxHand)
        t = h.Throw()
        self.assertTrue(t >= MinHand and t <= MaxHand)
        t = h.Throw()
        self.assertTrue(t >= MinHand and t <= MaxHand)


if __name__ == '__main__':
    unittest.main()
