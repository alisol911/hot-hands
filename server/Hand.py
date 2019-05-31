import random
from enum import Enum

class HandType(Enum):
    Rock = 1
    Paper = 2
    Scissors = 3

MinHand = HandType.Rock
MaxHand = HandType.Scissors

class Hand():
    def Throw(self):
        return random.randint(MinHand.value, MaxHand.value)
