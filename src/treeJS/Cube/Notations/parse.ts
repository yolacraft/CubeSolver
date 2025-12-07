
const notationToNumber: Record<string, number> = {
    "U": 0,  "U'": 1,  "U2": 2,
    "D": 3,  "D'": 4,  "D2": 5,
    "F": 6,  "F'": 7,  "F2": 8,
    "B": 9,  "B'": 10, "B2": 11,
    "L": 12, "L'": 13, "L2": 14,
    "R": 15, "R'": 16, "R2": 17
};

const numberToNotation = Object.fromEntries(
    Object.entries(notationToNumber).map(([k, v]) => [v, k])
);

export function getNumberFromNotation(notation: string): number {
    const value = notationToNumber[notation];
    if (value === undefined) throw new Error(`Invalid notation: ${notation}`);
    return value;
}

export function getNotationFromNumber(num: number): string {
    const value = numberToNotation[num];
    if (value === undefined) throw new Error(`Invalid number: ${num}`);
    return value;
}

export function parseCubeNotation(input: string): number[] {
    return input
        .trim()
        .split(/\s+/)
        .map(move => getNumberFromNotation(move));
}

export function stringifyCubeNotation(moves: number[]): string {
    return moves.map(num => getNotationFromNumber(num)).join(' ');
}

