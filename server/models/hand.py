import random
from server.models.OrderedEnum import OrderedEnum

class HandType(OrderedEnum):
    Nothing = 0
    Rock = 1
    Paper = 2
    Scissors = 3
    Spock = 4
    Lizard = 5

MinHand = HandType.Rock
MaxHand = HandType.Lizard

class WinnerType(OrderedEnum):
    Draw = 0
    Player1 = 1
    Player2 = 2

WinTable = [[WinnerType.Draw,    WinnerType.Player2, WinnerType.Player2, WinnerType.Player2, WinnerType.Player2, WinnerType.Player2],
            [WinnerType.Player1, WinnerType.Draw,    WinnerType.Player2, WinnerType.Player1, WinnerType.Player2, WinnerType.Player1],
            [WinnerType.Player1, WinnerType.Player1, WinnerType.Draw,    WinnerType.Player2, WinnerType.Player1, WinnerType.Player2],
            [WinnerType.Player1, WinnerType.Player2, WinnerType.Player1, WinnerType.Draw,    WinnerType.Player2, WinnerType.Player1],
            [WinnerType.Player1, WinnerType.Player1, WinnerType.Player2, WinnerType.Player1, WinnerType.Draw,    WinnerType.Player2],
            [WinnerType.Player1, WinnerType.Player2, WinnerType.Player1, WinnerType.Player2, WinnerType.Player1, WinnerType.Draw]]

class Hand():
    def Throw(self):
        handValue = random.randint(MinHand.value, MaxHand.value)
        return HandType(handValue)

    def Judge(self, hand1, hand2):
        return WinTable[hand1.value][hand2.value]