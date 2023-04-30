import React, { FormEvent, useEffect, useState } from "react"
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import '../styles/LoginForm.css'
import { useNavigate } from "react-router-dom"
import DatePicker from "react-datepicker";
import Select from "react-select";

import "react-datepicker/dist/react-datepicker.css";
import { Class, School } from "../school/models/School"

interface RegisterDetails {
	nickname: string,
	password: string,
	email: string,
	firstName: string,
	lastName: string,
	birthday: Date,
	schoolId: number,
	classId: number
}

const RegisterForm = () => {
	const [registerDetails, setRegisterDetails] = useState<RegisterDetails>(
		{
			nickname: "",
			password: "",
			email: "",
			firstName: "",
			lastName: "",
			birthday: new Date(),
			schoolId: 0,
			classId: 0
		});
	const [schools, setSchools] = useState<School[]>([]);
	const [classes, setClasses] = useState<Class[]>([]);
	const navigate = useNavigate();
	const navigateToLogin = () => {
		navigate('/login');
	}
	
	useEffect(() => {
		const fetchSchools = async () => {
			try {
				const response = await fetch("http://localhost:8080/api/school/list", {
					headers: {
						"Content-Type": "application/json"
					}
				});
				const data = await response.json();
				setSchools(data);
			} catch (error) {
				console.error("Error fetching schools:", error);
			}
		};
		
		fetchSchools();
	}, []);
	
	const handleSchoolSelect = (selectedSchool: School | null) => {
		if (selectedSchool) {
			setRegisterDetails({ ...registerDetails, schoolId: selectedSchool.id });
			setClasses(selectedSchool.classes);
		} else {
			setRegisterDetails({ ...registerDetails, schoolId: 0 });
			setClasses([]);
		}
	};
	
	const handleClassSelect = (selectedClass: Class | null) => {
		if (selectedClass) {
			setRegisterDetails({ ...registerDetails, classId: selectedClass.id });
		} else {
			setRegisterDetails({ ...registerDetails, classId: 0 });
		}
	};
	
	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		try {
			const data = await fetch('http://localhost:8080/api/auth/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(registerDetails),
			});
			if (data.ok) {
				navigateToLogin();
			} else {
				throw new Error('Register failed');
			}
		} catch (error) {
			// TODO: Handle registration error
		}
	};
	
	return (
		<div className="login-container">
			<Container>
				<Row className="justify-content-md-center">
					<Col md={6}>
						<h1 className="text-center">Registreeru kasutajaks</h1>
						<hr/>
						<Form onSubmit={handleSubmit}>
							<h5>Kohustuslikud väljad</h5>
							<div className="required-fields">
								<Form.Group controlId="formBasicNickname">
									<Form.Label>Vali omale kasutajanimi</Form.Label>
									<Form.Control
										type="text"
										placeholder="Sisesta oma kasutajanimi"
										value={registerDetails.nickname}
										onChange={(e) => setRegisterDetails({...registerDetails, nickname: e.target.value})}
									/>
								</Form.Group>
								<Form.Group controlId="formBasicPassword">
									<Form.Label>Loo tugev parool</Form.Label>
									<Form.Control
										type="password"
										placeholder="Parool"
										value={registerDetails.password}
										onChange={(e) => setRegisterDetails({...registerDetails, password: e.target.value})}
									/>
								</Form.Group>
								<Form.Group controlId="formBasicSchool">
									<Form.Label>Kool</Form.Label>
									<Select
										options={schools}
										getOptionLabel={(school: School) => school.name}
										getOptionValue={(school: School) => String(school.id)}
										onChange={handleSchoolSelect}
										placeholder="Vali kool"
										isClearable
									/>
								</Form.Group>
								<Form.Group controlId="formBasicClass">
									<Form.Label>Klass</Form.Label>
									<Select
										options={classes}
										getOptionLabel={(classItem: Class) => classItem.name}
										getOptionValue={(classItem: Class) => String(classItem.id)}
										onChange={handleClassSelect}
										placeholder="Vali klass"
										isClearable
										isDisabled={!registerDetails.schoolId}
									/>
								</Form.Group>
							</div>
							<hr/>
							<h5>Valikulised väljad</h5>
							<Form.Group controlId="formBasic">
								<Form.Label>E-mail</Form.Label>
								<Form.Control
									type="text"
									placeholder="email"
									value={registerDetails.email}
									onChange={(e) => setRegisterDetails({...registerDetails, email: e.target.value})}
								/>
							</Form.Group>
							<Form.Group controlId="formBasicFirstname">
								<Form.Label>Eesnimi</Form.Label>
								<Form.Control
									type="text"
									placeholder="Eesnimi"
									value={registerDetails.firstName}
									onChange={(e) => setRegisterDetails({...registerDetails, firstName: e.target.value})}
								/>
							</Form.Group>
							<Form.Group controlId="formBasicLastname">
								<Form.Label>Perekonnanimi</Form.Label>
								<Form.Control
									type="text"
									placeholder="Perekonnanimi"
									value={registerDetails.lastName}
									onChange={(e) => setRegisterDetails({...registerDetails, lastName: e.target.value})}
								/>
							</Form.Group>
							<Form.Group controlId="formBasicBirthday">
								<Form.Label>Sünnikuupäev</Form.Label>
								<DatePicker
									selected={registerDetails.birthday}
									onChange={(date: Date) =>
										setRegisterDetails({ ...registerDetails, birthday: date })
									}
									dateFormat="yyyy-MM-dd"
									maxDate={new Date()}
									showYearDropdown
									showMonthDropdown
									dropdownMode="select"
									placeholderText="Vali sünnikuupäev"
									className="form-control"
								/>
							</Form.Group>
							<Button variant="primary" type="submit" size="lg" className="mt-3">
								Registreeri kasutajaks
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default RegisterForm;
