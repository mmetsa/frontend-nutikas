import React, { useEffect, useState } from "react"
import { Alert, Button, Container, Form, Stack } from "react-bootstrap"
import "../styles/SchoolJoin.css"
import { validateCode } from "../service/school-api"
import { useLocation, useNavigate } from "react-router-dom"

function SchoolJoin() {
	const [code, setCode] = useState<string>("");
	const [error, setError] = useState<string>()
	const navigate = useNavigate();
	const location = useLocation();
	useEffect(() => {
		if (location.state && location.state.error) {
			setError(location.state.error)
			setTimeout(() => {setError("")}, 5000);
		}
	},[])
	const handleSubmit = async (e: React.MouseEvent) => {
		e.preventDefault();
		const success = await validateCode(code);
		if (success) {
			navigate("/register/school", {state: {code: code}});
		} else {
			setError("Sellist koodi ei eksisteeri");
			setTimeout(() => {setError("")}, 5000);
		}
	}
	
	return (
		<Container>
			<h4>Tahad liituda oma kooliga?...</h4>
			<p>Lase oma kooli juhtkonnal meile kirjutada: <a href="mailto: metsaluma@gmail.com">info@nutikas.ee</a></p>
			<p>Nutikad inimesed annavad Teie koolile unikaalse koodi, millega saate oma kooli registreerida.</p>
			<Stack direction="vertical" gap={3} className="join-info mt-5">
				<div className="popup">
					<Form className="form">
						<div className="note">
							<label className="title">Liitu oma kooliga</label>
							<span className="subtitle">Kooli registreerimiseks pead omama registreerimiskoodi.</span>
						</div>
						<input placeholder="Sisesta registreerimiskood" title="Sisesta registreerimiskood" name="code" type="text"
						       className="input_field"
						onChange={(e) => setCode(e.target.value)}/>
						<Button className="submit"
						onClick={(e) => handleSubmit(e)}>
							Mine registreerimisvormile
						</Button>
					</Form>
				</div>
				{error && (<Alert className="alert-danger">{error}</Alert>)}
				
			</Stack>
		</Container>
	)
}

export default SchoolJoin;