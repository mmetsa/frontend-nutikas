import { IAuthTokens } from "./auth-service"
import { ApiError } from "../util/ApiError"

export async function login(nickname: string, password: string): Promise<IAuthTokens> {
	const response = await fetch('http://localhost:8080/api/auth/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			nickname: nickname,
			password: password
		}),
	});
	if (response.ok) {
		return await response.json();
	} else {
		const error: ApiError = await response.json();
		throw new ApiError(error.message, response.status, []);
	}
}