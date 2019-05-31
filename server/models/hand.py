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
    Nothing = 0
    Rock = 1
    Paper = 2
    Scissors = 3

MinHand = HandType.Rock
MaxHand = HandType.Scissors

class WinnerType(OrderedEnum):
    Draw = 0
    Player1 = 1
    Player2 = 2

WinTable = [[WinnerType.Draw, WinnerType.Player2, WinnerType.Player2, WinnerType.Player2],
            [WinnerType.Player1, WinnerType.Draw, WinnerType.Player2, WinnerType.Player1],
            [WinnerType.Player1, WinnerType.Player1, WinnerType.Draw, WinnerType.Player2],
            [WinnerType.Player1, WinnerType.Player2, WinnerType.Player1, WinnerType.Draw]]

class Hand():
    pass
    def Throw(self):
        handValue = random.randint(MinHand.value, MaxHand.value)
        return HandType(handValue)

    def Judge(self, hand1, hand2):
        return WinTable[hand1.value][hand2.value]