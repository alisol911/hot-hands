import unittest
from Hand import *

class HandTests(unittest.TestCase):

    def test_hand(self):
        h = Hand()
        t = h.Throw()
        self.assertTrue(t >= MinHand.value and t <= MaxHand.value)
        t = h.Throw()
        self.assertTrue(t >= MinHand.value and t <= MaxHand.value)
        t = h.Throw()
        self.assertTrue(t >= MinHand.value and t <= MaxHand.value)
        t = h.Throw()
        self.assertTrue(t >= MinHand.value and t <= MaxHand.value)
        t = h.Throw()
        self.assertTrue(t >= MinHand.value and t <= MaxHand.value)
        t = h.Throw()
        self.assertTrue(t >= MinHand.value and t <= MaxHand.value)
        t = h.Throw()
        self.assertTrue(t >= MinHand.value and t <= MaxHand.value)


if __name__ == '__main__':
    unittest.main()
