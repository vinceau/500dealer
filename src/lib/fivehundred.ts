import seedrandom from "seedrandom";

const values = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const suits = ['S', 'C', 'D', 'H'];

// Shuffles an array in place
const shuffle = (array: any, seed: string) => {
    const rng = seedrandom(seed);
    var i = 0
        , j = 0
        , temp = null

    for (i = array.length - 1; i > 0; i -= 1) {
        j = Math.floor(rng() * (i + 1))
        temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
}

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
        if (this.value === 11) displayValue = 'J';
        if (this.value === 12) displayValue = 'Q';
        if (this.value === 13) displayValue = 'K';
        if (this.value === 14) displayValue = 'A';
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
        this.seed = randomSeed;
        this.cards = [];
        suits.forEach((suit) => {
            values.forEach((val) => {
                this.cards.push(new FiveHundredCard(val, suit));
            })
        });
        this.cards.push(new FiveHundredCard(4, 'D'));
        this.cards.push(new FiveHundredCard(4, 'H'));
        this.cards.push(new FiveHundredCard(0, 'X'));
    }

    shuffle() {
        shuffle(this.cards, this.seed);
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