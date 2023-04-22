export interface Game {
	questionSetId: number | null;
	type: string | null;
	maxPlays: number | null;
	pointsPerQuestion: number;
	pointPenalty: number | null;
	streaks: boolean;
	time: number | null;
	hintsEnabled: boolean;
	powerUpsEnabled: boolean;
	classId: number | null;
	startingTime: Date | null;
	endingTime: Date | null;
}

export interface GameResponse {
	questionSetName: number | null;
	type: string;
	maxPlays: number | null;
	pointsPerQuestion: number;
	pointPenalty: number | null;
	streaks: boolean;
	time: number | null;
	hintsEnabled: boolean;
	powerUpsEnabled: boolean;
	classId: number | null;
	startingTime: Date | null;
	endingTime: Date | null;
	code: string
}

export enum GameType {
	MEMORY_MATCH = "Mälukaardid",
}

export function getGameType(value: string){
	const indexOfS = Object.values(GameType).indexOf(value as unknown as GameType);
	return  Object.keys(GameType)[indexOfS];
}

export function getGameText(key: string) {
	const index = Object.keys(GameType).indexOf(key);
	return Object.values(GameType)[index];
}
