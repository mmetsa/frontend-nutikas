import Auth from "../../auth/auth-service"
import { RegisterSchool } from "../models/School"
import { ApiError } from "../../util/ApiError"

export async function fetchCodes(amount: number): Promise<string[]> {
	const auth = Auth.getInstance();
	try {
		const response = await auth.fetchWithAuth("/api/school/codes?" + new URLSearchParams({amount: amount.toString()}), {
			method: 'POST'
		});
		return await response.json();
	} catch (error) {
		console.error(error);
		return [];
	}
}

export async function validateCode(code: string): Promise<boolean> {
	const baseUrl = process.env.REACT_APP_API_URL;
	const response = await fetch(baseUrl + "/api/school/code/validate?" + new URLSearchParams({code: code}), {
		method: 'POST'
	});
	return response.ok;
}

export async function createSchool(request: RegisterSchool): Promise<void> {
	const baseUrl = process.env.REACT_APP_API_URL;
	const response = await fetch(baseUrl + "/api/school/create", {
		headers: {
			"Content-Type": "application/json"
		},
		method: 'POST',
		body: JSON.stringify(request)
	});
	if (!response.ok) {
		const error: ApiError = await response.json();
		throw new ApiError(error.message, response.status, error.details)
	}
}