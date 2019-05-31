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

    def test_judge(self):
        h = Hand()
        self.assertTrue(h.Judge(HandType.Nothing, HandType.Nothing) == WinnerType.Draw)
        self.assertTrue(h.Judge(HandType.Nothing, HandType.Rock) == WinnerType.Player2)
        self.assertTrue(h.Judge(HandType.Nothing, HandType.Paper) == WinnerType.Player2)
        self.assertTrue(h.Judge(HandType.Nothing, HandType.Scissors) == WinnerType.Player2)

        self.assertTrue(h.Judge(HandType.Rock, HandType.Nothing) == WinnerType.Player1)
        self.assertTrue(h.Judge(HandType.Rock, HandType.Rock) == WinnerType.Draw)
        self.assertTrue(h.Judge(HandType.Rock, HandType.Paper) == WinnerType.Player2)
        self.assertTrue(h.Judge(HandType.Rock, HandType.Scissors) == WinnerType.Player1)

        self.assertTrue(h.Judge(HandType.Paper, HandType.Nothing) == WinnerType.Player1)
        self.assertTrue(h.Judge(HandType.Paper, HandType.Rock) == WinnerType.Player1)
        self.assertTrue(h.Judge(HandType.Paper, HandType.Paper) == WinnerType.Draw)
        self.assertTrue(h.Judge(HandType.Paper, HandType.Scissors) == WinnerType.Player2)

        self.assertTrue(h.Judge(HandType.Scissors, HandType.Nothing) == WinnerType.Player1)
        self.assertTrue(h.Judge(HandType.Scissors, HandType.Rock) == WinnerType.Player2)
        self.assertTrue(h.Judge(HandType.Scissors, HandType.Paper) == WinnerType.Player1)
        self.assertTrue(h.Judge(HandType.Scissors, HandType.Scissors) == WinnerType.Draw)
