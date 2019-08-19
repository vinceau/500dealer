import seedrandom from "seedrandom";

// Shuffles an array in place using a given seed
export const seedshuffle = (array: Array<any>, seed: string) => {
    const rng = seedrandom(seed);
    let i = 0;
    let j = 0;
    let temp = null;

    for (i = array.length - 1; i > 0; i -= 1) {
        j = Math.floor(rng() * (i + 1))
        temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
}
