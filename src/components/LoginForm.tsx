import React, { FormEvent, useState } from "react"
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import '../styles/LoginForm.css'
import { useNavigate } from "react-router-dom"
import Auth, { IAuthTokens } from "../auth/auth-service"
const LoginForm = () => {
	const auth = Auth.getInstance();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const navigateHome = () => {
		navigate('/');
	}
	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		try {
			const data = await fetch('http://localhost:8080/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					nickname: username,
					password: password,
				}),
			});
			if (data.ok) {
				const tokens: IAuthTokens = await data.json();
				auth.setTokens(tokens);
				navigateHome();
			} else {
				throw new Error('Login failed');
			}
		} catch (error) {
			console.log("Error: ", error)
		}
	};
	
	return (
		<div className="login-container">
			<Container>
				<Row className="justify-content-md-center">
					<Col md={6}>
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
						</Form>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default LoginForm;
