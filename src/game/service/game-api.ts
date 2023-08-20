import { Game, GameResponse } from "../models/Game"
import Auth from "../../auth/auth-service"

export async function createGame(game: Game): Promise<Response> {
	const auth = Auth.getInstance();
	try {
		const response = await auth.fetchWithAuth("/api/game/create", {
			method: 'POST',
			body: JSON.stringify(game)
		});
		return await response;
	} catch (error) {
		console.error(error);
		return new Response();
	}
}

export async function fetchGames(): Promise<GameResponse[]> {
	const auth = Auth.getInstance();
	const response = await auth.fetchWithAuth("/api/game/list");
	const games = await response.json();
	return games;
}