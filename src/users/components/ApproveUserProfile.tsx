import React, { useState } from "react"
import "../styles/UserProfile.css"
import { Col, Row } from "react-bootstrap"
import Select, { SingleValue } from "react-select"
import { Role, User } from "../../util/UserUtil"
import useRole from "../../auth/hooks/useAuth"

type RoleOption = {
	label: string;
	value: Role;
}
export function ApproveUserProfile(props: {user: User, approve: (id: number, role: Role) => any}) {
	
	const [selectedRole, setSelectedRole] = useState<SingleValue<RoleOption>>({value: Role.STUDENT, label: "Õpilane"})
	
	function getFullName() {
		let fullName = "";
		if (props.user.firstName) {
			fullName = props.user.firstName
		}
		if (props.user.lastName) {
			if (fullName.length === 0) {
				fullName = props.user.lastName
			} else {
				fullName = fullName + " " + props.user.lastName
			}
		}
		return fullName;
	}
	
	if (!useRole(Role.SCHOOL_ADMIN)) {
		return null;
	}
	
	const roleOptions = [
		{value: Role.STUDENT, label: "Õpilane"},
		{value: Role.TEACHER, label: "Õpetaja"},
		{value: Role.SCHOOL_ADMIN, label: "Admin"}
	]
	
	return (
		<div className="user-card">
			<div className="infos">
				<div className="image"></div>
				<div className="info">
					<div>
						<p className="name">
							{props.user.nickname} {getFullName() ? ("(" + getFullName() + ")") : "" }
						</p>
						<p className="name">Klass: {props.user.className}</p>
						<p className="function">
							Vali kasutaja roll
						</p>
					</div>
					<Row>
						<Col>
							<Select
								options={roleOptions}
								value={selectedRole}
								onChange={(e) => setSelectedRole(e)}
							/>
						</Col>
						<Col className="mb-1">
							<button className="request" type="button"
							onClick={() => props.approve(props.user.id, selectedRole?.value ?? Role.STUDENT)}>
								Kinnita
							</button>
						</Col>
					</Row>
				</div>
			</div>
		</div>
	)
}