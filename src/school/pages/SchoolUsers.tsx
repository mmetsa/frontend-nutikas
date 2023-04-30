import React, { useEffect, useState } from "react"
import useRole from "../../auth/hooks/useAuth"
import { Role } from "../../util/UserUtil"
import { Container, Stack } from "react-bootstrap"
import { FaAngleDoubleDown } from "react-icons/fa"
import "../styles/SchoolUsers.css"
import { fetchClasses } from "../service/class-api"
import { Class } from "../models/School"
import { useNavigate } from "react-router-dom"

function SchoolUsers() {
	const [clicked, setClicked] = useState<boolean>(false)
	const [classes, setClasses] = useState<Class[]>()
	const navigate = useNavigate();
	
	useEffect(() => {
		getClasses();
	}, []);
	
	if (!useRole(Role.SCHOOL_ADMIN)) {
		return null;
	}
	
	async function getClasses() {
		try {
			const result = await fetchClasses();
			setClasses(result);
		} catch (error: any) {
			navigate("/login");
		}
	}
	
	return (
		<Container className="flex">
			<h1 className="mb-5">Kasutajate haldus</h1>
			<Stack direction="vertical" className="flex">
				{classes?.map((c) => (
					<h1 key={c.id} className="school-user-card">
						<Stack direction="horizontal">
							<p className="classNumber mb-0">{c.name} [ {c.count} ]</p>
							<FaAngleDoubleDown className={"extend-button ms-auto " + (clicked ? "rotated" : "")}
							                   onClick={() => setClicked(!clicked)}>
							</FaAngleDoubleDown>
						</Stack>
					</h1>
				))}
			</Stack>
		</Container>
	)
}

export default SchoolUsers;