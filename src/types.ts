export enum Level {
    easy = "easy",
    medium = "medium",
    hard = "hard",
}

export type Image = {
    id: number;
    url: string;
    isFlipped: boolean;
    isMatched: boolean;
}