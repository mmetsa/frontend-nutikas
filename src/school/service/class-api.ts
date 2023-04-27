import Auth from "../../auth/auth-service"
import { Class } from "../models/School"

export async function fetchClasses(): Promise<Class[]> {
	const auth = Auth.getInstance();
	try {
		const response = await auth.fetchWithAuth("http://localhost:8080/api/class/list");
		return await response.json();
	} catch (error) {
		console.error(error);
		return [];
	}
}