import Auth from "../../auth/auth-service"
import { Class } from "../models/School"

export async function fetchClasses(): Promise<Class[]> {
	const auth = Auth.getInstance();
	
	try {
		const schoolId = auth.getSchoolId() ? auth.getSchoolId()!.toString() : ""
		const response = await auth.fetchWithAuth( "/api/class/list?" + new URLSearchParams({schoolId: schoolId}));
		return await response.json();
	} catch (error) {
		return [];
	}
}