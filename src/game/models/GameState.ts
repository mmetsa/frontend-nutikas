export interface GameState {
	players: Player[],
	time: number | null

}

export interface Player {
	id: number,
	score: number,
	cards: Card[]
}

export interface Card {
	id: number,
	questionId: number,
	text: string | null,
	answered: boolean,
	clicked: boolean
}