import React, { FormEvent, useEffect, useState } from "react"
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap"
import '../styles/LoginForm.css'
import { useLocation, useNavigate } from "react-router-dom"
import { login } from "../auth/auth-api"
import Auth from "../auth/auth-service"
const LoginForm = () => {
	const auth = Auth.getInstance();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [success, setSuccess] = useState<boolean>()
	const [disabled, setDisabled] = useState<boolean>();
	const navigate = useNavigate();
	const location = useLocation();
	const navigateHome = () => {
		navigate('/');
	}
	
	useEffect(() => {
		if (location.state && location.state.success) {
			setSuccess(true);
			setTimeout(() => setSuccess(false), 5000);
		}
	}, [])
	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		try {
			const data = await login(username, password);
			auth.setTokens(data);
			navigateHome();
		} catch (error: any) {
			if (error.status === 403) {
				setDisabled(true);
			}
		}
	};
	
	return (
		<div className="login-container">
			<Container>
				<Row className="justify-content-md-center">
					<Col md={6}>
						{success && (<Alert className="alert-success">Edukalt registreeritud!</Alert>)}
						<h1 className="text-center">Logi sisse</h1>
						<Form onSubmit={handleSubmit}>
							<Form.Group controlId="formBasicEmail">
								<Form.Label>Kasutajanimi</Form.Label>
								<Form.Control
									type="text"
									placeholder="Sisesta oma kasutajanimi"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
								/>
							</Form.Group>
							
							<Form.Group controlId="formBasicPassword">
								<Form.Label>Parool</Form.Label>
								<Form.Control
									type="password"
									placeholder="Parool"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</Form.Group>
							<Button variant="primary" type="submit" size="lg" className="mt-3">
								Logi sisse
							</Button>
							{disabled && (
								<Alert className="alert-danger mt-1">
									Sinu kasutaja pole veel aktiveeritud!<br/>
									Sinu kasutaja saab aktiveerida õpetaja
								</Alert>
							)}
						</Form>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default LoginForm;
