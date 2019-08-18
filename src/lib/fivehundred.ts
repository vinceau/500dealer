import { seedshuffle } from "./seedshuffle";

const values = [5, 6, 7, 8, 9, 10, 14, 15, 16, 17];
const suits = ['S', 'C', 'D', 'H'];

export class FiveHundredCard {
    value: number;
    suit: string;

    constructor(value: number, suit: string) {
        this.value = value;
        this.suit = suit;
    }

    repr(): string {
        if (this.suit === 'X') return 'X';
        let displayValue: string = this.value.toString();
        if (this.value === 14) displayValue = 'J';
        if (this.value === 15) displayValue = 'Q';
        if (this.value === 16) displayValue = 'K';
        if (this.value === 17) displayValue = 'A';
        return displayValue + this.suit;
    }

    sortingValue(): number {
        if (this.suit === 'X') {
            return 1000;
        }
        return suits.indexOf(this.suit) * 100 + this.value;
    }
}


export const FiveHundredCardCompare = (card1: FiveHundredCard, card2: FiveHundredCard): number => {
    return card1.sortingValue() - card2.sortingValue();
}

export class FiveHundredDeck {
    seed: string;
    cards: FiveHundredCard[];

    constructor(players: number, randomSeed: string) {
        if (players < 4 || players > 6) {
            throw new Error(`Number of players must be between 4 and 6. Got: ${players}`);
        }

        this.seed = randomSeed + players.toString();
        this.cards = [];
        suits.forEach((suit) => {
            values.forEach((val) => {
                this.cards.push(new FiveHundredCard(val, suit));
            })
        });
        this.cards.push(new FiveHundredCard(4, 'D'));
        this.cards.push(new FiveHundredCard(4, 'H'));
        this.cards.push(new FiveHundredCard(0, 'X'));

        if (players >= 5) {
            this.cards.push(new FiveHundredCard(4, 'C'));
            this.cards.push(new FiveHundredCard(4, 'S'));
            // adds 2s, and 3s
            suits.forEach((suit) => {
                this.cards.push(new FiveHundredCard(2, suit));
                this.cards.push(new FiveHundredCard(3, suit));
            });
        }

        if (players === 6) {
            // adds 11s, and 12s
            suits.forEach((suit) => {
                this.cards.push(new FiveHundredCard(11, suit));
                this.cards.push(new FiveHundredCard(12, suit));
            });
            // add red 13s
            this.cards.push(new FiveHundredCard(13, 'D'));
            this.cards.push(new FiveHundredCard(13, 'H'));
        }

    }

    shuffle() {
        seedshuffle(this.cards, this.seed);
    }
}

export class FiveHundredGame {
    numPlayers: number
    deck: FiveHundredDeck;

    constructor(players: number, randomSeed: string) {
        this.numPlayers = players;
        this.deck = new FiveHundredDeck(players, randomSeed)
        this.deck.shuffle();
    }

    deal(player: number): FiveHundredCard[] {
        if (player < 1 || player > this.numPlayers) {
            return [];
        }
        let start = (player - 1) * 10;
        return this.deck.cards.slice(start, start + 10)
    }

    kitty(): FiveHundredCard[] {
        let start = this.numPlayers * 10;
        return this.deck.cards.slice(start, start + 3)
    }
}
