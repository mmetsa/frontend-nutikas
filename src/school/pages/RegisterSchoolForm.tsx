import React, { useEffect, useState } from "react"
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap"
import '../styles/RegisterSchoolForm.css'

import "react-datepicker/dist/react-datepicker.css";
import { RegisterSchool } from "../models/School"
import { useLocation, useNavigate } from "react-router-dom"
import { createSchool } from "../service/school-api"

const RegisterSchoolForm = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [error, setError] = useState<boolean>(false);
	const [registerForm, setRegisterForm] = useState<RegisterSchool>({
		name: "",
		shortName: "",
		address: "",
		schoolEmail: "",
		phone: "",
		username: "",
		adminEmail: "",
		password: "",
		code: ""
	});
	
	useEffect(() => {
		if (location.state && location.state.code) {
			setRegisterForm({...registerForm, code: location.state.code});
		}
	}, []);
	
	const handleRegister = async (e: React.MouseEvent) => {
		e.preventDefault();
		
		if (location.state && location.state.code) {
			try {
				await createSchool(registerForm);
				navigate("/login", {state: {success: true}})
			} catch (error: any) {
				if (error.message === 'INVALID_CODE') {
					navigate("/join", {state: {error: "Kood oli vigane! Proovi uuesti"}});
					return;
				}
				setError(true);
				setTimeout(() => setError(false), 5000);
			}
		} else {
			navigate("/join", {state: {error: "Midagi läks valesti! Proovi uuesti"}});
		}
	}
	
	return (
		<div className="login-container">
			<Container>
				<Row className="justify-content-md-center">
					<Col md={6}>
						<h1 className="text-center">Registreeri oma kool</h1>
						<hr/>
						<Form>
							<Form.Group className="mt-3">
								<Form.Label>Kooli nimi</Form.Label>
								<Form.Control
									type="text"
									name="schoolName"
									placeholder="Sisesta kooli nimi"
									onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
								/>
							</Form.Group>
							<Form.Group className="mt-3">
								<Form.Label>Kooli nime lühend</Form.Label>
								<Form.Control
									required
									type="text"
									name="schoolNameShort"
									placeholder="Kooli nime lühend"
									onChange={(e) => setRegisterForm({...registerForm, shortName: e.target.value})}
								/>
							</Form.Group>
							<Form.Group className="mt-3">
								<Form.Label>Kooli aadress</Form.Label>
								<Form.Control
									required
									type="text"
									name="schoolAddress"
									placeholder="Kooli aadress"
									onChange={(e) => setRegisterForm({...registerForm, address: e.target.value})}
								/>
							</Form.Group>
							<Form.Group className="mt-3">
								<Form.Label>Kooli E-post</Form.Label>
								<Form.Control
									required
									type="email"
									name="schoolEmail"
									placeholder="Kooli E-post"
									onChange={(e) => setRegisterForm({...registerForm, schoolEmail: e.target.value})}
								/>
							</Form.Group>
							<Form.Group className="mt-3">
								<Form.Label>Kooli telefon</Form.Label>
								<Form.Control
									required
									type="text"
									name="schoolPhone"
									placeholder="Kooli telefon"
									onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})}
								/>
							</Form.Group>
							<hr/>
							<h4 className="text-center">Kooli peakasutaja andmed</h4>
							<hr/>
							<Form.Group className="mt-3">
								<Form.Label>Kasutajanimi</Form.Label>
								<Form.Control
									required
									type="text"
									name="adminUsername"
									placeholder="Sisesta kasutajanimi"
									onChange={(e) => setRegisterForm({...registerForm, username: e.target.value})}
								/>
							</Form.Group>
							<Form.Group className="mt-3">
								<Form.Label>E-mail</Form.Label>
								<Form.Control
									required
									type="email"
									name="adminEmail"
									placeholder="Sisesta e-mail"
									onChange={(e) => setRegisterForm({...registerForm, adminEmail: e.target.value})}
								/>
							</Form.Group>
							<Form.Group className="mt-3">
								<Form.Label>Parool</Form.Label>
								<Form.Control
									type="password"
									name="adminPassword"
									required
									placeholder="Sisesta parool"
									onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
								/>
							</Form.Group>
							<Button variant="primary" type="button" size="lg" className="mt-3"
							onClick={(e) => handleRegister(e)}>
								Registreeri kool
							</Button>
							{error && (<Alert className="alert-danger mt-1">Midagi läks valesti! Veenduge, et täitsite kõik väljad</Alert>)}
						</Form>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default RegisterSchoolForm;
