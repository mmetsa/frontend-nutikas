import React, { useEffect, useState } from "react"
import { Alert, Container, Stack } from "react-bootstrap"
import { ApproveUserProfile } from "./components/ApproveUserProfile"
import { Role, User } from "../util/UserUtil"
import { approveUser, fetchUsersForApproval } from "./service/user-api"

export function ApproveUserPage() {
	
	const [users, setUsers] = useState<User[]>([])
	const [success, setSuccess] = useState<boolean>()
	const [failed, setFailed] = useState<boolean>()
	
	const getUsersForApproval = async () => {
		const response = await fetchUsersForApproval();
		setUsers(response);
	}
	
	useEffect(() => {
		getUsersForApproval()
	}, []);
	
	const handleApprove = async (id: number, role: Role) => {
		try {
			await approveUser(id, role);
			setSuccess(true);
			setTimeout(() => setSuccess(false), 2000);
			const newUsers = users.filter(u => u.id !== id);
			setUsers(newUsers);
			await getUsersForApproval();
		} catch (error) {
			setFailed(true);
			setTimeout(() => setFailed(false), 2000);
		}
		
	}
	
	return (
		<Container className="flex">
			<h1 className="mb-5">Kasutajate kinnitamine</h1>
			<Stack direction="vertical" className="flex">
				{success && (<Alert className="alert-success">Kinnitamine õnnestus</Alert>)}
				{failed && (<Alert className="alert-danger">Kinnitamine ebaõnnestus</Alert>)}
				{users.map((user) => (
					<ApproveUserProfile key={user.id} user={user}
					approve={handleApprove}/>
				))}
			</Stack>
		</Container>
	)
}