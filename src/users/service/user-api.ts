import Auth from "../../auth/auth-service"
import { ApiError } from "../../util/ApiError"
import { Role, User } from "../../util/UserUtil"

export async function fetchUsersForApproval(): Promise<User[]> {
	const auth = Auth.getInstance();
	const schoolId = auth.getSchoolId() !== null ? auth.getSchoolId()!.toString() : ""
	
	const response = await auth.fetchWithAuth("/api/user/approvals?" + new URLSearchParams({schoolId: schoolId}), {
		method: 'GET',
	});
	const json = await response.json();
	if (response.ok) {
		return json;
	} else {
		throw new ApiError(json.message, response.status, json.details);
	}
}

export async function approveUser(userId: number, role: Role): Promise<void> {
	const auth = Auth.getInstance();
	const schoolId = auth.getSchoolId() ? auth.getSchoolId()!.toString() : ""
	const response = await auth.fetchWithAuth("/api/user/approve?" + new URLSearchParams({schoolId: schoolId}), {
		method: "POST",
		body: JSON.stringify({
			userId: userId,
			role: role
		})
	});
	
	if (!response.ok) {
		const json = await response.json();
		throw new ApiError(json.message, response.status, json.details)
	}
}