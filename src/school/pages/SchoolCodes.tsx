import React, { useState } from "react"
import useRole from "../../auth/hooks/useAuth"
import { Role } from "../../util/UserUtil"
import { Card, Container, ListGroup } from "react-bootstrap"
import "../styles/SchoolCodes.css"
import { fetchCodes } from "../service/school-api"
function SchoolCodes() {
	const [amount, setAmount] = useState<number>(1);
	const [codes, setCodes] = useState<string[]>([]);
	if (!useRole(Role.ADMIN)) {return null;}
	const handleSubmit = async (event: React.MouseEvent) => {
		event.preventDefault();
		const newCodes = await fetchCodes(amount);
		setCodes([...newCodes, ...codes]);
	}
	
	return (
		<Container>
			<h2>Generate codes for new schools</h2>
			<p>These codes can be given to school representatives so they can register their school to our system</p>
			<Card className="text-center">
				<Card.Header>
					<div className="input-group">
						<input type="number"
						className="input"
						id="amount"
						name="amount"
				       min={1}
						placeholder="Enter amount of codes to generate"
				       onChange={(e) => setAmount(e.target.value as unknown as number)}
						/>
						<input className="button--submit"
						value="Generate"
						type="submit"
						onClick={(e) => handleSubmit(e)}/>
					</div>
				</Card.Header>
				<ListGroup className="list-group-flush">
					{codes.length === 0 && (
						<ListGroup.Item className="text-muted">Generated codes will appear here</ListGroup.Item>
					)}
					{codes.map((code) => (
						<ListGroup.Item key={code}>{code}</ListGroup.Item>
					))}
				</ListGroup>
			</Card>
		</Container>
	)
}

export default SchoolCodes;