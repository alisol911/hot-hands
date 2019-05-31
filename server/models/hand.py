import random
from enum import Enum

class OrderedEnum(Enum):
    def __ge__(self, other):
        if self.__class__ is other.__class__:
            return self.value >= other.value
        return NotImplemented
    def __gt__(self, other):
        if self.__class__ is other.__class__:
            return self.value > other.value
        return NotImplemented
    def __le__(self, other):
        if self.__class__ is other.__class__:
            return self.value <= other.value
        return NotImplemented
    def __lt__(self, other):
        if self.__class__ is other.__class__:
            return self.value < other.value
        return NotImplemented

class HandType(OrderedEnum):
    Rock = 1
    Paper = 2
    Scissors = 3

MinHand = HandType.Rock
MaxHand = HandType.Scissors

class Hand():
    def Throw(self):
        handValue = random.randint(MinHand.value, MaxHand.value)
        return HandType(handValue)
